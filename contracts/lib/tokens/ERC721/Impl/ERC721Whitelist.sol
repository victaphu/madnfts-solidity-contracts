// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity 0.8.16;

import { ERC721WhitelistEventsAndErrors } from "../Base/interfaces/ERC721EventAndErrors.sol";
import { ERC721, ERC721TokenReceiver } from "../Base/ERC721.sol";
import { ERC2981 } from "../../common/ERC2981.sol";
import { ERC20 } from "../../ERC20.sol";

import { ReentrancyGuard } from "../../../security/ReentrancyGuard.sol";
import { SplitterImpl } from "../../../splitter/SplitterImpl.sol";
import { MerkleProof } from "../../../utils/MerkleProof.sol";
import { Counters } from "../../../utils/Counters.sol";
import { Strings } from "../../../utils/Strings.sol";
import { Owned } from "../../../auth/Owned.sol";
import { SafeTransferLib } from "../../../utils/SafeTransferLib.sol";
import { FeeOracle } from "../../common/FeeOracle.sol";

contract ERC721Whitelist is
    ERC721,
    ERC2981,
    ERC721WhitelistEventsAndErrors,
    ERC721TokenReceiver,
    Owned,
    ReentrancyGuard
{
    using Counters for Counters.Counter;
    using Strings for uint256;

    ////////////////////////////////////////////////////////////////
    //                           STORAGE                          //
    ////////////////////////////////////////////////////////////////

    Counters.Counter private liveSupply;

    string private baseURI;
    uint256 public publicPrice;
    uint256 public maxSupply;

    /// @dev default := false.
    bool public publicMintState;
    SplitterImpl public splitter;

    // merkle
    uint256 public whitelistPrice;
    uint256 public maxWhitelistSupply;
    bytes32 public whitelistMerkleRoot;
    /// @dev default := false.
    bool public whitelistMintState;
    /// @dev Current whitelist supply.
    uint256 public whitelistMinted;

    uint256 public maxFree;
    uint256 public freeSupply;
    bytes32 public claimListMerkleRoot;
    /// @dev default := false.
    bool public freeClaimState;

    /// @dev Default amount to be claimed as free in a collection.
    uint256 public freeAmount;
    /// @dev Stores the amount of whitelist minted tokens of an address.
    /// @dev For fetching purposes and max free claim control.
    mapping(address => bool) public claimed;

    ////////////////////////////////////////////////////////////////
    //                          MODIFIERS                         //
    ////////////////////////////////////////////////////////////////

    modifier publicMintAccess() {
        if (!publicMintState) revert PublicMintClosed();
        _;
    }

    modifier whitelistMintAccess() {
        if (!whitelistMintState) revert WhitelistMintClosed();
        _;
    }

    modifier freeClaimAccess() {
        if (!freeClaimState) revert FreeClaimClosed();
        _;
    }

    modifier hasReachedMax(uint256 amount) {
        if (
            liveSupply.current() + amount >
            maxSupply - maxWhitelistSupply - maxFree
        ) revert MaxMintReached();
        _;
    }

    modifier canMintFree(uint256 amount) {
        if (freeSupply + amount > maxFree)
            revert MaxFreeReached();
        if (liveSupply.current() + amount > maxSupply)
            revert MaxMintReached();
        _;
    }

    modifier whitelistMax(uint8 amount) {
        if (whitelistMinted + amount > maxWhitelistSupply)
            revert MaxWhitelistReached();
        if (liveSupply.current() + amount > maxSupply)
            revert MaxMintReached();
        _;
    }

    modifier priceCheck(uint256 _price, uint256 amount) {
        if (_price * amount != msg.value) revert WrongPrice();
        _;
    }

    modifier merkleVerify(
        bytes32[] calldata merkleProof,
        bytes32 root
    ) {
        if (
            !MerkleProof.verify(
                merkleProof,
                root,
                bytes32(uint256(uint160(msg.sender)))
            )
        ) revert AddressDenied();
        _;
    }

    ////////////////////////////////////////////////////////////////
    //                         CONSTRUCTOR                        //
    ////////////////////////////////////////////////////////////////

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        uint256 _price,
        uint256 _maxSupply,
        SplitterImpl _splitter,
        uint96 _fraction,
        address _router
    ) ERC721(_name, _symbol) Owned(_router) {
        baseURI = _baseURI;
        publicPrice = _price;
        maxSupply = _maxSupply;
        splitter = _splitter;

        _royaltyFee = _fraction;
        _royaltyRecipient = payable(splitter);

        emit RoyaltyFeeSet(_royaltyFee);
        emit RoyaltyRecipientSet(_royaltyRecipient);
    }

    ////////////////////////////////////////////////////////////////
    //                         OWNER FX                           //
    ////////////////////////////////////////////////////////////////

    function whitelistConfig(
        uint256 _price,
        uint256 _supply,
        bytes32 _root
    ) external onlyOwner {
        whitelistPrice = _price;
        maxWhitelistSupply = _supply;
        whitelistMerkleRoot = _root;

        emit WhitelistConfigSet(_price, _supply, _root);
    }

    function freeConfig(
        uint256 _freeAmount,
        uint256 _maxFree,
        bytes32 _claimListMerkleRoot
    ) external onlyOwner {
        freeAmount = _freeAmount;
        maxFree = _maxFree;
        claimListMerkleRoot = _claimListMerkleRoot;

        emit FreeConfigSet(
            _freeAmount,
            _maxFree,
            _claimListMerkleRoot
        );
    }

    function setBaseURI(string memory _baseURI)
        external
        onlyOwner
    {
        baseURI = _baseURI;

        emit BaseURISet(_baseURI);
    }

    function setPublicMintState(bool _publicMintState)
        external
        onlyOwner
    {
        publicMintState = _publicMintState;

        emit PublicMintStateSet(_publicMintState);
    }

    function setWhitelistMintState(bool _whitelistMintState)
        external
        onlyOwner
    {
        whitelistMintState = _whitelistMintState;

        emit WhitelistMintStateSet(_whitelistMintState);
    }

    function setFreeClaimState(bool _freeClaimState)
        external
        onlyOwner
    {
        freeClaimState = _freeClaimState;

        emit FreeClaimStateSet(_freeClaimState);
    }

    // only mad
    function burn(uint256[] memory ids) external payable onlyOwner {
        _feeCheck(0x44df8e70);
        uint256 i;
        uint256 len = ids.length;
        for (i; i < len; ) {
            // delId();
            liveSupply.decrement();
            _burn(ids[i]);
            unchecked {
                ++i;
            }
        }
        // assembly overflow check
        assembly {
            if lt(i, len) {
                mstore(0x00, 0xdfb035c9)
                revert(0x1c, 0x04)
            }
        }
        // Transfer event emited by parent ERC721 contract
    }

    function mintToCreator(uint256 amount)
        external
        payable 
        nonReentrant
        onlyOwner
        canMintFree(amount)
    {
        _feeCheck(0x40d097c3);
        freeSupply += amount;
        uint256 i;
        for (i; i < amount; ) {
            _safeMint(tx.origin, _nextId());
            unchecked {
                ++i;
            }
        }
        assembly {
            if lt(i, amount) {
                mstore(0x00, 0xdfb035c9)
                revert(0x1c, 0x04)
            }
        }
        // Transfer event emitted in parent ERC721 contract
    }

    /// @dev Mints one token per address.
    function giftTokens(address[] calldata addresses)
        external
        payable
        nonReentrant
        onlyOwner
        canMintFree(addresses.length)
    {
        _feeCheck(0x40d097c3);
        uint256 amountGifted = addresses.length;
        freeSupply += amountGifted;
        uint256 i;
        for (i; i < amountGifted; ) {
            _safeMint(addresses[i], _nextId());
            unchecked {
                ++i;
            }
        }
        assembly {
            if lt(i, amountGifted) {
                mstore(0x00, 0xdfb035c9)
                revert(0x1c, 0x04)
            }
        }
        // Transfer event emitted in parent ERC721 contract
    }

    function withdraw() external onlyOwner {
        uint256 len = splitter.payeesLength();
        address[] memory addrs = new address[](len);
        uint256[] memory values = new uint256[](len);
        uint256 _val = address(this).balance;
        uint256 i;
        for (i; i < len; ) {
            address addr = splitter._payees(i);
            uint256 share = splitter._shares(addr);
            addrs[i] = addr;
            values[i] = ((_val * (share * 1e2)) / 10_000);
            unchecked {
                ++i;
            }
        }
        uint256 j;
        while (j < len) {
            SafeTransferLib.safeTransferETH(
                addrs[j],
                values[j]
            );
            unchecked {
                ++j;
            }
        }
    }

    function withdrawERC20(ERC20 _token) external onlyOwner {
        uint256 len = splitter.payeesLength();
        address[] memory addrs = new address[](len);
        uint256[] memory values = new uint256[](len);
        uint256 i;
        uint256 _val = _token.balanceOf(address(this));
        for (i; i < len; ) {
            address addr = splitter._payees(i);
            uint256 share = splitter._shares(addr);
            addrs[i] = addr;
            values[i] = ((_val * (share * 1e2)) / 10_000);
            unchecked {
                ++i;
            }
        }
        uint256 j;
        while (j < len) {
            SafeTransferLib.safeTransfer(
                _token,
                addrs[j],
                values[j]
            );
            unchecked {
                ++j;
            }
        }
    }

    ////////////////////////////////////////////////////////////////
    //                           USER FX                          //
    ////////////////////////////////////////////////////////////////

    function mint(uint256 amount)
        external
        payable
        nonReentrant
        publicMintAccess
        hasReachedMax(amount)
        priceCheck(publicPrice, amount)
    {
        uint256 i;
        for (i; i < amount; ) {
            _safeMint(msg.sender, _nextId());
            unchecked {
                ++i;
            }
        }

        assembly {
            if lt(i, amount) {
                mstore(0x00, 0xdfb035c9)
                revert(0x1c, 0x04)
            }
        }

        // Transfer event emitted in parent ERC721 contract
    }

    function whitelistMint(
        uint8 amount,
        bytes32[] calldata merkleProof
    )
        external
        payable
        nonReentrant
        whitelistMintAccess
        priceCheck(whitelistPrice, amount)
        merkleVerify(merkleProof, whitelistMerkleRoot)
        whitelistMax(amount)
    {
        unchecked {
            whitelistMinted += amount;
        }
        uint256 i;
        for (i; i < amount; ) {
            _safeMint(msg.sender, _nextId());
            unchecked {
                ++i;
            }
        }
        // assembly overflow check
        assembly {
            if lt(i, amount) {
                mstore(0x00, 0xdfb035c9)
                revert(0x1c, 0x04)
            }
        }
        // Transfer event emitted in parent ERC721 contract
    }

    function claimFree(bytes32[] calldata merkleProof)
        external
        freeClaimAccess
        merkleVerify(merkleProof, claimListMerkleRoot)
        canMintFree(freeAmount)
    {
        if (claimed[msg.sender])
            revert AlreadyClaimed();

        unchecked {
            claimed[msg.sender] = true;
            freeSupply += freeAmount;
        }

        uint256 j;
        while (j < freeAmount) {
            _safeMint(msg.sender, _nextId());
            unchecked {
                ++j;
            }
        }
        // assembly overflow check
        assembly {
            if lt(j, sload(freeAmount.slot)) {
                mstore(0x00, 0xdfb035c9)
                revert(0x1c, 0x04)
            }
        }
        // Transfer event emitted in parent ERC721 contract
    }

    ////////////////////////////////////////////////////////////////
    //                          HELPER FX                         //
    ////////////////////////////////////////////////////////////////

    function _nextId() private returns (uint256) {
        liveSupply.increment();
        return liveSupply.current();
    }

    ////////////////////////////////////////////////////////////////
    //                           VIEW FX                          //
    ////////////////////////////////////////////////////////////////

    function getBaseURI()
        external
        view
        returns (string memory)
    {
        return baseURI;
    }

    function tokenURI(uint256 id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (id > totalSupply()) revert NotMintedYet();
        return
            string(
                abi.encodePacked(
                    baseURI,
                    Strings.toString(id),
                    ".json"
                )
            );
    }

    function totalSupply() public view returns (uint256) {
        return liveSupply.current();
    }

    ////////////////////////////////////////////////////////////////
    //                     INTERNAL FUNCTIONS                     //
    ////////////////////////////////////////////////////////////////

    function _feeCheck(bytes4 _method) internal view {
        address _owner = owner;
        uint32 size;
        assembly {
            size := extcodesize(_owner)
        }
        if (size == 0) {
            return; 
        }
        uint256 _fee = FeeOracle(owner).feeLookup(_method);
        assembly {
            if iszero(eq(callvalue(), _fee)) {
                mstore(0x00, 0xf7760f25)
                revert(0x1c, 0x04)
            }
        }
    }
    ////////////////////////////////////////////////////////////////
    //                     REQUIRED OVERRIDES                     //
    ////////////////////////////////////////////////////////////////

    function supportsInterface(bytes4 interfaceId)
        public
        pure
        virtual
        override(ERC721, ERC2981)
        returns (bool)
    {
        return
            // ERC165 Interface ID for ERC165
            interfaceId == 0x01ffc9a7 ||
            // ERC165 Interface ID for ERC721
            interfaceId == 0x80ac58cd ||
            // ERC165 Interface ID for ERC721Metadata
            interfaceId == 0x5b5e139f ||
            // ERC165 Interface ID for ERC2981
            interfaceId == 0x2a55205a;
    }
}

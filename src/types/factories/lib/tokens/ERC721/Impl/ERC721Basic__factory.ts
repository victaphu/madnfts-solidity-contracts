/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ERC721Basic,
  ERC721BasicInterface,
} from "../../../../../lib/tokens/ERC721/Impl/ERC721Basic";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "_baseURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxSupply",
        type: "uint256",
      },
      {
        internalType: "contract SplitterImpl",
        name: "_splitter",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "_fraction",
        type: "uint96",
      },
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "LoopOverflow",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxSupplyReached",
    type: "error",
  },
  {
    inputs: [],
    name: "NotMintedYet",
    type: "error",
  },
  {
    inputs: [],
    name: "PublicMintClosed",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongPrice",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "newBaseURI",
        type: "string",
      },
    ],
    name: "BaseURISet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bool",
        name: "newPublicState",
        type: "bool",
      },
    ],
    name: "PublicMintStateSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "newRoyaltyFee",
        type: "uint256",
      },
    ],
    name: "RoyaltyFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newRecipient",
        type: "address",
      },
    ],
    name: "RoyaltyRecipientSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBaseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMintCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintTo",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "publicMintState",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "royaltyAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_baseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_publicMintState",
        type: "bool",
      },
    ],
    name: "setPublicMintState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "splitter",
    outputs: [
      {
        internalType: "contract SplitterImpl",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "_token",
        type: "address",
      },
    ],
    name: "withdrawERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260016009553480156200001657600080fd5b5060405162002a4a38038062002a4a83398101604081905262000039916200027b565b80888860006200004a8382620003e7565b506001620000598282620003e7565b5050600880546001600160a01b0319166001600160a01b0384169081179091556040519091506000907f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d76908290a350600b620000b68782620003e7565b50600c859055600d849055600e8054610100600160a81b0319166101006001600160a01b03868116820292909217928390556001600160601b038516600681905560078054929094049092166001600160a01b0319909116179091556040517fc36422dcc77a5c93a5c48743078f8130c9fcc2a0ff893904ee62a3565688117c90600090a26007546040516001600160a01b03909116907f2a5a1009e36beb67c3a1ada61dd1343d7e9ec62c70965492fbaa06234f8316b190600090a25050505050505050620004b3565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001a957600080fd5b81516001600160401b0380821115620001c657620001c662000181565b604051601f8301601f19908116603f01168101908282118183101715620001f157620001f162000181565b816040528381526020925086838588010111156200020e57600080fd5b600091505b8382101562000232578582018301518183018401529082019062000213565b600093810190920192909252949350505050565b80516001600160a01b03811681146200025e57600080fd5b919050565b80516001600160601b03811681146200025e57600080fd5b600080600080600080600080610100898b0312156200029957600080fd5b88516001600160401b0380821115620002b157600080fd5b620002bf8c838d0162000197565b995060208b0151915080821115620002d657600080fd5b620002e48c838d0162000197565b985060408b0151915080821115620002fb57600080fd5b506200030a8b828c0162000197565b96505060608901519450608089015193506200032960a08a0162000246565b92506200033960c08a0162000263565b91506200034960e08a0162000246565b90509295985092959890939650565b600181811c908216806200036d57607f821691505b6020821081036200038e57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620003e257600081815260208120601f850160051c81016020861015620003bd5750805b601f850160051c820191505b81811015620003de57828155600101620003c9565b5050505b505050565b81516001600160401b0381111562000403576200040362000181565b6200041b8162000414845462000358565b8462000394565b602080601f8311600181146200045357600084156200043a5750858301515b600019600386901b1c1916600185901b178555620003de565b600085815260208120601f198616915b82811015620004845788860151825594840194600190910190840162000463565b5085821015620004a35787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61258780620004c36000396000f3fe6080604052600436106101d85760003560e01c80636352211e11610102578063a0712d6811610095578063c87b56dd11610064578063c87b56dd1461056d578063d5abeb011461058d578063e985e9c5146105a3578063f4f3b200146105de57600080fd5b8063a0712d6814610507578063a22cb4651461051a578063b80f55c91461053a578063b88d4fde1461054d57600080fd5b80638da5cb5b116100d15780638da5cb5b146104a75780638fc3b549146104c757806395d89b41146104dc578063a035b1fe146104f157600080fd5b80636352211e1461043257806370a0823114610452578063714c539814610472578063879fbedf1461048757600080fd5b806322ab47a11161017a5780633cd8045e116101495780633cd8045e146103ba57806342842e0e146103df578063449a52f8146103ff57806355f804b31461041257600080fd5b806322ab47a11461032c57806323b872dd146103465780632a55205a146103665780633ccfd60b146103a557600080fd5b8063095ea7b3116101b6578063095ea7b31461028257806313af4035146102a4578063150b7a02146102c457806318160ddd1461030957600080fd5b806301ffc9a7146101dd57806306fdde0314610212578063081812fc14610234575b600080fd5b3480156101e957600080fd5b506101fd6101f8366004611e42565b6105fe565b60405190151581526020015b60405180910390f35b34801561021e57600080fd5b5061022761066b565b6040516102099190611e8a565b34801561024057600080fd5b5061026a61024f366004611ebd565b6004602052600090815260409020546001600160a01b031681565b6040516001600160a01b039091168152602001610209565b34801561028e57600080fd5b506102a261029d366004611eeb565b6106f9565b005b3480156102b057600080fd5b506102a26102bf366004611f17565b6107e0565b3480156102d057600080fd5b506102f06102df366004611f34565b630a85bd0160e11b95945050505050565b6040516001600160e01b03199091168152602001610209565b34801561031557600080fd5b5061031e610875565b604051908152602001610209565b34801561033857600080fd5b50600e546101fd9060ff1681565b34801561035257600080fd5b506102a2610361366004611fd3565b610885565b34801561037257600080fd5b50610386610381366004612014565b610a6b565b604080516001600160a01b039093168352602083019190915201610209565b3480156103b157600080fd5b506102a2610aa1565b3480156103c657600080fd5b50600e5461026a9061010090046001600160a01b031681565b3480156103eb57600080fd5b506102a26103fa366004611fd3565b610db9565b6102a261040d366004611eeb565b610eb1565b34801561041e57600080fd5b506102a261042d36600461207d565b610f7b565b34801561043e57600080fd5b5061026a61044d366004611ebd565b611012565b34801561045e57600080fd5b5061031e61046d366004611f17565b611069565b34801561047e57600080fd5b506102276110dd565b34801561049357600080fd5b506102a26104a2366004612122565b61116f565b3480156104b357600080fd5b5060085461026a906001600160a01b031681565b3480156104d357600080fd5b50600f5461031e565b3480156104e857600080fd5b506102276111f5565b3480156104fd57600080fd5b5061031e600c5481565b6102a2610515366004611ebd565b611202565b34801561052657600080fd5b506102a261053536600461213d565b61131b565b6102a2610548366004612169565b611387565b34801561055957600080fd5b506102a2610568366004611f34565b61143b565b34801561057957600080fd5b50610227610588366004611ebd565b611523565b34801561059957600080fd5b5061031e600d5481565b3480156105af57600080fd5b506101fd6105be36600461220f565b600560209081526000928352604080842090915290825290205460ff1681565b3480156105ea57600080fd5b506102a26105f9366004611f17565b61157a565b60006301ffc9a760e01b6001600160e01b03198316148061062f57506380ac58cd60e01b6001600160e01b03198316145b8061064a5750635b5e139f60e01b6001600160e01b03198316145b80610665575063152a902d60e11b6001600160e01b03198316145b92915050565b6000805461067890612248565b80601f01602080910402602001604051908101604052809291908181526020018280546106a490612248565b80156106f15780601f106106c6576101008083540402835291602001916106f1565b820191906000526020600020905b8154815290600101906020018083116106d457829003601f168201915b505050505081565b6000818152600260205260409020546001600160a01b03163381148061074257506001600160a01b038116600090815260056020908152604080832033845290915290205460ff165b6107845760405162461bcd60e51b815260206004820152600e60248201526d1393d517d055551213d49256915160921b60448201526064015b60405180910390fd5b60008281526004602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b6008546001600160a01b031633146108295760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b600880546001600160a01b0319166001600160a01b03831690811790915560405133907f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7690600090a350565b6000610880600a5490565b905090565b6000818152600260205260409020546001600160a01b038481169116146108ee5760405162461bcd60e51b815260206004820152600a60248201527f57524f4e475f46524f4d00000000000000000000000000000000000000000000604482015260640161077b565b6001600160a01b0382166109445760405162461bcd60e51b815260206004820152601160248201527f494e56414c49445f524543495049454e54000000000000000000000000000000604482015260640161077b565b336001600160a01b038416148061097e57506001600160a01b038316600090815260056020908152604080832033845290915290205460ff165b8061099f57506000818152600460205260409020546001600160a01b031633145b6109dc5760405162461bcd60e51b815260206004820152600e60248201526d1393d517d055551213d49256915160921b604482015260640161077b565b6001600160a01b0380841660008181526003602090815260408083208054600019019055938616808352848320805460010190558583526002825284832080546001600160a01b03199081168317909155600490925284832080549092169091559251849392917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6007546006546001600160a01b039091169060009061271090610a8e9085612298565b610a9891906122b7565b90509250929050565b6008546001600160a01b03163314610aea5760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b6000600e60019054906101000a90046001600160a01b03166001600160a01b031663e919ecad6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b3f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b6391906122d9565b905060008167ffffffffffffffff811115610b8057610b80612036565b604051908082528060200260200182016040528015610ba9578160200160208202803683370190505b50905060008267ffffffffffffffff811115610bc757610bc7612036565b604051908082528060200260200182016040528015610bf0578160200160208202803683370190505b5090504760005b84811015610d6257600e54604051631419245f60e11b81526004810183905260009161010090046001600160a01b03169063283248be90602401602060405180830381865afa158015610c4e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c7291906122f2565b600e5460405163b34c8caf60e01b81526001600160a01b0380841660048301529293506000926101009092049091169063b34c8caf90602401602060405180830381865afa158015610cc8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cec91906122d9565b905081868481518110610d0157610d0161230f565b6001600160a01b0390921660209283029190910190910152612710610d27826064612298565b610d319086612298565b610d3b91906122b7565b858481518110610d4d57610d4d61230f565b60209081029190910101525050600101610bf7565b60005b85811015610db157610da9858281518110610d8257610d8261230f565b6020026020010151858381518110610d9c57610d9c61230f565b6020026020010151611905565b600101610d65565b505050505050565b610dc4838383610885565b6001600160a01b0382163b1580610e6d5750604051630a85bd0160e11b8082523360048301526001600160a01b03858116602484015260448301849052608060648401526000608484015290919084169063150b7a029060a4016020604051808303816000875af1158015610e3d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e619190612325565b6001600160e01b031916145b610eac5760405162461bcd60e51b815260206004820152601060248201526f155394d0519157d49150d2541251539560821b604482015260640161077b565b505050565b6008546001600160a01b03163314610efa5760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b80600d5481600f54610f0c9190612342565b1115610f2b5760405163d05cb60960e01b815260040160405180910390fd5b610f3b6340d097c360e01b611960565b60005b82811015610f5f57610f5784610f52611a0f565b611a3a565b600101610f3e565b82811015610f755763dfb035c96000526004601cfd5b50505050565b6008546001600160a01b03163314610fc45760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b600b610fd0828261239b565b5080604051610fdf919061245b565b604051908190038120907ff9c7803e94e0d3c02900d8a90893a6d5e90dd04d32a4cfe825520f82bf9f32f690600090a250565b6000818152600260205260409020546001600160a01b0316806110645760405162461bcd60e51b815260206004820152600a6024820152691393d517d3525395115160b21b604482015260640161077b565b919050565b60006001600160a01b0382166110c15760405162461bcd60e51b815260206004820152600c60248201527f5a45524f5f414444524553530000000000000000000000000000000000000000604482015260640161077b565b506001600160a01b031660009081526003602052604090205490565b6060600b80546110ec90612248565b80601f016020809104026020016040519081016040528092919081815260200182805461111890612248565b80156111655780601f1061113a57610100808354040283529160200191611165565b820191906000526020600020905b81548152906001019060200180831161114857829003601f168201915b5050505050905090565b6008546001600160a01b031633146111b85760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b600e805460ff19168215159081179091556040517f2f3b349e2956d565a50532dcc875a49be7f558411642122cf5e50ca9b4bb14e690600090a250565b6001805461067890612248565b6009546001146112545760405162461bcd60e51b815260206004820152600a60248201527f5245454e5452414e435900000000000000000000000000000000000000000000604482015260640161077b565b6002600955600e5460ff1661127c576040516316851fc760e11b815260040160405180910390fd5b80600d5481600f5461128e9190612342565b11156112ad5760405163d05cb60960e01b815260040160405180910390fd5b600c5482346112bc8284612298565b146112da5760405163f7760f2560e01b815260040160405180910390fd5b60005b848110156112f9576112f133610f52611a0f565b6001016112dd565b8481101561130f5763dfb035c96000526004601cfd5b50506001600955505050565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6008546001600160a01b031633146113d05760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b6113e063044df8e760e41b611960565b80516000905b80821015611425576113f8600a611b2d565b61141a83838151811061140d5761140d61230f565b6020026020010151611b4a565b8160010191506113e6565b80821015610eac5763dfb035c96000526004601cfd5b611446858585610885565b6001600160a01b0384163b15806114dd5750604051630a85bd0160e11b808252906001600160a01b0386169063150b7a029061148e9033908a90899089908990600401612477565b6020604051808303816000875af11580156114ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114d19190612325565b6001600160e01b031916145b61151c5760405162461bcd60e51b815260206004820152601060248201526f155394d0519157d49150d2541251539560821b604482015260640161077b565b5050505050565b6060600f5482111561154857604051635d68437560e11b815260040160405180910390fd5b600b61155383611c17565b6040516020016115649291906124cb565b6040516020818303038152906040529050919050565b6008546001600160a01b031633146115c35760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b6000600e60019054906101000a90046001600160a01b03166001600160a01b031663e919ecad6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611618573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061163c91906122d9565b905060008167ffffffffffffffff81111561165957611659612036565b604051908082528060200260200182016040528015611682578160200160208202803683370190505b50905060008267ffffffffffffffff8111156116a0576116a0612036565b6040519080825280602002602001820160405280156116c9578160200160208202803683370190505b506040516370a0823160e01b815230600482015290915060009081906001600160a01b038716906370a0823190602401602060405180830381865afa158015611716573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061173a91906122d9565b90505b848210156118ac57600e54604051631419245f60e11b81526004810184905260009161010090046001600160a01b03169063283248be90602401602060405180830381865afa158015611794573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117b891906122f2565b600e5460405163b34c8caf60e01b81526001600160a01b0380841660048301529293506000926101009092049091169063b34c8caf90602401602060405180830381865afa15801561180e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061183291906122d9565b9050818685815181106118475761184761230f565b6001600160a01b039092166020928302919091019091015261271061186d826064612298565b6118779085612298565b61188191906122b7565b8585815181106118935761189361230f565b602002602001018181525050836001019350505061173d565b60005b858110156118fc576118f4878683815181106118cd576118cd61230f565b60200260200101518684815181106118e7576118e761230f565b6020026020010151611c66565b6001016118af565b50505050505050565b600080600080600085875af1905080610eac5760405162461bcd60e51b815260206004820152601360248201527f4554485f5452414e534645525f4641494c454400000000000000000000000000604482015260640161077b565b6008546001600160a01b0316803b63ffffffff811660000361198157505050565b600854604051633b7279e960e21b81526001600160e01b0319851660048201526000916001600160a01b03169063edc9e7a490602401602060405180830381865afa1580156119d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119f891906122d9565b9050803414610f755763f7760f256000526004601cfd5b6000611a19611cec565b506001600f6000828254611a2d9190612342565b9091555050600f54919050565b611a448282611d03565b6001600160a01b0382163b1580611aea5750604051630a85bd0160e11b80825233600483015260006024830181905260448301849052608060648401526084830152906001600160a01b0384169063150b7a029060a4016020604051808303816000875af1158015611aba573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ade9190612325565b6001600160e01b031916145b611b295760405162461bcd60e51b815260206004820152601060248201526f155394d0519157d49150d2541251539560821b604482015260640161077b565b5050565b805480611b425763ce3a3d376000526004601cfd5b600019019055565b6000818152600260205260409020546001600160a01b031680611b9c5760405162461bcd60e51b815260206004820152600a6024820152691393d517d3525395115160b21b604482015260640161077b565b6001600160a01b038116600081815260036020908152604080832080546000190190558583526002825280832080546001600160a01b031990811690915560049092528083208054909216909155518492907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b604080516080810191829052607f0190826030600a8206018353600a90045b8015611c5457600183039250600a81066030018353600a9004611c36565b50819003601f19909101908152919050565b600060405163a9059cbb60e01b8152836004820152826024820152602060006044836000895af13d15601f3d1160016000511416171691505080610f755760405162461bcd60e51b815260206004820152600f60248201527f5452414e534645525f4641494c45440000000000000000000000000000000000604482015260640161077b565b6000611cfc600a80546001019055565b50600a5490565b6001600160a01b038216611d595760405162461bcd60e51b815260206004820152601160248201527f494e56414c49445f524543495049454e54000000000000000000000000000000604482015260640161077b565b6000818152600260205260409020546001600160a01b031615611dbe5760405162461bcd60e51b815260206004820152600e60248201527f414c52454144595f4d494e544544000000000000000000000000000000000000604482015260640161077b565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6001600160e01b031981168114611e3f57600080fd5b50565b600060208284031215611e5457600080fd5b8135611e5f81611e29565b9392505050565b60005b83811015611e81578181015183820152602001611e69565b50506000910152565b6020815260008251806020840152611ea9816040850160208701611e66565b601f01601f19169190910160400192915050565b600060208284031215611ecf57600080fd5b5035919050565b6001600160a01b0381168114611e3f57600080fd5b60008060408385031215611efe57600080fd5b8235611f0981611ed6565b946020939093013593505050565b600060208284031215611f2957600080fd5b8135611e5f81611ed6565b600080600080600060808688031215611f4c57600080fd5b8535611f5781611ed6565b94506020860135611f6781611ed6565b935060408601359250606086013567ffffffffffffffff80821115611f8b57600080fd5b818801915088601f830112611f9f57600080fd5b813581811115611fae57600080fd5b896020828501011115611fc057600080fd5b9699959850939650602001949392505050565b600080600060608486031215611fe857600080fd5b8335611ff381611ed6565b9250602084013561200381611ed6565b929592945050506040919091013590565b6000806040838503121561202757600080fd5b50508035926020909101359150565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561207557612075612036565b604052919050565b6000602080838503121561209057600080fd5b823567ffffffffffffffff808211156120a857600080fd5b818501915085601f8301126120bc57600080fd5b8135818111156120ce576120ce612036565b6120e0601f8201601f1916850161204c565b915080825286848285010111156120f657600080fd5b8084840185840137600090820190930192909252509392505050565b8035801515811461106457600080fd5b60006020828403121561213457600080fd5b611e5f82612112565b6000806040838503121561215057600080fd5b823561215b81611ed6565b9150610a9860208401612112565b6000602080838503121561217c57600080fd5b823567ffffffffffffffff8082111561219457600080fd5b818501915085601f8301126121a857600080fd5b8135818111156121ba576121ba612036565b8060051b91506121cb84830161204c565b81815291830184019184810190888411156121e557600080fd5b938501935b83851015612203578435825293850193908501906121ea565b98975050505050505050565b6000806040838503121561222257600080fd5b823561222d81611ed6565b9150602083013561223d81611ed6565b809150509250929050565b600181811c9082168061225c57607f821691505b60208210810361227c57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156122b2576122b2612282565b500290565b6000826122d457634e487b7160e01b600052601260045260246000fd5b500490565b6000602082840312156122eb57600080fd5b5051919050565b60006020828403121561230457600080fd5b8151611e5f81611ed6565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561233757600080fd5b8151611e5f81611e29565b8082018082111561066557610665612282565b601f821115610eac57600081815260208120601f850160051c8101602086101561237c5750805b601f850160051c820191505b81811015610db157828155600101612388565b815167ffffffffffffffff8111156123b5576123b5612036565b6123c9816123c38454612248565b84612355565b602080601f8311600181146123fe57600084156123e65750858301515b600019600386901b1c1916600185901b178555610db1565b600085815260208120601f198616915b8281101561242d5788860151825594840194600190910190840161240e565b508582101561244b5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6000825161246d818460208701611e66565b9190910192915050565b60006001600160a01b03808816835280871660208401525084604083015260806060830152826080830152828460a0840137600060a0848401015260a0601f19601f85011683010190509695505050505050565b60008084546124d981612248565b600182811680156124f1576001811461250657612535565b60ff1984168752821515830287019450612535565b8860005260208060002060005b8581101561252c5781548a820152908401908201612513565b50505082870194505b505050508351612549818360208801611e66565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000910190815260050194935050505056fea164736f6c6343000810000a";

type ERC721BasicConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721BasicConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721Basic__factory extends ContractFactory {
  constructor(...args: ERC721BasicConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _baseURI: PromiseOrValue<string>,
    _price: PromiseOrValue<BigNumberish>,
    _maxSupply: PromiseOrValue<BigNumberish>,
    _splitter: PromiseOrValue<string>,
    _fraction: PromiseOrValue<BigNumberish>,
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721Basic> {
    return super.deploy(
      _name,
      _symbol,
      _baseURI,
      _price,
      _maxSupply,
      _splitter,
      _fraction,
      _router,
      overrides || {}
    ) as Promise<ERC721Basic>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _baseURI: PromiseOrValue<string>,
    _price: PromiseOrValue<BigNumberish>,
    _maxSupply: PromiseOrValue<BigNumberish>,
    _splitter: PromiseOrValue<string>,
    _fraction: PromiseOrValue<BigNumberish>,
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _baseURI,
      _price,
      _maxSupply,
      _splitter,
      _fraction,
      _router,
      overrides || {}
    );
  }
  override attach(address: string): ERC721Basic {
    return super.attach(address) as ERC721Basic;
  }
  override connect(signer: Signer): ERC721Basic__factory {
    return super.connect(signer) as ERC721Basic__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721BasicInterface {
    return new utils.Interface(_abi) as ERC721BasicInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721Basic {
    return new Contract(address, _abi, signerOrProvider) as ERC721Basic;
  }
}

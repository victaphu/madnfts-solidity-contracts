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
      {
        internalType: "contract ERC20",
        name: "_erc20",
        type: "address",
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
      {
        internalType: "contract ERC20",
        name: "_erc20",
        type: "address",
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
  "0x608060405260016009553480156200001657600080fd5b5060405162002b6e38038062002b6e83398101604081905262000039916200027b565b80888860006200004a8382620003e7565b506001620000598282620003e7565b5050600880546001600160a01b0319166001600160a01b0384169081179091556040519091506000907f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d76908290a350600b620000b68782620003e7565b50600c859055600d849055600e8054610100600160a81b0319166101006001600160a01b03868116820292909217928390556001600160601b038516600681905560078054929094049092166001600160a01b0319909116179091556040517fc36422dcc77a5c93a5c48743078f8130c9fcc2a0ff893904ee62a3565688117c90600090a26007546040516001600160a01b03909116907f2a5a1009e36beb67c3a1ada61dd1343d7e9ec62c70965492fbaa06234f8316b190600090a25050505050505050620004b3565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001a957600080fd5b81516001600160401b0380821115620001c657620001c662000181565b604051601f8301601f19908116603f01168101908282118183101715620001f157620001f162000181565b816040528381526020925086838588010111156200020e57600080fd5b600091505b8382101562000232578582018301518183018401529082019062000213565b600093810190920192909252949350505050565b80516001600160a01b03811681146200025e57600080fd5b919050565b80516001600160601b03811681146200025e57600080fd5b600080600080600080600080610100898b0312156200029957600080fd5b88516001600160401b0380821115620002b157600080fd5b620002bf8c838d0162000197565b995060208b0151915080821115620002d657600080fd5b620002e48c838d0162000197565b985060408b0151915080821115620002fb57600080fd5b506200030a8b828c0162000197565b96505060608901519450608089015193506200032960a08a0162000246565b92506200033960c08a0162000263565b91506200034960e08a0162000246565b90509295985092959890939650565b600181811c908216806200036d57607f821691505b6020821081036200038e57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620003e257600081815260208120601f850160051c81016020861015620003bd5750805b601f850160051c820191505b81811015620003de57828155600101620003c9565b5050505b505050565b81516001600160401b0381111562000403576200040362000181565b6200041b8162000414845462000358565b8462000394565b602080601f8311600181146200045357600084156200043a5750858301515b600019600386901b1c1916600185901b178555620003de565b600085815260208120601f198616915b82811015620004845788860151825594840194600190910190840162000463565b5085821015620004a35787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6126ab80620004c36000396000f3fe6080604052600436106101d85760003560e01c806355f804b311610102578063a035b1fe11610095578063c87b56dd11610064578063c87b56dd1461056d578063d5abeb011461058d578063e985e9c5146105a3578063f4f3b200146105de57600080fd5b8063a035b1fe14610504578063a0712d681461051a578063a22cb4651461052d578063b88d4fde1461054d57600080fd5b8063879fbedf116100d1578063879fbedf1461049a5780638da5cb5b146104ba5780638fc3b549146104da57806395d89b41146104ef57600080fd5b806355f804b3146104255780636352211e1461044557806370a0823114610465578063714c53981461048557600080fd5b806322ab47a11161017a5780633ccfd60b116101495780633ccfd60b146103b85780633cd8045e146103cd57806342842e0e146103f2578063438b1b4b1461041257600080fd5b806322ab47a11461032c57806323b872dd146103465780632a55205a14610366578063362c0cb5146103a557600080fd5b8063095ea7b3116101b6578063095ea7b31461028257806313af4035146102a4578063150b7a02146102c457806318160ddd1461030957600080fd5b806301ffc9a7146101dd57806306fdde0314610212578063081812fc14610234575b600080fd5b3480156101e957600080fd5b506101fd6101f8366004611f07565b6105fe565b60405190151581526020015b60405180910390f35b34801561021e57600080fd5b5061022761066b565b6040516102099190611f4f565b34801561024057600080fd5b5061026a61024f366004611f82565b6004602052600090815260409020546001600160a01b031681565b6040516001600160a01b039091168152602001610209565b34801561028e57600080fd5b506102a261029d366004611fb0565b6106f9565b005b3480156102b057600080fd5b506102a26102bf366004611fdc565b6107e0565b3480156102d057600080fd5b506102f06102df366004611ff9565b630a85bd0160e11b95945050505050565b6040516001600160e01b03199091168152602001610209565b34801561031557600080fd5b5061031e610875565b604051908152602001610209565b34801561033857600080fd5b50600e546101fd9060ff1681565b34801561035257600080fd5b506102a2610361366004612098565b610885565b34801561037257600080fd5b506103866103813660046120d9565b610a6b565b604080516001600160a01b039093168352602083019190915201610209565b6102a26103b336600461214d565b610aa1565b3480156103c457600080fd5b506102a2610b77565b3480156103d957600080fd5b50600e5461026a9061010090046001600160a01b031681565b3480156103fe57600080fd5b506102a261040d366004612098565b610e8f565b6102a2610420366004612205565b610f87565b34801561043157600080fd5b506102a2610440366004612247565b61106e565b34801561045157600080fd5b5061026a610460366004611f82565b611105565b34801561047157600080fd5b5061031e610480366004611fdc565b61115c565b34801561049157600080fd5b506102276111d0565b3480156104a657600080fd5b506102a26104b53660046122ec565b611262565b3480156104c657600080fd5b5060085461026a906001600160a01b031681565b3480156104e657600080fd5b50600f5461031e565b3480156104fb57600080fd5b506102276112e8565b34801561051057600080fd5b5061031e600c5481565b6102a2610528366004611f82565b6112f5565b34801561053957600080fd5b506102a2610548366004612307565b61140e565b34801561055957600080fd5b506102a2610568366004611ff9565b61147a565b34801561057957600080fd5b50610227610588366004611f82565b61155b565b34801561059957600080fd5b5061031e600d5481565b3480156105af57600080fd5b506101fd6105be366004612333565b600560209081526000928352604080842090915290825290205460ff1681565b3480156105ea57600080fd5b506102a26105f9366004611fdc565b6115b2565b60006301ffc9a760e01b6001600160e01b03198316148061062f57506380ac58cd60e01b6001600160e01b03198316145b8061064a5750635b5e139f60e01b6001600160e01b03198316145b80610665575063152a902d60e11b6001600160e01b03198316145b92915050565b600080546106789061236c565b80601f01602080910402602001604051908101604052809291908181526020018280546106a49061236c565b80156106f15780601f106106c6576101008083540402835291602001916106f1565b820191906000526020600020905b8154815290600101906020018083116106d457829003601f168201915b505050505081565b6000818152600260205260409020546001600160a01b03163381148061074257506001600160a01b038116600090815260056020908152604080832033845290915290205460ff165b6107845760405162461bcd60e51b815260206004820152600e60248201526d1393d517d055551213d49256915160921b60448201526064015b60405180910390fd5b60008281526004602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b6008546001600160a01b031633146108295760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b600880546001600160a01b0319166001600160a01b03831690811790915560405133907f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7690600090a350565b6000610880600a5490565b905090565b6000818152600260205260409020546001600160a01b038481169116146108ee5760405162461bcd60e51b815260206004820152600a60248201527f57524f4e475f46524f4d00000000000000000000000000000000000000000000604482015260640161077b565b6001600160a01b0382166109445760405162461bcd60e51b815260206004820152601160248201527f494e56414c49445f524543495049454e54000000000000000000000000000000604482015260640161077b565b336001600160a01b038416148061097e57506001600160a01b038316600090815260056020908152604080832033845290915290205460ff165b8061099f57506000818152600460205260409020546001600160a01b031633145b6109dc5760405162461bcd60e51b815260206004820152600e60248201526d1393d517d055551213d49256915160921b604482015260640161077b565b6001600160a01b0380841660008181526003602090815260408083208054600019019055938616808352848320805460010190558583526002825284832080546001600160a01b03199081168317909155600490925284832080549092169091559251849392917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6007546006546001600160a01b039091169060009061271090610a8e90856123bc565b610a9891906123db565b90509250929050565b6008546001600160a01b03163314610aea5760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b610afb63044df8e760e41b3461193d565b6001600160a01b03811615610b1657610b16813330346119ed565b81516000905b80821015610b5b57610b2e600a611a79565b610b50848381518110610b4357610b436123fd565b6020026020010151611a96565b816001019150610b1c565b80821015610b715763dfb035c96000526004601cfd5b50505050565b6008546001600160a01b03163314610bc05760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b6000600e60019054906101000a90046001600160a01b03166001600160a01b031663e919ecad6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610c15573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c399190612413565b905060008167ffffffffffffffff811115610c5657610c566120fb565b604051908082528060200260200182016040528015610c7f578160200160208202803683370190505b50905060008267ffffffffffffffff811115610c9d57610c9d6120fb565b604051908082528060200260200182016040528015610cc6578160200160208202803683370190505b5090504760005b84811015610e3857600e54604051631419245f60e11b81526004810183905260009161010090046001600160a01b03169063283248be90602401602060405180830381865afa158015610d24573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d48919061242c565b600e5460405163b34c8caf60e01b81526001600160a01b0380841660048301529293506000926101009092049091169063b34c8caf90602401602060405180830381865afa158015610d9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc29190612413565b905081868481518110610dd757610dd76123fd565b6001600160a01b0390921660209283029190910190910152612710610dfd8260646123bc565b610e0790866123bc565b610e1191906123db565b858481518110610e2357610e236123fd565b60209081029190910101525050600101610ccd565b60005b85811015610e8757610e7f858281518110610e5857610e586123fd565b6020026020010151858381518110610e7257610e726123fd565b6020026020010151611b63565b600101610e3b565b505050505050565b610e9a838383610885565b6001600160a01b0382163b1580610f435750604051630a85bd0160e11b8082523360048301526001600160a01b03858116602484015260448301849052608060648401526000608484015290919084169063150b7a029060a4016020604051808303816000875af1158015610f13573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f379190612449565b6001600160e01b031916145b610f825760405162461bcd60e51b815260206004820152601060248201526f155394d0519157d49150d2541251539560821b604482015260640161077b565b505050565b6008546001600160a01b03163314610fd05760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b81600d5481600f54610fe29190612466565b11156110015760405163d05cb60960e01b815260040160405180910390fd5b6110126340d097c360e01b3461193d565b6001600160a01b0382161561102d5761102d823330346119ed565b60005b838110156110515761104985611044611bbe565b611be9565b600101611030565b838110156110675763dfb035c96000526004601cfd5b5050505050565b6008546001600160a01b031633146110b75760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b600b6110c382826124bf565b50806040516110d2919061257f565b604051908190038120907ff9c7803e94e0d3c02900d8a90893a6d5e90dd04d32a4cfe825520f82bf9f32f690600090a250565b6000818152600260205260409020546001600160a01b0316806111575760405162461bcd60e51b815260206004820152600a6024820152691393d517d3525395115160b21b604482015260640161077b565b919050565b60006001600160a01b0382166111b45760405162461bcd60e51b815260206004820152600c60248201527f5a45524f5f414444524553530000000000000000000000000000000000000000604482015260640161077b565b506001600160a01b031660009081526003602052604090205490565b6060600b80546111df9061236c565b80601f016020809104026020016040519081016040528092919081815260200182805461120b9061236c565b80156112585780601f1061122d57610100808354040283529160200191611258565b820191906000526020600020905b81548152906001019060200180831161123b57829003601f168201915b5050505050905090565b6008546001600160a01b031633146112ab5760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b600e805460ff19168215159081179091556040517f2f3b349e2956d565a50532dcc875a49be7f558411642122cf5e50ca9b4bb14e690600090a250565b600180546106789061236c565b6009546001146113475760405162461bcd60e51b815260206004820152600a60248201527f5245454e5452414e435900000000000000000000000000000000000000000000604482015260640161077b565b6002600955600e5460ff1661136f576040516316851fc760e11b815260040160405180910390fd5b80600d5481600f546113819190612466565b11156113a05760405163d05cb60960e01b815260040160405180910390fd5b600c5482346113af82846123bc565b146113cd5760405163f7760f2560e01b815260040160405180910390fd5b60005b848110156113ec576113e433611044611bbe565b6001016113d0565b848110156114025763dfb035c96000526004601cfd5b50506001600955505050565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b611485858585610885565b6001600160a01b0384163b158061151c5750604051630a85bd0160e11b808252906001600160a01b0386169063150b7a02906114cd9033908a9089908990899060040161259b565b6020604051808303816000875af11580156114ec573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115109190612449565b6001600160e01b031916145b6110675760405162461bcd60e51b815260206004820152601060248201526f155394d0519157d49150d2541251539560821b604482015260640161077b565b6060600f5482111561158057604051635d68437560e11b815260040160405180910390fd5b600b61158b83611cdc565b60405160200161159c9291906125ef565b6040516020818303038152906040529050919050565b6008546001600160a01b031633146115fb5760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b604482015260640161077b565b6000600e60019054906101000a90046001600160a01b03166001600160a01b031663e919ecad6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611650573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116749190612413565b905060008167ffffffffffffffff811115611691576116916120fb565b6040519080825280602002602001820160405280156116ba578160200160208202803683370190505b50905060008267ffffffffffffffff8111156116d8576116d86120fb565b604051908082528060200260200182016040528015611701578160200160208202803683370190505b506040516370a0823160e01b815230600482015290915060009081906001600160a01b038716906370a0823190602401602060405180830381865afa15801561174e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117729190612413565b90505b848210156118e457600e54604051631419245f60e11b81526004810184905260009161010090046001600160a01b03169063283248be90602401602060405180830381865afa1580156117cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117f0919061242c565b600e5460405163b34c8caf60e01b81526001600160a01b0380841660048301529293506000926101009092049091169063b34c8caf90602401602060405180830381865afa158015611846573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061186a9190612413565b90508186858151811061187f5761187f6123fd565b6001600160a01b03909216602092830291909101909101526127106118a58260646123bc565b6118af90856123bc565b6118b991906123db565b8585815181106118cb576118cb6123fd565b6020026020010181815250508360010193505050611775565b60005b858110156119345761192c87868381518110611905576119056123fd565b602002602001015186848151811061191f5761191f6123fd565b6020026020010151611d2b565b6001016118e7565b50505050505050565b6008546001600160a01b0316803b63ffffffff811660000361195f5750505050565b600854604051633b7279e960e21b81526001600160e01b0319861660048201526000916001600160a01b03169063edc9e7a490602401602060405180830381865afa1580156119b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119d69190612413565b90508084146110675763f7760f256000526004601cfd5b60006040516323b872dd60e01b81528460048201528360248201528260448201526020600060648360008a5af13d15601f3d11600160005114161716915050806110675760405162461bcd60e51b815260206004820152601460248201527f5452414e534645525f46524f4d5f4641494c4544000000000000000000000000604482015260640161077b565b805480611a8e5763ce3a3d376000526004601cfd5b600019019055565b6000818152600260205260409020546001600160a01b031680611ae85760405162461bcd60e51b815260206004820152600a6024820152691393d517d3525395115160b21b604482015260640161077b565b6001600160a01b038116600081815260036020908152604080832080546000190190558583526002825280832080546001600160a01b031990811690915560049092528083208054909216909155518492907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b600080600080600085875af1905080610f825760405162461bcd60e51b815260206004820152601360248201527f4554485f5452414e534645525f4641494c454400000000000000000000000000604482015260640161077b565b6000611bc8611db1565b506001600f6000828254611bdc9190612466565b9091555050600f54919050565b611bf38282611dc8565b6001600160a01b0382163b1580611c995750604051630a85bd0160e11b80825233600483015260006024830181905260448301849052608060648401526084830152906001600160a01b0384169063150b7a029060a4016020604051808303816000875af1158015611c69573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c8d9190612449565b6001600160e01b031916145b611cd85760405162461bcd60e51b815260206004820152601060248201526f155394d0519157d49150d2541251539560821b604482015260640161077b565b5050565b604080516080810191829052607f0190826030600a8206018353600a90045b8015611d1957600183039250600a81066030018353600a9004611cfb565b50819003601f19909101908152919050565b600060405163a9059cbb60e01b8152836004820152826024820152602060006044836000895af13d15601f3d1160016000511416171691505080610b715760405162461bcd60e51b815260206004820152600f60248201527f5452414e534645525f4641494c45440000000000000000000000000000000000604482015260640161077b565b6000611dc1600a80546001019055565b50600a5490565b6001600160a01b038216611e1e5760405162461bcd60e51b815260206004820152601160248201527f494e56414c49445f524543495049454e54000000000000000000000000000000604482015260640161077b565b6000818152600260205260409020546001600160a01b031615611e835760405162461bcd60e51b815260206004820152600e60248201527f414c52454144595f4d494e544544000000000000000000000000000000000000604482015260640161077b565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6001600160e01b031981168114611f0457600080fd5b50565b600060208284031215611f1957600080fd5b8135611f2481611eee565b9392505050565b60005b83811015611f46578181015183820152602001611f2e565b50506000910152565b6020815260008251806020840152611f6e816040850160208701611f2b565b601f01601f19169190910160400192915050565b600060208284031215611f9457600080fd5b5035919050565b6001600160a01b0381168114611f0457600080fd5b60008060408385031215611fc357600080fd5b8235611fce81611f9b565b946020939093013593505050565b600060208284031215611fee57600080fd5b8135611f2481611f9b565b60008060008060006080868803121561201157600080fd5b853561201c81611f9b565b9450602086013561202c81611f9b565b935060408601359250606086013567ffffffffffffffff8082111561205057600080fd5b818801915088601f83011261206457600080fd5b81358181111561207357600080fd5b89602082850101111561208557600080fd5b9699959850939650602001949392505050565b6000806000606084860312156120ad57600080fd5b83356120b881611f9b565b925060208401356120c881611f9b565b929592945050506040919091013590565b600080604083850312156120ec57600080fd5b50508035926020909101359150565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561213a5761213a6120fb565b604052919050565b803561115781611f9b565b6000806040838503121561216057600080fd5b823567ffffffffffffffff8082111561217857600080fd5b818501915085601f83011261218c57600080fd5b81356020828211156121a0576121a06120fb565b8160051b92506121b1818401612111565b82815292840181019281810190898511156121cb57600080fd5b948201945b848610156121e9578535825294820194908201906121d0565b96506121f89050878201612142565b9450505050509250929050565b60008060006060848603121561221a57600080fd5b833561222581611f9b565b925060208401359150604084013561223c81611f9b565b809150509250925092565b6000602080838503121561225a57600080fd5b823567ffffffffffffffff8082111561227257600080fd5b818501915085601f83011261228657600080fd5b813581811115612298576122986120fb565b6122aa601f8201601f19168501612111565b915080825286848285010111156122c057600080fd5b8084840185840137600090820190930192909252509392505050565b8035801515811461115757600080fd5b6000602082840312156122fe57600080fd5b611f24826122dc565b6000806040838503121561231a57600080fd5b823561232581611f9b565b9150610a98602084016122dc565b6000806040838503121561234657600080fd5b823561235181611f9b565b9150602083013561236181611f9b565b809150509250929050565b600181811c9082168061238057607f821691505b6020821081036123a057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156123d6576123d66123a6565b500290565b6000826123f857634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561242557600080fd5b5051919050565b60006020828403121561243e57600080fd5b8151611f2481611f9b565b60006020828403121561245b57600080fd5b8151611f2481611eee565b80820180821115610665576106656123a6565b601f821115610f8257600081815260208120601f850160051c810160208610156124a05750805b601f850160051c820191505b81811015610e87578281556001016124ac565b815167ffffffffffffffff8111156124d9576124d96120fb565b6124ed816124e7845461236c565b84612479565b602080601f831160018114612522576000841561250a5750858301515b600019600386901b1c1916600185901b178555610e87565b600085815260208120601f198616915b8281101561255157888601518255948401946001909101908401612532565b508582101561256f5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008251612591818460208701611f2b565b9190910192915050565b60006001600160a01b03808816835280871660208401525084604083015260806060830152826080830152828460a0840137600060a0848401015260a0601f19601f85011683010190509695505050505050565b60008084546125fd8161236c565b60018281168015612615576001811461262a57612659565b60ff1984168752821515830287019450612659565b8860005260208060002060005b858110156126505781548a820152908401908201612637565b50505082870194505b50505050835161266d818360208801611f2b565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000910190815260050194935050505056fea164736f6c6343000810000a";

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

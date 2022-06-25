export const WORLDFUND_CONTRACT = {
  "_format": "hh-sol-artifact-1",
  "contractName": "Worldfund",
  "sourceName": "contracts/Worldfund.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_fundAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "donater",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Donated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getFundAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_fundAddress",
          "type": "address"
        }
      ],
      "name": "setFundAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "toggleActive",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040523480156200001157600080fd5b506040516200121d3803806200121d8339818101604052810190620000379190620003f2565b620000576200004b6200011e60201b60201c565b6200012660201b60201c565b620000876040518060600160405280602a8152602001620011f3602a913984620001ea60201b620005e91760201c565b82600190805190602001906200009f929190620002b9565b5080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160029080519060200190620000f9929190620002b9565b506001600360146101000a81548160ff021916908315150217905550505050620006d0565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6200028c828260405160240162000203929190620004bb565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506200029060201b60201c565b5050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b828054620002c790620005db565b90600052602060002090601f016020900481019282620002eb576000855562000337565b82601f106200030657805160ff191683800117855562000337565b8280016001018555821562000337579182015b828111156200033657825182559160200191906001019062000319565b5b5090506200034691906200034a565b5090565b5b80821115620003655760008160009055506001016200034b565b5090565b6000620003806200037a846200051f565b620004f6565b9050828152602081018484840111156200039957600080fd5b620003a6848285620005a5565b509392505050565b600081519050620003bf81620006b6565b92915050565b600082601f830112620003d757600080fd5b8151620003e984826020860162000369565b91505092915050565b6000806000606084860312156200040857600080fd5b600084015167ffffffffffffffff8111156200042357600080fd5b6200043186828701620003c5565b935050602084015167ffffffffffffffff8111156200044f57600080fd5b6200045d86828701620003c5565b92505060406200047086828701620003ae565b9150509250925092565b6000620004878262000555565b62000493818562000560565b9350620004a5818560208601620005a5565b620004b081620006a5565b840191505092915050565b60006040820190508181036000830152620004d781856200047a565b90508181036020830152620004ed81846200047a565b90509392505050565b60006200050262000515565b905062000510828262000611565b919050565b6000604051905090565b600067ffffffffffffffff8211156200053d576200053c62000676565b5b6200054882620006a5565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b60006200057e8262000585565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60005b83811015620005c5578082015181840152602081019050620005a8565b83811115620005d5576000848401525b50505050565b60006002820490506001821680620005f457607f821691505b602082108114156200060b576200060a62000647565b5b50919050565b6200061c82620006a5565b810181811067ffffffffffffffff821117156200063e576200063d62000676565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b620006c18162000571565b8114620006cd57600080fd5b50565b610b1380620006e06000396000f3fe6080604052600436106100705760003560e01c806385dc30041161004e57806385dc3004146100e25780638da5cb5b1461011f578063ed88c68e1461014a578063f2fde38b1461015457610070565b8063274144c61461007557806329c68dc1146100a0578063715018a6146100cb575b600080fd5b34801561008157600080fd5b5061008a61017d565b6040516100979190610887565b60405180910390f35b3480156100ac57600080fd5b506100b56101a7565b6040516100c291906108cb565b60405180910390f35b3480156100d757600080fd5b506100e0610264565b005b3480156100ee57600080fd5b506101096004803603810190610104919061078f565b6102ec565b6040516101169190610887565b60405180910390f35b34801561012b57600080fd5b506101346103d5565b6040516101419190610887565b60405180910390f35b6101526103fe565b005b34801561016057600080fd5b5061017b6004803603810190610176919061078f565b6104f1565b005b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60006101b1610685565b73ffffffffffffffffffffffffffffffffffffffff166101cf6103d5565b73ffffffffffffffffffffffffffffffffffffffff1614610225576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161021c9061093d565b60405180910390fd5b600360149054906101000a900460ff1615600360146101000a81548160ff021916908315150217905550600360149054906101000a900460ff16905090565b61026c610685565b73ffffffffffffffffffffffffffffffffffffffff1661028a6103d5565b73ffffffffffffffffffffffffffffffffffffffff16146102e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102d79061093d565b60405180910390fd5b6102ea600061068d565b565b60006102f6610685565b73ffffffffffffffffffffffffffffffffffffffff166103146103d5565b73ffffffffffffffffffffffffffffffffffffffff161461036a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103619061093d565b60405180910390fd5b81600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600360149054906101000a900460ff1661044d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104449061095d565b60405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f193505050501580156104b5573d6000803e3d6000fd5b507f2a01595cddf097c90216094025db714da3f4e5bd8877b56ba86a24ecead8e54333346040516104e79291906108a2565b60405180910390a1565b6104f9610685565b73ffffffffffffffffffffffffffffffffffffffff166105176103d5565b73ffffffffffffffffffffffffffffffffffffffff161461056d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105649061093d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156105dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d49061091d565b60405180910390fd5b6105e68161068d565b50565b61068182826040516024016105ff9291906108e6565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610751565b5050565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b60008135905061078981610ac6565b92915050565b6000602082840312156107a157600080fd5b60006107af8482850161077a565b91505092915050565b6107c181610999565b82525050565b6107d0816109ab565b82525050565b60006107e18261097d565b6107eb8185610988565b93506107fb8185602086016109e1565b61080481610a14565b840191505092915050565b600061081c602683610988565b915061082782610a25565b604082019050919050565b600061083f602083610988565b915061084a82610a74565b602082019050919050565b6000610862601783610988565b915061086d82610a9d565b602082019050919050565b610881816109d7565b82525050565b600060208201905061089c60008301846107b8565b92915050565b60006040820190506108b760008301856107b8565b6108c46020830184610878565b9392505050565b60006020820190506108e060008301846107c7565b92915050565b6000604082019050818103600083015261090081856107d6565b9050818103602083015261091481846107d6565b90509392505050565b600060208201905081810360008301526109368161080f565b9050919050565b6000602082019050818103600083015261095681610832565b9050919050565b6000602082019050818103600083015261097681610855565b9050919050565b600081519050919050565b600082825260208201905092915050565b60006109a4826109b7565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b838110156109ff5780820151818401526020810190506109e4565b83811115610a0e576000848401525b50505050565b6000601f19601f8301169050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f436f6e7472616374206973206e6f742061637469766521000000000000000000600082015250565b610acf81610999565b8114610ada57600080fd5b5056fea26469706673582212207de7fc3b26c6d46894d5d3a1b916dfca562f6b1b4d67e7bbe6340217314eb5d264736f6c634300080400334465706c6f79696e67206120576f726c6466756e6420636f6e74726163742077697468207469746c653a",
  "deployedBytecode": "0x6080604052600436106100705760003560e01c806385dc30041161004e57806385dc3004146100e25780638da5cb5b1461011f578063ed88c68e1461014a578063f2fde38b1461015457610070565b8063274144c61461007557806329c68dc1146100a0578063715018a6146100cb575b600080fd5b34801561008157600080fd5b5061008a61017d565b6040516100979190610887565b60405180910390f35b3480156100ac57600080fd5b506100b56101a7565b6040516100c291906108cb565b60405180910390f35b3480156100d757600080fd5b506100e0610264565b005b3480156100ee57600080fd5b506101096004803603810190610104919061078f565b6102ec565b6040516101169190610887565b60405180910390f35b34801561012b57600080fd5b506101346103d5565b6040516101419190610887565b60405180910390f35b6101526103fe565b005b34801561016057600080fd5b5061017b6004803603810190610176919061078f565b6104f1565b005b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60006101b1610685565b73ffffffffffffffffffffffffffffffffffffffff166101cf6103d5565b73ffffffffffffffffffffffffffffffffffffffff1614610225576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161021c9061093d565b60405180910390fd5b600360149054906101000a900460ff1615600360146101000a81548160ff021916908315150217905550600360149054906101000a900460ff16905090565b61026c610685565b73ffffffffffffffffffffffffffffffffffffffff1661028a6103d5565b73ffffffffffffffffffffffffffffffffffffffff16146102e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102d79061093d565b60405180910390fd5b6102ea600061068d565b565b60006102f6610685565b73ffffffffffffffffffffffffffffffffffffffff166103146103d5565b73ffffffffffffffffffffffffffffffffffffffff161461036a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103619061093d565b60405180910390fd5b81600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600360149054906101000a900460ff1661044d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104449061095d565b60405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f193505050501580156104b5573d6000803e3d6000fd5b507f2a01595cddf097c90216094025db714da3f4e5bd8877b56ba86a24ecead8e54333346040516104e79291906108a2565b60405180910390a1565b6104f9610685565b73ffffffffffffffffffffffffffffffffffffffff166105176103d5565b73ffffffffffffffffffffffffffffffffffffffff161461056d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105649061093d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156105dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d49061091d565b60405180910390fd5b6105e68161068d565b50565b61068182826040516024016105ff9291906108e6565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610751565b5050565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b60008135905061078981610ac6565b92915050565b6000602082840312156107a157600080fd5b60006107af8482850161077a565b91505092915050565b6107c181610999565b82525050565b6107d0816109ab565b82525050565b60006107e18261097d565b6107eb8185610988565b93506107fb8185602086016109e1565b61080481610a14565b840191505092915050565b600061081c602683610988565b915061082782610a25565b604082019050919050565b600061083f602083610988565b915061084a82610a74565b602082019050919050565b6000610862601783610988565b915061086d82610a9d565b602082019050919050565b610881816109d7565b82525050565b600060208201905061089c60008301846107b8565b92915050565b60006040820190506108b760008301856107b8565b6108c46020830184610878565b9392505050565b60006020820190506108e060008301846107c7565b92915050565b6000604082019050818103600083015261090081856107d6565b9050818103602083015261091481846107d6565b90509392505050565b600060208201905081810360008301526109368161080f565b9050919050565b6000602082019050818103600083015261095681610832565b9050919050565b6000602082019050818103600083015261097681610855565b9050919050565b600081519050919050565b600082825260208201905092915050565b60006109a4826109b7565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b838110156109ff5780820151818401526020810190506109e4565b83811115610a0e576000848401525b50505050565b6000601f19601f8301169050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f436f6e7472616374206973206e6f742061637469766521000000000000000000600082015250565b610acf81610999565b8114610ada57600080fd5b5056fea26469706673582212207de7fc3b26c6d46894d5d3a1b916dfca562f6b1b4d67e7bbe6340217314eb5d264736f6c63430008040033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
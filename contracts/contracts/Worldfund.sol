//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Worldfund is Ownable {
    // A Worldfund contract represents a esignature processto be active.
    
    string private title; // title of the worldfund contract.
    string private description; // Link to the worldfund documents to be signed.
    address private fundAddress; // Designated fund.
    uint private goal; // Target amount to raise (eth/optional).

    string public proof;

    bool active;

    event Donated(address donater, uint amount);

    constructor(string memory _title, 
                string memory _description, 
                address _fundAddress,
                string memory _proof) {
        console.log("Deploying a Worldfund contract with title:", _title);
        title = _title;
        fundAddress = _fundAddress;
        description = _description;
        proof = _proof; // Nullifier hash uniquely identifying this contract.
        active = true;
    }

    function donate() public payable {
        require(active, "Contract is not active!");
        payable(fundAddress).transfer(msg.value);
        emit Donated(msg.sender, msg.value);
    }

    function toggleActive() public onlyOwner returns (bool) {
        active = !active;
        return active;
    }

    function getFundAddress() public view returns (address) {
        return fundAddress;
    }

    function setFundAddress(address _fundAddress) public onlyOwner returns (address) {
        fundAddress = _fundAddress;
        return fundAddress;
    }

}

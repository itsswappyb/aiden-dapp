// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgentDeployment {
    uint256 public deploymentFee;
    mapping(address => bool) public hasPaid;
    
    event DeploymentFeePaid(address indexed user, uint256 amount);

    constructor(uint256 _deploymentFee) {
        deploymentFee = _deploymentFee;
    }

    function payDeploymentFee() external payable {
        require(!hasPaid[msg.sender], "Already paid");
        require(msg.value == deploymentFee, "Incorrect payment amount");
        
        hasPaid[msg.sender] = true;
        emit DeploymentFeePaid(msg.sender, msg.value);
    }

    function checkPaymentStatus(address user) external view returns (bool) {
        return hasPaid[user];
    }
} 
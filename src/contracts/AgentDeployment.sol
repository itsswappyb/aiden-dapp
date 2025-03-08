// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AgentDeployment is Ownable {
    IERC20 public mntToken;
    uint256 public deploymentFee;
    mapping(address => bool) public hasPaid;
    
    event DeploymentFeePaid(address indexed user, uint256 amount);

    constructor(address _mntToken, uint256 _deploymentFee) Ownable(msg.sender) {
        mntToken = IERC20(_mntToken);
        deploymentFee = _deploymentFee;
    }

    function payDeploymentFee() external {
        require(!hasPaid[msg.sender], "Already paid");
        require(mntToken.transferFrom(msg.sender, address(this), deploymentFee), "Transfer failed");
        
        hasPaid[msg.sender] = true;
        emit DeploymentFeePaid(msg.sender, deploymentFee);
    }

    function setDeploymentFee(uint256 _newFee) external onlyOwner {
        deploymentFee = _newFee;
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = mntToken.balanceOf(address(this));
        require(mntToken.transfer(owner(), balance), "Withdrawal failed");
    }

    function checkPaymentStatus(address _user) external view returns (bool) {
        return hasPaid[_user];
    }
} 
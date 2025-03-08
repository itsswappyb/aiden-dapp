// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AgentDeployment.sol";

contract AgentDeploymentTest is Test {
    AgentDeployment public deployment;
    address public user = address(1);
    uint256 public constant DEPLOYMENT_FEE = 1 ether; // 1 MNT

    function setUp() public {
        deployment = new AgentDeployment(DEPLOYMENT_FEE);
        // Give user some MNT
        vm.deal(user, 10 ether);
    }

    function testPayDeploymentFee() public {
        vm.startPrank(user);
        deployment.payDeploymentFee{value: DEPLOYMENT_FEE}();
        
        assertTrue(deployment.hasPaid(user));
        assertEq(address(deployment).balance, DEPLOYMENT_FEE);
        vm.stopPrank();
    }

    function testCannotPayTwice() public {
        vm.startPrank(user);
        deployment.payDeploymentFee{value: DEPLOYMENT_FEE}();
        
        vm.expectRevert("Already paid");
        deployment.payDeploymentFee{value: DEPLOYMENT_FEE}();
        vm.stopPrank();
    }

    function testIncorrectPaymentAmount() public {
        vm.startPrank(user);
        vm.expectRevert("Incorrect payment amount");
        deployment.payDeploymentFee{value: 0.5 ether}();
        vm.stopPrank();
    }

    function testCheckPaymentStatus() public {
        assertFalse(deployment.checkPaymentStatus(user));
        
        vm.startPrank(user);
        deployment.payDeploymentFee{value: DEPLOYMENT_FEE}();
        assertTrue(deployment.checkPaymentStatus(user));
        vm.stopPrank();
    }
} 
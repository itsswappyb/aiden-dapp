// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/AgentDeployment.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        uint256 deploymentFee = 1 ether; // 1 MNT

        vm.startBroadcast(deployerPrivateKey);

        AgentDeployment deployment = new AgentDeployment(
            deploymentFee
        );

        console.log("Contract deployed at:", address(deployment));

        vm.stopBroadcast();
    }
} 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MyContract {
    string public greeting = "Hello, Blockchain!";

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}


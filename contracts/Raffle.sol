//Raffle
//Enter the lottery (paying some amount)
//Pick a random winner (verifiably random)
//Winnder to be selected every X minutes -> completly automate
//Chainlink oracle -> Randomness, Automated Execution (Chainlink keepers)

//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

error Raffle__NotEnoughETHEntered();

contract Raffle {
    /*State variables*/
    uint256 private immutable i_enteranceFee;
    address payable[] private s_players;

    /*events*/
    event RaffleEnter(address indexed player);

    constructor(uint256 entranceFee) {
        i_enteranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        if (msg.value < i_enteranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }
        s_players.push(payable(msg.sender));

        //Emit an event when we update a dynamic array or mapping
        emit RaffleEnter(msg.sender);
    }

    function getEnteranceFee() public view returns (uint256) {
        return i_enteranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}

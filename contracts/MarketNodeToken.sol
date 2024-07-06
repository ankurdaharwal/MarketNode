// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MarketNodeToken is ERC20, Ownable {
    constructor() ERC20("MarketNodeToken", "MNT") Ownable(msg.sender) {
        // Initial mint, if necessary
        // _mint(msg.sender, 1000 * 10 ** decimals());
    }

    // Minting function to create new tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Burning function to destroy tokens
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    // Transfer function (inherited from ERC20)
    function transfer(
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        return super.transfer(recipient, amount);
    }

    // Check balance function (inherited from ERC20)
    function balanceOf(address account) public view override returns (uint256) {
        return super.balanceOf(account);
    }
}

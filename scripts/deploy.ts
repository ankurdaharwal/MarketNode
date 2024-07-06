import { ethers } from "hardhat";

async function main() {
  // Get the contract factory
  const Token = await ethers.getContractFactory("MarketNodeToken");

  // Deploy the contract
  const token = await Token.deploy();

  console.log("Token deployed to:", token.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

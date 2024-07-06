import { ethers } from "hardhat";
import { expect } from "chai";

describe("MarketNodeToken", function () {
  let token: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    const Token = await ethers.getContractFactory("MarketNodeToken");
    token = await Token.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should have zero total supply initially", async function () {
      expect(await token.totalSupply()).to.equal(0);
    });
  });

  describe("Minting", function () {
    it("Should mint tokens to the owner", async function () {
      await token.connect(owner).mint(owner.address, 1000);
      expect(await token.balanceOf(owner.address)).to.equal(1000);
      expect(await token.totalSupply()).to.equal(1000);
    });

    it("Should only allow the owner to mint", async function () {
      await expect(
        token.connect(addr1).mint(addr1.address, 1000)
      ).to.be.revertedWithCustomError(token, `OwnableUnauthorizedAccount`);
    });
  });

  describe("Burning", function () {
    beforeEach(async function () {
      await token.mint(owner.address, 1000);
    });

    it("Should burn tokens from the caller", async function () {
      await token.burn(500);
      expect(await token.balanceOf(owner.address)).to.equal(500);
      expect(await token.totalSupply()).to.equal(500);
    });

    it("Should not allow burning more tokens than the caller's balance", async function () {
      await expect(token.burn(1500)).to.be.revertedWithCustomError(
        token,
        `ERC20InsufficientBalance`
      );
    });
  });

  describe("Transfers", function () {
    beforeEach(async function () {
      await token.mint(owner.address, 1000);
    });

    it("Should transfer tokens between accounts", async function () {
      await token.transfer(addr1.address, 500);
      expect(await token.balanceOf(owner.address)).to.equal(500);
      expect(await token.balanceOf(addr1.address)).to.equal(500);
    });

    it("Should not allow transferring more tokens than the sender's balance", async function () {
      await expect(
        token.transfer(addr1.address, 1500)
      ).to.be.revertedWithCustomError(token, `ERC20InsufficientBalance`);
    });

    it("Should allow addr1 to transfer tokens to addr2", async function () {
      await token.transfer(addr1.address, 500);
      await token.connect(addr1).transfer(addr2.address, 200);
      expect(await token.balanceOf(addr1.address)).to.equal(300);
      expect(await token.balanceOf(addr2.address)).to.equal(200);
    });
  });
});

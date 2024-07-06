import { Router } from "express";
import { ethers } from "ethers";

export const router = Router();

/**
 * @swagger
 * tags:
 *   name: Token
 *   description: ERC20 Token management
 */

/**
 * @swagger
 * /mint:
 *   post:
 *     summary: Mint tokens
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully minted tokens
 *       500:
 *         description: Server error
 */
router.post("/mint", async (req, res) => {
  const { to, amount } = req.body;
  try {
    const contract = req.app.locals.contract;
    const tx = await contract.mint(
      to,
      ethers.parseUnits(amount.toString(), 18)
    );
    await tx.wait();
    res.status(200).send({
      message: "Tokens minted successfully",
      transactionHash: tx.hash,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

/**
 * @swagger
 * /burn:
 *   post:
 *     summary: Burn tokens
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully burned tokens
 *       500:
 *         description: Server error
 */
router.post("/burn", async (req, res) => {
  const { amount } = req.body;
  try {
    const contract = req.app.locals.contract;
    const tx = await contract.burn(ethers.parseUnits(amount.toString(), 18));
    await tx.wait();
    res.status(200).send({
      message: "Tokens burned successfully",
      transactionHash: tx.hash,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Transfer tokens
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully transferred tokens
 *       500:
 *         description: Server error
 */
router.post("/transfer", async (req, res) => {
  const { to, amount } = req.body;
  try {
    const contract = req.app.locals.contract;
    const tx = await contract.transfer(
      to,
      ethers.parseUnits(amount.toString(), 18)
    );
    await tx.wait();
    res.status(200).send({
      message: "Tokens transferred successfully",
      transactionHash: tx.hash,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

/**
 * @swagger
 * /token-info:
 *   get:
 *     summary: Get token information
 *     tags: [Token]
 *     responses:
 *       200:
 *         description: Token information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                 totalSupply:
 *                   type: string
 *                 owner:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.get("/token-info", async (req, res) => {
  try {
    const contract = req.app.locals.contract;
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    const owner = await contract.owner();

    res.status(200).send({
      //   symbol,
      totalSupply: ethers.formatUnits(totalSupply, 18),
      owner,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Get token balance of an address
 *     tags: [Token]
 *     parameters:
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         required: true
 *         description: Address to query the balance for
 *     responses:
 *       200:
 *         description: Balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.get("/balance", async (req, res) => {
  const { address } = req.query;
  try {
    const contract = req.app.locals.contract;
    const balance = await contract.balanceOf(address);

    res.status(200).send({
      balance: ethers.formatUnits(balance, 18),
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ethers_1 = require("ethers");
exports.router = (0, express_1.Router)();
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
exports.router.post("/mint", async (req, res) => {
    const { to, amount } = req.body;
    try {
        const contract = req.app.locals.contract;
        const tx = await contract.mint(to, ethers_1.ethers.parseUnits(amount.toString(), 18));
        await tx.wait();
        res.status(200).send({
            message: "Tokens minted successfully",
            transactionHash: tx.hash,
        });
    }
    catch (error) {
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
exports.router.post("/burn", async (req, res) => {
    const { amount } = req.body;
    try {
        const contract = req.app.locals.contract;
        const tx = await contract.burn(ethers_1.ethers.parseUnits(amount.toString(), 18));
        await tx.wait();
        res.status(200).send({
            message: "Tokens burned successfully",
            transactionHash: tx.hash,
        });
    }
    catch (error) {
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
exports.router.post("/transfer", async (req, res) => {
    const { to, amount } = req.body;
    try {
        const contract = req.app.locals.contract;
        const tx = await contract.transfer(to, ethers_1.ethers.parseUnits(amount.toString(), 18));
        await tx.wait();
        res.status(200).send({
            message: "Tokens transferred successfully",
            transactionHash: tx.hash,
        });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

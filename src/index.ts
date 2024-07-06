import express from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { router } from "./routes";
import tokenAbi from "./abi/MarketNodeToken.json";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Market Node ERC20 Token API",
      version: "1.0.0",
      description: "API to interact with an ERC20 Token",
      contact: {
        name: "Ankur Daharwal",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const provider = new ethers.JsonRpcProvider(process.env.AMOY_TESTNET);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS as string,
  tokenAbi.abi,
  wallet
);

app.locals.contract = contract;

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

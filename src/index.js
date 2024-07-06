"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const routes_1 = require("./routes");
const MarketNodeToken_json_1 = __importDefault(require("./abi/MarketNodeToken.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
const provider = new ethers_1.ethers.JsonRpcProvider(process.env.AMOY_TESTNET);
const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers_1.ethers.Contract(process.env.CONTRACT_ADDRESS, MarketNodeToken_json_1.default.abi, wallet);
app.locals.contract = contract;
app.use("/", routes_1.router);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

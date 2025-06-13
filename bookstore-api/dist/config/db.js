"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in the environment variables");
        }
        await mongoose_1.default.connect(mongoUri, {
            dbName: "myVirtualDatabase",
        });
        console.log("MongoDB Connected!");
    }
    catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};
exports.default = connectDB;

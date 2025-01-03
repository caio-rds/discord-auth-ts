import dotenv from "dotenv";

dotenv.config();
export const config = {
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID!,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET!,
    REDIRECT_URI: process.env.REDIRECT_URI!,
};
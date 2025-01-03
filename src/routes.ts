import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import axios from "axios";
import { config } from "./env";

const DISCORD_API = "https://discord.com/api";

export async function discordRoutes(fastify: FastifyInstance) {

    fastify.get("/auth/discord", async (request: FastifyRequest, reply: FastifyReply) => {
        const discordOAuthUrl = `${DISCORD_API}/oauth2/authorize?client_id=${config.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
            config.REDIRECT_URI
        )}&response_type=code&scope=identify email`;

        reply.redirect(discordOAuthUrl);
    });

    fastify.get("/auth/discord/callback", async (request: FastifyRequest, reply: FastifyReply) => {
        const code = (request.query as { code?: string }).code;

        if (!code) {
            return reply.status(400).send({ error: "Missing code parameter." });
        }

        try {
            const tokenResponse = await axios.post(
                `${DISCORD_API}/oauth2/token`,
                new URLSearchParams({
                    client_id: config.DISCORD_CLIENT_ID,
                    client_secret: config.DISCORD_CLIENT_SECRET,
                    grant_type: "authorization_code",
                    code,
                    redirect_uri: config.REDIRECT_URI,
                }),
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
            );

            const userResponse = await axios.get(`${DISCORD_API}/users/@me`, {
                headers: {
                    Authorization: `Bearer ${tokenResponse.data.access_token}`,
                },
            });

            return reply.send({ user: userResponse.data });
        } catch (err) {
            console.error("Erro durante a autenticação:", err);
            return reply.status(500).send({ error: "Failed to authenticate with Discord." });
        }
    });

    fastify.get("/health", async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.send({ status: "ok" });
    });

}

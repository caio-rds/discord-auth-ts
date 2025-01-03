import Fastify, {FastifyInstance} from "fastify";
import cors from '@fastify/cors';
import { discordRoutes } from "./routes";

async function main() {
    const fastify: FastifyInstance = Fastify(
        {logger: true}
    );

    await fastify.register(cors, {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    });

    await fastify.register(discordRoutes);

    const PORT = 5000;
    fastify.listen({port: PORT}, (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        fastify.log.info(`Server running on ${address}`);
    });
}

main()
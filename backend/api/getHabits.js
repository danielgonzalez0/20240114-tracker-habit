import path from "path";
import fs from "fs/promises";

const userPath = path.join(process.cwd(), "data/database.json");

export async function getHabits(fastify) {
  // GET /habits
  fastify.get('/habits', async (request, reply) => {
    try {
      const habits = JSON.parse(await fs.readFile(userPath));
      reply.code(200).send(habits);
    } catch (error) {
      reply.code(500).send({ error: 'Server error' });
    }
  })
}
import path from "path";
import fs from "fs/promises";

const userPath = path.join(process.cwd(), "data/database.json");

export async function getTodayHabits(fastify) {
  // GET /habits/today
  fastify.get('/habits/today', async (request, reply) => {
    try {
      const habits = JSON.parse(await fs.readFile(userPath));
      // Add your logic to get habits for today
      reply.code(200).send(habits);
    } catch (error) {
      reply.code(500).send({ error: 'Server error' });
    }
  });
}
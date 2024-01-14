import path from "path";
import fs from "fs/promises";

const userPath = path.join(process.cwd(), "data/database.json");

export async function patchTodayHabit(fastify) {
  // PATCH /habits/:id
  fastify.patch('/habits/:id', async (request, reply) => {
    try {
      const habits = JSON.parse(await fs.readFile(userPath));
      // Add your logic to toggle a habit

      // Save the updated habits
      await fs.writeFile(userPath, JSON.stringify(habits));
      reply.code(200).send(habits);
    } catch (error) {
      reply.code(500).send({ error: 'Server error' });
    }
  })
}
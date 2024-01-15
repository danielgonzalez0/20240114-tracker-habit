import { addHabit, getHabits, getTodayHabits, updateHabit } from "../habits.helper.js";

export async function routes(fastify) {

  // GET /habits
  fastify.get('/', async (request, reply) => {
    try {
      const habits = await getHabits();
      reply.code(200).send(habits);
    } catch (error) {
      reply.code(500).send({ error: 'Server error' });
    }
  })

  // POST /habits
  fastify.post('/', async (request, reply) => {
    try {
      if (request.body.title === undefined || !request.body.title || !request.body || typeof request.body.title !== 'string') {
        reply.code(400).send({ error: 'Title is required' });
        return;
      }
      await addHabit(request.body.title);
      // Save the updated habits
      reply.code(200).send('new habit added successfully');
    } catch (error) {
      reply.code(500).send({ error: 'Server error' });
    }
  })

  // PATCH /habits/:id
  fastify.patch('/:id', async (request, reply) => {
    try {

      if (request.body === undefined || request.body === null  || typeof request.body.done !== 'boolean') {
        reply.code(400).send({ error: 'habit status is required' });
        return;
      }

      try {
        await updateHabit(request.params.id, request.body.done);
      } catch(error) {
        reply.code(404).send({ error: `${error.message}` });
        return;
      }
      reply.code(200).send('habit updated successfully');
    } catch (error) {
      reply.code(500).send({error: 'Server error'});
    }
  })

  // GET /habits/today
  fastify.get('/today', async (request, reply) => {
    try {
      // Add your logic to get habits for today
      const habits = await getTodayHabits();
      reply.code(200).send(habits);
    } catch (error) {
      reply.code(500).send({ error: 'Server error' });
    }
  });

}
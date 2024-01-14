import cors from '@fastify/cors';
import Fastify from 'fastify';
import {getHabits} from './api/getHabits.js';
import {getTodayHabits} from './api/getTodayHabits.js';
import {createNewHabit} from './api/createNewHabit.js';
import {patchTodayHabit} from './api/patchTodayHabit.js';

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});

fastify.register(getHabits);
fastify.register(getTodayHabits);
fastify.register(createNewHabit);
fastify.register(patchTodayHabit);

// Run the server!

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

import cors from '@fastify/cors';
import Fastify from 'fastify';
import  {routes} from './routes/routes.js';


const fastify = Fastify({
  logger: true,
});



fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});

fastify.register(routes, { prefix: '/habits' });

// Run the server!

 const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

export {fastify, start};
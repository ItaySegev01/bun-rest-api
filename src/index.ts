import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import personRoutes from './routes/pepole';

const app = new Elysia();

app
  .use(swagger())
  .group('/api', (app) => app.use(personRoutes))
  .listen(process.env.PORT || 5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

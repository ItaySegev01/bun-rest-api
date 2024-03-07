import { Elysia, t } from 'elysia';
import {
  getPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
} from './handlers';

const personRoutes = new Elysia({ prefix: '/people' })
  .get('/', () => getPeople())
  .get('/:id', ({ params: { id } }) => getPersonById(id), {
    params: t.Object({ id: t.Numeric() }),
  })
  .post('/', ({ body }) => createPerson(body), {
    body: t.Object({
      name: t.String({
        minLength: 1,
        maxLength: 255,
      }),
      age: t.Numeric({
        min: 0,
      }),
    }),
  })
  .patch('/:id', ({ params: { id }, body }) => updatePerson(id, body), {
    params: t.Object({ id: t.Numeric() }),
    body: t.Object(
      {
        name: t.Optional(
          t.String({
            minLength: 1,
            maxLength: 255,
          })
        ),
        age: t.Optional(t.Numeric({ min: 0 })),
      },
      {
        minProperties: 1,
      }
    ),
  })
  .delete('/', ({ body }) => deletePerson(body), {
    body: t.Object({
      id: t.Numeric(),
    }),
  });

export default personRoutes;

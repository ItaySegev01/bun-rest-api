import { NotFoundError } from 'elysia';
import db from '../../db';

export const getPeople = async () => {
  try {
    return await db.person.findMany({ orderBy: { createdAt: 'asc' } });
  } catch (e: unknown) {
    console.log(`Error getting people : ${e}`);
  }
};

export const getPersonById = async (id: number) => {
  try {
    const person = await db.person.findUnique({ where: { id } });
    if (!person) {
      throw new NotFoundError('Person not found');
    }
    return person;
  } catch (e: unknown) {
    console.log(`Error getting person : ${e}`);
  }
};

export const createPerson = async (options: { name: string; age: number }) => {
  try {
    const { name, age } = options;
    return await db.person.create({ data: { name, age } });
  } catch (e: unknown) {
    console.log(`Error creating person : ${e}`);
  }
};

export const updatePerson = async (
  id: number,
  options: { name?: string; age?: number }
) => {
  try {
    const { name, age } = options;
    const person = await db.person.update({
      where: { id },
      data: { ...(name ? { name } : {}), ...(age ? { age } : {}) },
    });
    if (!person) {
      throw new NotFoundError('Person not found');
    }
    return person;
  } catch (e: unknown) {
    console.log(`Error updating person : ${e}`);
  }
};

export const deletePerson = async (options: { id: number }) => {
  try {
    const { id } = options;
    return await db.person.delete({ where: { id } });
  } catch (e: unknown) {
    console.log(`Error deleting person : ${e}`);
  }
};

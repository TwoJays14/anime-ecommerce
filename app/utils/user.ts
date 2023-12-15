import credentialsUser from '../models/credentialsUser';
import { connectToDatabase } from './database';

export async function findUserById(id: number | string) {
  await connectToDatabase();
  const user = await credentialsUser.findById(id);
  return user;
}

export async function findUserByUsername(username: string | undefined) {
  await connectToDatabase();
  const user = await credentialsUser.findOne({ username });
  return user;
}

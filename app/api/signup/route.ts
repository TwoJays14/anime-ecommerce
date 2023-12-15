import { connectToDatabase } from '@/app/utils/database';
import credentialsUser from '@/app/models/credentialsUser';
import { NextApiRequest, NextApiResponse } from 'next';

interface ExtendedNextApiRequest extends NextApiRequest {
  json: () => Promise<any>;
}

export async function POST(req: ExtendedNextApiRequest, res: NextApiResponse) {
  // Ensure this handler only responds to POST requests

  try {
    const body = (await req.json()) as { username: string; password: string };

    const { username, password } = body;

    await connectToDatabase();
    const newUser = await credentialsUser.create({ username, password });

    return Response.json(newUser);
  } catch (err) {
    console.error(err);
    return Response.json({ err });
  }
}

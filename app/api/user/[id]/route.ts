import credentialsUser from '@/app/models/credentialsUser';
import { connectToDatabase } from '@/app/utils/database';
import { findUserById } from '@/app/utils/user';
import { NextApiRequest, NextApiResponse } from 'next';

type ParamsType = {
  params: { id: number };
};

export const GET = async (req: NextApiRequest, { params }: ParamsType) => {
  try {
    await connectToDatabase();

    const user = await findUserById(params.id);

    if (!user) {
      return Response.json({ err: 'User not found' });
    }

    return Response.json(user);
  } catch (err) {
    console.error(err);
    return Response.json({ err });
  }
};

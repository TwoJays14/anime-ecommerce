import User from '@/app/models/user';
import { connectToDatabase } from '@/app/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthOptions, NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { options } from './options';


const handler = NextAuth(options);

export { handler as GET, handler as POST };


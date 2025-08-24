import NextAuth from 'next-auth'
import { authOption } from '@lib/auth';

const handler=NextAuth(authOption)

export const GET=handler;
export const POST=handler;
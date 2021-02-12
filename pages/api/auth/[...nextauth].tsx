import NextAuth from 'next-auth';
import { providers } from 'next-auth/client';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next-auth/_utils';

const provider = [
  Providers.Auth0({
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    domain: process.env.AUTH0_DOMAIN,
    // authorizationUrl: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&prompt=consent`,
  }),
];

const options = {
  // Configure one or more authentication providers
  providers: provider,
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  NextAuth(req, res, options);

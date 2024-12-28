import { createClient, OAuthStrategy } from '@wix/sdk';
import { products, collections } from '@wix/stores';
import { cookies } from 'next/headers';
import { members } from '@wix/members';
import { orders } from '@wix/ecom';

export const wixClientServer = async () => {
  let refreshToken;
  try {
    const CockieStore = await cookies();

    refreshToken = JSON.parse(CockieStore.get('refreshToken')?.value || '{}');
  } catch (error) {}

  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
      orders,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: {
          value: '',
          expiresAt: 0,
        },
      },
    }),
  });

  return wixClient;
};

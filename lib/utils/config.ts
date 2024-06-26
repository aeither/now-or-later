import { env } from '@/env';
import { createThirdwebClient, defineChain, getContract } from 'thirdweb';

export const thirdwebClient = createThirdwebClient({
  clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export const leaderboardAddress = '0xB5c2E15d54FB6ACC53e8269eB53f34D00F221101';
export const tokenAddress = '0x5259123c149ae1FcDC5C2741aa05C25e8d8a8812';

export const lineaGoerli = defineChain({
  id: 59140,
  rpc: 'https://rpc.goerli.linea.build',
});

export const leaderboardContract = getContract({
  client: thirdwebClient,
  address: leaderboardAddress,
  chain: lineaGoerli,
});

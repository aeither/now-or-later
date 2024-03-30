import { ActionBody } from '@/app/api/qstash/route';
import { defineChain } from 'thirdweb/chains';
import { deployERC20Contract } from 'thirdweb/deploys';
import { privateKeyAccount } from 'thirdweb/wallets';
import { thirdwebClient } from '../utils/config';

export const deployToken = async (actionBody: ActionBody) => {
  const account = privateKeyAccount({
    client: thirdwebClient,
    privateKey: actionBody.privateKey,
  });

  const neonChain = defineChain({
    id: 245022926,
    nativeCurrency: {
      name: 'Neon',
      symbol: 'NEON',
      decimals: 18,
    },
  });

  const chainAstarZKyoto = defineChain({
    id: 6038361,
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  });

  const contractAddress = await deployERC20Contract({
    chain: chainAstarZKyoto,
    client: thirdwebClient,
    account,
    type: 'TokenERC20',
    params: {
      name: 'Nola',
      description: 'Nola Token',
      symbol: 'NOL',
    },
  });
  console.log('🚀 ~ main ~ contractAddress:', contractAddress);
};

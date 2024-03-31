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
  //   actionBody.chain = "neon" or "astar"
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

  let chain;
  if (actionBody.chain === 'neon') {
    chain = neonChain;
  } else if (actionBody.chain === 'astar') {
    chain = chainAstarZKyoto;
  } else {
    chain = neonChain;
  }

  console.log('start deployERC20Contract...');
  try {
    const contractAddress = await deployERC20Contract({
      chain: chain,
      client: thirdwebClient,
      account,
      type: 'TokenERC20',
      params: {
        name: actionBody.title || 'NoLa Coin',
        description: 'NoLA Token2',
        symbol: 'NOLA',
      },
    });
    console.log('🚀 ~ main ~ contractAddress:', contractAddress);
    return contractAddress;
  } catch (error) {
    console.error(error);
  }
};

// import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import dotenv from 'dotenv';
dotenv.config();
import { deployERC20Contract } from 'thirdweb/deploys';
import { defineChain } from 'thirdweb/chains';
import { createThirdwebClient } from 'thirdweb';
import { privateKeyAccount } from 'thirdweb/wallets';

// if (!process.env.PRIVATE_KEY) throw new Error('PRIVATE_KEY not found');
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!process.env.PRIVATE_KEY) throw new Error('PRIVATE_KEY not found');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// public key 0x005522D1AEF1e6922c9bcc82a5970340B604Fe0e

const client = createThirdwebClient({
  clientId: '0cb4582cffcdb88f3751be318602d74b',
});

const wallet = privateKeyAccount({
  client,
  privateKey: PRIVATE_KEY,
});

const main = async () => {
  console.log('hello world');

  const chain = defineChain({
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
    client,
    account: wallet,
    type: 'TokenERC20',
    params: {
      name: 'MyToken',
      description: 'My Token contract',
      symbol: 'MT',
    },
  });
  console.log('🚀 ~ main ~ contractAddress:', contractAddress);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

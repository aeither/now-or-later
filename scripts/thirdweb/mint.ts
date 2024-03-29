// import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import dotenv from 'dotenv';
import {
  createThirdwebClient,
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
  toWei,
} from 'thirdweb';
import { defineChain } from 'thirdweb/chains';
import { mintTo } from 'thirdweb/extensions/erc20';
import { privateKeyAccount } from 'thirdweb/wallets';
dotenv.config();

// const tokenContractAddress = '0x6C628141A9E2Be58C3aFC7d0FEf8d213b9D783A2'; // Neon Devnet
const tokenContractAddress = '0x99160B322E92739f03050cA8BAa32Df658C9e423'; // Astar zKyoto

// if (!process.env.PRIVATE_KEY) throw new Error('PRIVATE_KEY not found');
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY =
  '02cf9f434c215010d92eee4bfa6b4c7d81722e468dcd353ed37ebbe37fcd959b';
// public key 0x005522D1AEF1e6922c9bcc82a5970340B604Fe0e

const client = createThirdwebClient({
  clientId: '0cb4582cffcdb88f3751be318602d74b',
});

const account = privateKeyAccount({
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

  // get a contract
  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    chain: chainAstarZKyoto,
    // the contract's address
    address: tokenContractAddress,
    // OPTIONAL: the contract's abi
  });

  console.log('start minting...');
  //   const tx = mintTo({
  //     contract,
  //     to: account.address,
  //     amount: 100,
  //   });
  const tx = prepareContractCall({
    contract,
    // pass the method signature that you want to call
    method: 'function mintTo(address to, uint256 amount)',
    // and the params for that method
    // their types are automatically inferred based on the method signature
    params: [account.address, toWei('100')],
  });

  console.log('start sending...');
  const receipt = await sendAndConfirmTransaction({
    transaction: tx,
    account: account,
  });

  console.log(
    '🚀 ~ main ~ contractAddress:',
    `https://astar-zkyoto.blockscout.com/tx/${receipt.transactionHash}`
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

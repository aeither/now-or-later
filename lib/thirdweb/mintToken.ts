import { ActionBody } from '@/app/api/qstash/route';
import {
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
  toWei,
} from 'thirdweb';
import { defineChain } from 'thirdweb/chains';
import { privateKeyAccount } from 'thirdweb/wallets';
import { thirdwebClient } from '../utils/config';

export const mintToken = async (actionBody: ActionBody) => {
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

  // const chain =

  const contract = getContract({
    client: thirdwebClient,
    chain: chainAstarZKyoto,
    address: actionBody.address,
    // OPTIONAL: the contract's abi
  });

  console.log('start minting...');

  const tx = prepareContractCall({
    contract,
    method: 'function mintTo(address to, uint256 amount)',
    params: [account.address, toWei(actionBody.amount.toString())],
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

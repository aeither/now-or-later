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
import { sendMessageToTelegram } from '../utils/telegram';

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

  let chain;
  if (actionBody.chain === 'neon') {
    chain = neonChain;
  } else if (actionBody.chain === 'astar') {
    chain = chainAstarZKyoto;
  } else {
    chain = neonChain;
  }

  const contract = getContract({
    client: thirdwebClient,
    chain: chain,
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

  if (actionBody.chain === 'neon') {
    sendMessageToTelegram(
      `https://devnet.neonscan.org/tx/${receipt.transactionHash}`
    );
    console.log(
      '🚀 ~ main ~ contractAddress:',
      `https://devnet.neonscan.org/tx/${receipt.transactionHash}`
    );
  } else {
    sendMessageToTelegram(
      `https://astar-zkyoto.blockscout.com/tx/${receipt.transactionHash}`
    );
    console.log(
      '🚀 ~ main ~ contractAddress:',
      `https://astar-zkyoto.blockscout.com/tx/${receipt.transactionHash}`
    );
  }
};

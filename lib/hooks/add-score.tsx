import {
  leaderboardAddress,
  leaderboardContract,
  lineaGoerli,
  thirdwebClient,
} from '@/lib/utils/config';
import { prepareContractCall, toWei } from 'thirdweb';
import { getContract } from 'thirdweb/contract';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';

export function useLeaderboard() {
  const activeAccount = useActiveAccount();
  const { mutate: sendTx, data, isSuccess } = useSendTransaction();

  const contract = getContract({
    client: thirdwebClient,
    address: leaderboardAddress,
    chain: lineaGoerli,
  });

  const callAddScore = async () => {
    const tx = prepareContractCall({
      contract: leaderboardContract,
      // pass the method signature that you want to call
      method: 'function addScore(address user, uint256 score)',
      // and the params for that method
      // their types are automatically inferred based on the method signature
      params: [activeAccount ? activeAccount.address : '', toWei('100')],
    });

    await sendTx(tx);
  };

  return { data, isSuccess, callAddScore };
}

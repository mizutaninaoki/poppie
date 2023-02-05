import { useContext, useCallback } from 'react';
import { gql } from '@apollo/client';
import { CurrentAccountFragment } from '@/generated/graphql';
import { AuthContext } from '@/providers/AuthProvider';

gql`
  fragment CurrentAccount on AccountType {
    id
    givablePoint
    receivedPoint
  }
`;

type ReturnType = {
  account?: CurrentAccountFragment | null;
  updateAccountGivablePoint: (givablePoint: number) => void;
  updateAccountReceivedPoint: (receivedPoint: number) => void;
};

export const useAccount = (): ReturnType => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const account = currentUser.account;


  const updateAccountGivablePoint = useCallback(
    (givablePoint: number): void => {
      if (!currentUser.account) return;
      const newAccount = currentUser.account;
      newAccount.givablePoint = givablePoint;
      setCurrentUser({ ...currentUser, account: newAccount });
    },
    [account],
  );


  const updateAccountReceivedPoint = useCallback(
    (receivedPoint: number): void => {
      if (!currentUser.account) return;
      const newAccount = currentUser.account;
      newAccount.receivedPoint = receivedPoint;
      setCurrentUser({ ...currentUser, account: newAccount });
    },
    [account],
  );

  return { account, updateAccountGivablePoint, updateAccountReceivedPoint };
};

import { useContext, useCallback } from 'react';
import { gql } from '@apollo/client';

import { CurrentCompanyFragment } from '@/generated/graphql';
import { AuthContext } from '@/providers/AuthProvider';

gql`
  fragment CurrentCompany on CompanyType {
    id
    name
    point
  }
`;

type ReturnType = {
  company: CurrentCompanyFragment;
  updateCompanyPoint: (companyPoint: number) => void;
};

export const useCompany = (): ReturnType => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const company = currentUser.company;

  const updateCompanyPoint = useCallback(
    (companyPoint: number): void => {
      const newCompany = currentUser.company;
      newCompany.point = companyPoint;
      setCurrentUser({ ...currentUser, company: newCompany });
    },
    [company],
  );

  return { company, updateCompanyPoint };
};

import { FC } from 'react';
import { gql } from '@apollo/client';
import { CompanyUsersListDataFragment } from '@/generated/graphql';

gql`
  fragment CompanyUsersListData on CustomUserType {
    id
    name
    email
    account {
      givablePoint
      receivedPoint
    }
  }
`;

type Props = {
  users: CompanyUsersListDataFragment[];
};

export const CompanyUsersCardList: FC<Props> = ({ users }) => {
  if (users.length === 0) {
    return <h2>登録されているユーザーはいません</h2>;
  }

  return (
    <>
      {users.map((user) => {
        return (
          <div className="m-2">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body p-6">
                <p>
                  {user.name} : {user.email}
                </p>
                <p className="mb-0">授与可能ポイント: {user.account.givablePoint}</p>
                <p className="mb-0">交換可能ポイント: {user.account.receivedPoint}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

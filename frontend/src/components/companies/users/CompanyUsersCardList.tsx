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
      <div className="grid grid-cols-3 gap-12 mb-8">
        {users.map((user) => {
          return (
            <div className="m-2 mx-auto" key={user.id}>
              <div className="card w-96 bg-gray-100 shadow-md">
                <div className="card-body p-6">
                  <p>
                    <span className="font-bold">{user.name}</span>&nbsp;:&nbsp;
                    {user.email}
                  </p>
                  <p className="mb-0">
                    <span className="font-bold">授与可能ポイント</span>&nbsp;:&nbsp;
                    {user.account.givablePoint}
                  </p>
                  <p className="mb-0">
                    <span className="font-bold">交換可能ポイント</span>&nbsp;:&nbsp;
                    {user.account.receivedPoint}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

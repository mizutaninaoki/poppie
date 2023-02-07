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
    profile {
      id
      department
      comment
      imageUrl
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
      <div className="grid mb-8 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-12">
        {users.map((user) => {
          return (
            <div className="m-2 mx-auto w-full" key={user.id}>
              <div className="card bg-gray-100 shadow-md pt-6 h-full w-full">
                <div className="mx-auto w-7/12 h-full">
                  <img
                    src={user.profile.imageUrl || '/images/blank-profile-picture.png'}
                    alt="profile-image"
                    className="rounded-full w-full h-full aspect-square"
                  />
                </div>
                <div className="card-body p-6">
                  <p className="font-bold">
                    {user.name} : {user.email}
                  </p>
                  <p className="mb-0 font-bold">
                    授与可能ポイント : {user.account.givablePoint} P
                  </p>
                  <p className="mb-0 font-bold">
                    交換可能ポイント : {user.account.receivedPoint} P
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

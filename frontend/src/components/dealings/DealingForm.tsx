import { FC, useState, useContext, useMemo } from 'react';
import { gql } from '@apollo/client';
import { CompanyUserForDealingFormFragment } from '@/generated/graphql';
import { DealingFormDataZodSchema } from '@/validations/validateDealing';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { AuthContext } from '@/providers/AuthProvider';

gql`
  fragment CompanyUserForDealingForm on CustomUserType {
    id
    name
    profile {
      department
    }
  }
`;

export type DealingFormDataType = {
  userId: string;
  name: string;
  amount: number;
  message: string;
};

type Props = {
  users: CompanyUserForDealingFormFragment[];
  onSubmit: (data: DealingFormDataType) => void;
};

export const DealingForm: FC<Props> = ({ onSubmit: onSubmitFn, users }) => {
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState<DealingFormDataType>({
    userId: '',
    name: '',
    amount: 0,
    message: '',
  });

  const { errors, setErrors, resetErrors } = useValidationErrors();

  // ポイントを贈ることができるユーザーは同じ会社の自分以外のユーザー
  const selectableUsers: CompanyUserType[] = useMemo(() => {
    return users.filter((user) => user.id !== currentUser.id);
  }, []);

  const onSubmit = () => {
    resetErrors();
    const result = DealingFormDataZodSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    onSubmitFn(formData);
  };

  if (!selectableUsers) {
    return <p>ポイントを贈るユーザーがいません</p>;
  }

  return (
    <>
      <div className="shadow-md p-12 bg-green-50 rounded-xl form-box">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="user-select-box"
          >
            ポイントを贈るユーザー
          </label>
          <select
            className="select w-full max-w-xs"
            id="user-select-box"
            value={formData.userId}
            onChange={(e) => {
              setFormData({
                ...formData,
                userId: e.target.value,
                name: selectableUsers.find((user) => user.id === e.target.value).name,
              });
            }}
            data-cy="userName"
          >
            <option value="">選択してください</option>
            {selectableUsers.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {errors?.userId && (
            <p className="text-red-600 text-xs">{errors?.userId.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="user-select-box"
          >
            贈るポイント数
          </label>
          <input
            type="text"
            placeholder="100"
            className="input w-full max-w-xs"
            value={formData.amount}
            onChange={(e) => {
              const amount = Number(e.target.value);
              // 数値として不正な入力が来たら何もしない
              if (Number.isNaN(amount)) return;
              setFormData({ ...formData, amount });
            }}
            data-cy="givePoint"
          />
          {errors?.amount && (
            <p className="text-red-600 text-xs">{errors?.amount.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="user-select-box">
            コメント
          </label>
          <textarea
            className="textarea w-full"
            placeholder="〇〇を手伝ってくれてありがとう"
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
            }}
            data-cy="comment"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-lg"
            type="button"
            onClick={onSubmit}
          >
            確認する
          </button>
        </div>
      </div>
    </>
  );
};

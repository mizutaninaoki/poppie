import { FC, useState, useMemo } from 'react';
import { gql } from '@apollo/client';
import { DistributeFormDataZodSchema } from '@/validations/validateDistribute';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { DistributeFormDataFragment } from '@/generated/graphql';
import { PoppieDialog, PoppieDialogData } from '@/components/common/PoppieDialog';

gql`
  fragment DistributeFormData on AccountType {
    id
    givablePoint
    receivedPoint
    user {
      name
      email
    }
  }
`;

export type DistributeFormDataType = {
  accountId: string;
  distributePoint: number;
}[];

type Props = {
  accounts: DistributeFormDataFragment[];
  onSubmit: (data: DistributeFormDataType) => void;
};

export const DistributeForm: FC<Props> = ({ onSubmit: onSubmitFn, accounts }) => {
  const { errors, setErrors, resetErrors } = useValidationErrors();

  const initialFormData = accounts.map((account) => {
    return { accountId: account.id, distributePoint: 0 };
  });

  const [formDatas, setFormDatas] = useState<DistributeFormDataType>(initialFormData);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const onSubmit = () => {
    resetErrors();
    const result = DistributeFormDataZodSchema.safeParse(formDatas);
    if (!result.success) {
      setErrors(result.error.format());
      setDialogOpen(false);
      return;
    }

    onSubmitFn(formDatas);
  };

  const dialogData: PoppieDialogData = {
    open: dialogOpen,
    onClose: () => setDialogOpen(false),
    text: {
      title: '本当にポイントを配布してよろしいですか？',
      content: `配布後、配布したポイントを元に戻すことはできません`,
    },
    leftButton: {
      label: '戻る',
      onClick: () => setDialogOpen(false),
    },
    rightButton: {
      label: '配布する',
      onClick: () => onSubmit(),
    },
  };

  return (
    <>
      <PoppieDialog {...dialogData} />
      <div className="grid grid-cols-3 gap-12 mb-8">
        {accounts.map((account, i) => {
          return (
            <div className="m-2" key={account.id}>
              <div className="card w-full h-full bg-gray-100 shadow-md pb-8 pt-2">
                <div className="card-body py-6 px-12">
                  <p className="font-bold">
                    {account.user.name} :&nbsp;
                    <span className="font-medium">{account.user.email}</span>
                  </p>
                  <p className="mb-0 font-bold">
                    授与可能ポイント:&nbsp;
                    <span className="font-medium">{account.givablePoint}</span>
                  </p>
                  <p className="mb-0 font-bold">
                    交換可能ポイント:&nbsp;
                    <span className="font-medium">{account.receivedPoint}</span>
                  </p>
                </div>
                <div className="card-actions justify-center">
                  <input
                    type="text"
                    placeholder="0"
                    className="input w-full max-w-xs"
                    value={formDatas[i].distributePoint}
                    onChange={(e) => {
                      const distributePoint = Number(e.target.value);
                      // 数値として不正な入力が来たら何もしない
                      if (Number.isNaN(distributePoint)) return;
                      const newFormDatas = [...formDatas];
                      newFormDatas[i] = {
                        accountId: account.id,
                        distributePoint: distributePoint,
                      };
                      setFormDatas(newFormDatas);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        {errors?.distributePoint && (
          <p className="text-red-600 text-xs mb-1">{errors?.distributePoint.message}</p>
        )}
        <button
          className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-lg"
          type="button"
          onClick={() => setDialogOpen(true)}
        >
          ポイントを配布する
        </button>
      </div>
    </>
  );
};

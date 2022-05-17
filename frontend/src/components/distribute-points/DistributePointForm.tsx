import { FC, useState, useMemo } from 'react';
import { gql } from '@apollo/client';
import { DistributePointFormDataZodSchema } from '@/validations/validateDistributePoint';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { DistributePointFormDataFragment } from '@/generated/graphql';
import { PoppieDialog, PoppieDialogData } from '@/components/common/PoppieDialog';

gql`
  fragment DistributePointFormData on AccountType {
    id
    givablePoint
    receivedPoint
    user {
      name
      email
    }
  }
`;

// TODO: ポイント配布できるようにする！

export type DistributePointFormDataType = { accountId: string }[];

type Props = {
  accounts: DistributePointFormDataFragment[];
  onSubmit: (data: DistributePointFormDataType) => void;
};

export const DistributePointForm: FC<Props> = ({ onSubmit: onSubmitFn, accounts }) => {
  const { errors, setErrors, resetErrors } = useValidationErrors();

  const [formData, setFormData] = useState<DistributePointFormDataType>([
    {
      accountId: '',
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const onSubmit = () => {
    resetErrors();
    const result = DistributePointFormDataZodSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      setDialogOpen(false);
      return;
    }

    onSubmitFn(formData);
  };

  const dialogData: PoppieDialogData = {
    open: dialogOpen,
    onClose: () => setDialogOpen(false),
    text: {
      title: '本当にポイントを配布してよろしいですか？',
      content: `配布後、配布したポイントを元に戻すことはできません`,
    },
    leftButton: {
      label: '閉じる',
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
      {accounts.map((account) => {
        return (
          <div className="m-2">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body p-6">
                <p>
                  {account.user.name} : {account.user.email}
                </p>
                <p className="mb-0">授与可能ポイント: {account.givablePoint}</p>
                <p className="mb-0">交換可能ポイント: {account.receivedPoint}</p>
              </div>
            </div>
          </div>
        );
      })}
      <button
        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={() => setDialogOpen(true)}
      >
        保存する
      </button>
    </>
  );
};

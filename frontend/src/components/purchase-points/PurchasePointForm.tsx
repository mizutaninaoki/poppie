import { FC, useState, useMemo } from 'react';
import { PurchasePointFormDataZodSchema } from '@/validations/validatePurchasePoint';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { PoppieDialog, PoppieDialogData } from '@/components/common/PoppieDialog';

export type PurchasePointFormDataType = {
  thouPoint: number;
  tenThouPoint: number;
  hundredThouPoint: number;
};

type Props = {
  onSubmit: (totalPoint: number, totalPrice: number) => void;
};

// 倍率(基本的には1ポイント === 1円)
const MAGNIFICATION = 1;

export const PurchasePointForm: FC<Props> = ({ onSubmit: onSubmitFn, profile }) => {
  const { errors, setErrors, resetErrors } = useValidationErrors();

  const [formData, setFormData] = useState<PurchasePointFormDataType>({
    thouPoint: 0,
    tenThouPoint: 0,
    hundredThouPoint: 0,
  });
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const totalPoint = useMemo(() => {
    return formData.thouPoint + formData.tenThouPoint + formData.hundredThouPoint;
  }, [formData]);

  const totalPrice = useMemo(() => {
    return totalPoint * MAGNIFICATION;
  }, [totalPoint]);

  const onSubmit = () => {
    resetErrors();
    const result = PurchasePointFormDataZodSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      setDialogOpen(false);
      return;
    }

    onSubmitFn(totalPoint, totalPrice);
  };

  const dialogData: PoppieDialogData = {
    open: dialogOpen,
    onClose: () => setDialogOpen(false),
    text: {
      title: '本当に購入してよろしいですか？',
      content: `購入合計ポイント${totalPoint}ポイント\n購入合計金額${totalPrice}円\n購入すると返金できません。`,
    },
    leftButton: {
      label: '閉じる',
      onClick: () => setDialogOpen(false),
    },
    rightButton: {
      label: '購入する',
      onClick: () => onSubmit(),
    },
  };

  return (
    <>
      <PoppieDialog {...dialogData} />
      <div className="grid grid-cols-3">
        <div>
          <div className="mx-auto">
            <div className="shadow-md">
              <figure className="px-10 pt-10">
                <img
                  src="https://api.lorem.space/image/shoes?w=400&h=225"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ポイント購入</h2>
                <p>1,000円</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-full">
                <input
                  type="number"
                  min="0"
                  max="9"
                  placeholder="0"
                  className="input input-bordered w-full max-w-xs mr-2"
                  onChange={(e) => {
                    const point = Number(e.target.value);
                    setFormData({ ...formData, thouPoint: 1000 * point });
                  }}
                />
                個
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mx-auto">
            <div className="shadow-md">
              <figure className="px-10 pt-10">
                <img
                  src="https://api.lorem.space/image/shoes?w=400&h=225"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ポイント購入</h2>
                <p>10,000円</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-full">
                <input
                  type="number"
                  min="0"
                  max="9"
                  placeholder="0"
                  className="input input-bordered w-full max-w-xs mr-2"
                  onChange={(e) => {
                    const point = Number(e.target.value);
                    setFormData({ ...formData, tenThouPoint: 10000 * point });
                  }}
                />
                個
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mx-auto">
            <div className="shadow-md">
              <figure className="px-10 pt-10">
                <img
                  src="https://api.lorem.space/image/shoes?w=400&h=225"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ポイント購入</h2>
                <p>10,0000円</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full">
            <input
              type="number"
              min="0"
              max="9"
              placeholder="0"
              className="input input-bordered w-full max-w-xs mr-2"
              onChange={(e) => {
                const point = Number(e.target.value);
                setFormData({ ...formData, hundredThouPoint: 100000 * point });
              }}
            />
            個
          </div>
        </div>
      </div>
      <div>{totalPoint}ポイント</div>
      <div>{totalPrice}円</div>
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

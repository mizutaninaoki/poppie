import { FC, useState, useMemo } from 'react';
import { PurchasePointFormDataZodSchema } from '@/validations/validatePurchasePoint';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { PoppieDialog, PoppieDialogData } from '@/components/common/PoppieDialog';
import { PageLoading } from '@/components/PageLoading';

export type PurchasePointFormDataType = {
  thouPoint: number;
  tenThouPoint: number;
  hundredThouPoint: number;
};

type Props = {
  createLoading: boolean;
  onSubmit: (totalPoint: number, totalPrice: number) => void;
};

// 倍率(基本的には1ポイント === 1円)
const MAGNIFICATION = 1;

export const PurchasePointForm: FC<Props> = ({ onSubmit: onSubmitFn, createLoading }) => {
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
      label: '戻る',
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
      <div className="grid mb-8 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-12">
        <div className="mx-auto w-full bg-green-50 p-8 rounded-lg">
          <div className="rounded-lg bg-white">
            <div className="p-6 text-center">
              <h2 className="font-bold text-sm md:text-md lg:text-lg xl:text-xl">
                ポイント購入
              </h2>
              <p className="font-bold text-sm md:text-md lg:text-lg xl:text-xl">
                1,000円
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="my-8">
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
            <div className="w-full text-center">
              <input
                type="number"
                min="0"
                max="9"
                placeholder="0"
                className="input w-1/2 mr-2 inline"
                onChange={(e) => {
                  const point = Number(e.target.value);
                  setFormData({ ...formData, thouPoint: 1000 * point });
                }}
              />
              <span className="font-bold">個</span>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full bg-green-50 p-8 rounded-lg">
          <div className="rounded-lg bg-white">
            <div className="p-6 text-center">
              <h2 className="font-bold text-sm md:text-md lg:text-lg xl:text-xl">
                ポイント購入
              </h2>
              <p className="font-bold text-sm md:text-md lg:text-lg xl:text-xl">
                10,000円
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="my-8">
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
            <div className="w-full text-center">
              <input
                type="number"
                min="0"
                max="9"
                placeholder="0"
                className="input w-1/2 mr-2 inline"
                onChange={(e) => {
                  const point = Number(e.target.value);
                  setFormData({ ...formData, tenThouPoint: 10000 * point });
                }}
              />
              <span className="font-bold">個</span>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full bg-green-50 p-8 rounded-lg">
          <div className="rounded-lg bg-white">
            <div className="p-6 text-center">
              <h2 className="font-bold text-sm md:text-md lg:text-lg xl:text-xl">
                ポイント購入
              </h2>
              <p className="font-bold text-sm md:text-md lg:text-lg xl:text-xl">
                100,000円
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="my-8">
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
          <div className="w-full text-center">
            <input
              type="number"
              min="0"
              max="9"
              placeholder="0"
              className="input w-1/2 mr-2 inline"
              onChange={(e) => {
                const point = Number(e.target.value);
                setFormData({ ...formData, hundredThouPoint: 100000 * point });
              }}
            />
            <span className="font-bold">個</span>
          </div>
        </div>
      </div>
      <div className="grid place-items-center mt-10">
        <div className="shadow-md p-8 rounded-lg form-box bg-gray-50">
          <div className="w-full font-bold">
            <div className="flex items-center mb-6">
              <div className="w-1/3">
                <label className="block mb-0 pr-4" htmlFor="inline-full-name">
                  購入ポイント
                </label>
              </div>
              <div className="w-2/3">{totalPoint} P</div>
            </div>

            <div className="w-full max-w-sm">
              <div className="flex items-center mb-6">
                <div className="w-1/3">
                  <label className="block mb-0 pr-4" htmlFor="inline-full-name">
                    購入金額
                  </label>
                </div>
                <div className="w-2/3">{totalPrice} 円</div>
              </div>
            </div>

            <div className="mx-auto text-center">
              {createLoading && <PageLoading />}
              <button
                className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-lg"
                type="button"
                onClick={() => setDialogOpen(true)}
              >
                購入する
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

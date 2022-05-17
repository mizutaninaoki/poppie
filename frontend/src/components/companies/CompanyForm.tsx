import { FC, useState } from 'react';
import { gql } from '@apollo/client';
import { CompanyFormDataZodSchema } from '@/validations/validateCompany';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { PlanForCompanyFormFragment } from '@/generated/graphql';
// import { PlanCardsRow } from '@/components/plans/PlanCardsRow';

gql`
  fragment PlanForCompanyForm on PlanType {
    id
    name
    fee
  }
`;

export type CompanyFormDataType = {
  planId: string;
  name: string;
  email: string;
  tel: string;
};

type Props = {
  plans: PlanForCompanyFormFragment[];
  // companies: CompanyFormDataType[];
  onSubmit: (data: CompanyFormDataType) => void;
};

export const CompanyForm: FC<Props> = ({ onSubmit: onSubmitFn, plans }) => {
  const [formData, setFormData] = useState<CompanyFormDataType>({
    planId: '',
    name: '',
    email: '',
    tel: '',
  });
  // 選択されたプランのbg-colorを変える
  const [isSelectedPlanId, setIsSelectedPlanId] = useState<string | undefined>(undefined);
  const { errors, setErrors, resetErrors } = useValidationErrors();

  const onSubmit = () => {
    resetErrors();
    const result = CompanyFormDataZodSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    onSubmitFn(formData);
  };

  return (
    <>
      <div className="col-span-12">
        <div className="px-5">
          <div className="grid grid-cols-3">
            {plans.map((plan) => {
              return (
                <div className="mx-auto hover:cursor-pointer" key={plan.id}>
                  <div
                    className={`card w-96 bg-base-100 shadow-xl ${
                      isSelectedPlanId === plan.id ? 'bg-gray-300' : ''
                    }`}
                    onClick={(e) => {
                      setFormData({ ...formData, planId: plan.id });
                      setIsSelectedPlanId(plan.id);
                    }}
                  >
                    <figure className="px-10 pt-10">
                      <img
                        src="https://api.lorem.space/image/shoes?w=400&h=225"
                        alt="Shoes"
                        className="rounded-xl"
                      />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title">{plan.name}</h2>
                      <p>{plan.fee}円</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="col-span-12">
        <div className="shadow-md p-12 rounded-xl">
          {/* 入力部分だけ、daisyUIのtextInputを使用する！ */}
          <div className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  会社名
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="text"
                  placeholder="山田 太郎"
                  className="input w-full max-w-xs bg-gray-200"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  メールアドレス
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="text"
                  placeholder="sample@sample.com"
                  className="input w-full max-w-xs bg-gray-200"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  電話番号
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="text"
                  placeholder="0312345678"
                  className="input w-full max-w-xs bg-gray-200"
                  value={formData.tel}
                  onChange={(e) => {
                    setFormData({ ...formData, tel: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3" />
              <div className="md:w-2/3">
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={onSubmit}
                >
                  登録する
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

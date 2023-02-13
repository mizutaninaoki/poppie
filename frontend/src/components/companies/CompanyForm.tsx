import { FC, useState } from 'react';
import { gql } from '@apollo/client';
import { CompanyFormDataZodSchema } from '@/validations/validateCompany';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { PlanForCompanyFormFragment } from '@/generated/graphql';

import styles from './CompanyForm.module.scss';

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
      <div className="col-span-full">
        <div className="mb-6">
          <p className="font-bold text-center text-xl">
            ご希望のプランを選択してください
          </p>
          <p className="text-center text-red-600">※現在freeプランのみご利用可能です</p>
        </div>
        <div className="grid grid-cols-3 gap-10 gap-y-6 md:gap-8">
          {plans.map((plan) => {
            return (
              <div
                className="col-span-full w-11/12 mb-8 md:mb-auto md:w-auto md:col-span-1 mx-auto hover:cursor-pointer card bg-gray-50 h-full shadow-md"
                key={plan.id}
              >
                {/* <div
                  className={`card w-96 bg-gray-50 h-full shadow-md ${
                    isSelectedPlanId === plan.id ? 'bg-green-100' : ''
                  }`}
                  onClick={(e) => {
                    setFormData({ ...formData, planId: plan.id });
                    setIsSelectedPlanId(plan.id);
                  }}
                > */}

                {/* standardプランとprofessionalプランは今のところ利用不可にしている */}
                <div
                  className={`${isSelectedPlanId === plan.id ? 'bg-green-100' : ''} ${
                    plan.name === 'free' ? '' : 'cursor-not-allowed opacity-60'
                  }`}
                  onClick={(e) => {
                    if (plan.name === 'free') {
                      setFormData({ ...formData, planId: plan.id });
                      setIsSelectedPlanId(plan.id);
                    }
                  }}
                >
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{plan.name}プラン</h2>
                    <p className="font-bold">{plan.fee} 円</p>
                    {plan.name == 'free' && (
                      <div data-cy="freePlan">
                        <ul className="list-disc text-left">
                          <li>1グループにつき最大10人まで登録可能</li>
                          <li>ポイント発行・配布等の基本機能の利用が可能</li>
                        </ul>
                      </div>
                    )}
                    {plan.name == 'standard' && (
                      <div>
                        <ul className="list-disc text-left">
                          <li>1グループにつき最大100人まで登録可能</li>
                        </ul>
                      </div>
                    )}
                    {plan.name == 'professional' && (
                      <div>
                        <ul className="list-disc text-left">
                          <li>1グループにつき最大300人まで登録可能</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {errors?.planId && (
          <p className="text-center mt-4 text-red-600 text-xs">
            {errors?.planId.message}
          </p>
        )}
      </div>

      <div className="col-span-12 mx-auto w-11/12 sm:w-max my-8 md:mb-6">
        <div className="w-full shadow-md p-12 rounded-lg inline-block bg-green-50 sm:mx-4">
          <div>
            <div className="sm:flex sm:items-center mb-6">
              <div className="sm:w-1/3">
                <label
                  className="block font-bold sm:text-right mb-1 sm:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  会社名
                </label>
              </div>
              <div className="sm:w-2/3">
                {errors?.name && (
                  <p className="text-red-600 text-xs mb-1">{errors?.name.message}</p>
                )}
                <input
                  type="text"
                  placeholder="サンプル株式会社"
                  className="input w-full bg-white"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  data-cy="companyName"
                />
              </div>
            </div>
            <div className="sm:flex sm:items-center mb-6">
              <div className="sm:w-1/3">
                <label
                  className="block font-bold md:text-right mb-1 sm:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  メールアドレス
                </label>
              </div>
              <div className="sm:w-2/3">
                {errors?.email && (
                  <p className="text-red-600 text-xs mb-1">{errors?.email.message}</p>
                )}
                <input
                  type="text"
                  placeholder="sample@sample.com"
                  className="input w-full bg-white"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  data-cy="email"
                />
              </div>
            </div>
            <div className="sm:flex sm:items-center mb-8">
              <div className="sm:w-1/3">
                <label
                  className="block font-bold sm:text-right mb-1 sm:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  電話番号
                </label>
              </div>
              <div className="sm:w-2/3">
                {errors?.tel && (
                  <p className="text-red-600 text-xs mb-1">{errors?.tel.message}</p>
                )}
                <input
                  type="text"
                  placeholder="0312345678"
                  className="input w-full bg-white"
                  value={formData.tel}
                  onChange={(e) => {
                    setFormData({ ...formData, tel: e.target.value });
                  }}
                  data-cy="tel"
                />
              </div>
            </div>

            <div className="text-center mx-auto">
              <button
                className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded-lg"
                type="button"
                onClick={onSubmit}
              >
                登録する
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

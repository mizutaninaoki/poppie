import { FC, useState } from 'react';
import { SignUpFormDataZodSchema } from '@/validations/validateSignUp';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { PageLoading } from '@/components/PageLoading';
import _groupby from 'lodash.groupby';

export type SignUpFormDataType = {
  name: string;
  email: string;
  password1: string;
};

type Props = {
  createUserloading: boolean;
  onSubmit: (data: SignUpFormDataType) => void;
};

export const SignUpForm: FC<Props> = ({ createUserloading, onSubmit: onSubmitFn }) => {
  const [formData, setFormData] = useState<SignUpFormDataType>({
    name: '',
    email: '',
    password1: '',
  });

  const { errors, setErrors, resetErrors } = useValidationErrors();

  const onSubmit = () => {
    resetErrors();
    const result = SignUpFormDataZodSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    onSubmitFn(formData);
  };

  return (
    <>
      <div className="w-4/5 mx-auto">
        {errors?.name && (
          <p className="text-red-600 text-xs mb-1">{errors?.name.message}</p>
        )}
        <div className="flex items-center bg-white rounded-lg shadow-sm mb-4">
          <span className="px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-green-600 w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            className="w-full h-12 focus:outline-none rounded-r-lg border-l-2 border-green-50 pl-2"
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            data-cy="name"
          />
        </div>
        {errors?.email && (
          <p className="text-red-600 text-xs mb-1">{errors?.email.message}</p>
        )}
        <div className="flex items-center bg-white rounded shadow-sm mb-4">
          <span className="px-3">
            <svg
              className="fill-current text-green-600 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z" />
            </svg>
          </span>
          <input
            className="w-full h-12 focus:outline-none rounded-r-lg border-l-2 border-green-50 pl-2"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            data-cy="email"
          />
        </div>
        <p className="text-xs">※パスワードは8文字以上の英数字</p>
        {errors?.password1 && (
          <p className="text-red-600 text-xs mb-1">{errors?.password1.message}</p>
        )}
        <div className="flex items-center bg-white rounded-lg shadow-sm mb-4">
          <span className="px-3">
            <svg
              className="fill-current text-green-600 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0h-3v2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
          </span>
          <input
            className="w-full h-12 focus:outline-none bg-white rounded-r-lg border-l-2 border-green-50 pl-2"
            type="password"
            name="password1"
            placeholder="Password"
            value={formData.password1}
            onChange={(e) =>
              setFormData({
                ...formData,
                password1: e.target.value,
              })
            }
            data-cy="password"
          />
        </div>
        {createUserloading ? (
          <PageLoading />
        ) : (
          <button
            className="bg-green-600 hover:opacity-50 block mx-auto text-white font-bold text-sm uppercase rounded-lg px-8 py-2 mt-8"
            onClick={onSubmit}
          >
            登録
          </button>
        )}
        <p className="text-center mt-2 text-xs">
          ※登録後、入力したメールアドレスにメールが飛びます
        </p>
      </div>
    </>
  );
};

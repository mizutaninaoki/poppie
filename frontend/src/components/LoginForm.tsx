import { FC, useState } from 'react';

import { LoginFormDataZodSchema } from '@/validations/validateLogin';
import { useValidationErrors } from '@/hooks/useValidationErrors';

export type LoginFormDataType = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (data: LoginFormDataType) => void;
};

export const LoginForm: FC<Props> = ({ onSubmit: onSubmitFn }) => {
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: '',
    password: '',
  });

  const { errors, setErrors, resetErrors } = useValidationErrors();

  const onSubmit = () => {
    resetErrors();
    const result = LoginFormDataZodSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    onSubmitFn(formData);
  };

  return (
    <>
      <div className="w-4/5 mx-auto">
        {errors?.email && (
          <p className="text-red-600 text-xs mb-1">{errors?.email.message}</p>
        )}
        <div className="flex items-center bg-white rounded-lg shadow-sm mb-6">
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
            className="w-full h-12 pl-3 rounded-r-lg border-l-2 border-green-50 focus:outline-none"
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

        {errors?.password && (
          <p className="text-red-600 text-xs mb-1">{errors?.password.message}</p>
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
            className="w-full h-12 pl-3 rounded-r-lg border-l-2 border-green-50 bg-white focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            data-cy="password"
          />
        </div>

        {/* tokenAuthのローディング中はここに、ボタンを消してloadingのアイコンを表示させるようにする */}
        <button
          type="button"
          className="bg-green-600 block mx-auto text-white rounded-lg font-bold text-sm uppercase shadow-md px-6 py-2 mt-10 hover:cursor-pointer hover:opacity-50"
          onClick={onSubmit}
          data-cy="loginButton"
        >
          ログイン
        </button>
      </div>
    </>
  );
};

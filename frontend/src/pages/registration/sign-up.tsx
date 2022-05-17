// import { FC, useContext, useState, ReactElement } from 'react';
// import { NextPageWithLayout } from '@/pages/_app';
// import { PageContainer } from '@/components/PageContainer';
// import { NormalLayout } from '@/components/layout/NormalLayout';
// import { SignUpForm, SignUpFormDataType } from '@/components/SignUpForm';
// import { gql } from '@apollo/client';
// import {
//   useRegisterMutation,
//   useGetCurrentUserLazyQuery,
//   // RegisterInput,
// } from '@/generated/graphql';
// import { useRouter } from 'next/router';
// import { usePageError } from '@/hooks/usePageError';
// import { AuthContext } from '@/providers/AuthProvider';
// import { setTokensToCookie } from '@/utils/cookie';

// // type CustomRegisterInput = RegisterInput & {
// //   company: string;
// // };

// gql`
//   mutation Register($input: RegisterInput!) {
//     register(input: $input) {
//       success
//       errors
//       # token
//       # refreshToken
//     }
//   }
// `;

// const RegistrationSignUpPage: NextPageWithLayout = () => {
//   const { pageError, setPageError, resetPageError } = usePageError();

//   const router = useRouter();
//   const authContext = useContext(AuthContext);
//   const [register] = useRegisterMutation();
//   const [GetCurrentUser, { error: GetCurrentUserError }] = useGetCurrentUserLazyQuery({
//     fetchPolicy: 'network-only',
//     onCompleted: (res) => {
//       // 新規登録したユーザー情報をコンテキストで保持
//       // authContext.setCurrentUser({ ...res.currentUser });
//       void router.push('/registration/complete/');
//     },
//   });

//   const signUp = async (formData: SignUpFormDataType) => {
//     try {
//       // 確認用パスワードはユーザーに入力させないため、password1の値をそのまま使用する
//       // debugger;
//       const res = await register({
//         variables: {
//           input: {
//             company: formData.company,
//             name: formData.name,
//             email: formData.email,
//             password1: formData.password1,
//             password2: formData.password1,
//           },
//         },
//       });
//       // debugger;

//       if (!res.data?.register || GetCurrentUserError) {
//         throw new Error('新規登録にてエラーが発生しました');
//       }

//       const { token, refreshToken, success, errors } = res.data.register;

//       if (success && errors) {
//         // TODO: Errorオブジェクトが複数ある場合、最後の１つのエラーメッセージしかAlertに表示されない
//         setPageError(Object.values(errors).flat());
//       }

//       debugger;

//       setTokensToCookie(token, refreshToken);
//       await GetCurrentUser();
//     } catch (e) {
//       throw e;
//     }
//   };

//   return (
//     <PageContainer>
//       <div className="grid place-items-center min-h-screen-except-header">
//         <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded my-8">
//           <div className="bg-gray-200 pt-8 pb-16">
//             <div className="text-2xl text-center text-gray-600 mb-6">新規作成</div>
//             <SignUpForm onSubmit={signUp} />
//           </div>
//         </div>
//       </div>
//     </PageContainer>
//   );
// };

// export default RegistrationSignUpPage;

// RegistrationSignUpPage.getLayout = function getLayout(page: ReactElement) {
//   return <NormalLayout>{page}</NormalLayout>;
// };

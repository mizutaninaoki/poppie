// import { FC, useState } from 'react';
// import { gql } from '@apollo/client';
// import { ProfileFormDataZodSchema } from '@/validations/validateProfile';
// import { useValidationErrors } from '@/hooks/useValidationErrors';
// import { ProfileDataFragment } from '@/generated/graphql';

// gql`
//   fragment PlanData on PlanType {
//     id
//     name
//     fee
//   }
// `;

// // export type ProfileFormDataType = {
// //   name: string;
// //   department: string;
// //   comment: string;
// // };

// type Props = {
//   plans: PlanDataFragment | null;
//   setFormData: (data: PlanFormDataType) => void;
// };

// export const PlanCardsRow: FC<Props> = ({ onSubmit: onSubmitFn, profile }) => {
//   const [formData, setFormData] = useState<ProfileFormDataType>({
//     name: profile?.user?.name ?? '',
//     department: profile?.department ?? '',
//     comment: profile?.comment ?? '',
//   });

//   const { errors, setErrors, resetErrors } = useValidationErrors();

//   const onSubmit = () => {
//     resetErrors();
//     const result = ProfileFormDataZodSchema.safeParse(formData);
//     if (!result.success) {
//       setErrors(result.error.format());
//       return;
//     }

//     onSubmitFn(formData);
//   };

//   return (
//     <>
//       <div className="card w-96 bg-base-100 shadow-xl" onClick={clickedPlan}>
//         <figure className="px-10 pt-10">
//           <img
//             src="https://api.lorem.space/image/shoes?w=400&h=225"
//             alt="Shoes"
//             className="rounded-xl"
//           />
//         </figure>
//         <div className="card-body items-center text-center">
//           <h2 className="card-title">Shoes!</h2>
//           <p>If a dog chews shoes whose shoes does he choose?</p>
//           <div className="card-actions">
//             <button className="btn btn-primary">Buy Now</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import { FC, useState } from 'react';
import { gql } from '@apollo/client';
import { ProfileFormDataZodSchema } from '@/validations/validateProfile';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { ProfileDataFragment } from '@/generated/graphql';
import { ProfileImageForm } from '@/components/profiles/ProfileImageForm';
import { PageLoading } from '@/components/PageLoading';

gql`
  fragment ProfileData on ProfileType {
    id
    department
    comment
    imageKey
    imageUrl
    user {
      id
      name
    }
  }
`;

export type ProfileFormDataType = {
  name: string;
  department: string;
  comment: string;
  imageKey?: string;
  image?: File;
};

type Props = {
  profile: ProfileDataFragment;
  loading: boolean;
  onSubmit: (data: ProfileFormDataType) => void;
};

export const ProfileForm: FC<Props> = ({ profile, loading, onSubmit: onSubmitFn }) => {
  const [formData, setFormData] = useState<ProfileFormDataType>({
    name: profile?.user?.name ?? '',
    department: profile?.department ?? '',
    comment: profile?.comment ?? '',
    imageKey: profile?.imageKey ?? '',
    image: undefined,
  });

  const { errors, setErrors, resetErrors } = useValidationErrors();

  const onSubmit = () => {
    resetErrors();
    const result = ProfileFormDataZodSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    onSubmitFn(formData);
  };

  const onSelected = (image: File) => {
    setFormData({ ...formData, image });
  };

  return (
    <>
      <div className="shadow-md p-12 rounded-xl">
        <div className="w-full max-w-sm">
          <ProfileImageForm selectedImageUrl={profile.imageUrl} onSelected={onSelected} />
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                名前
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
                部署
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="text"
                placeholder="人事部"
                className="input w-full max-w-xs bg-gray-200"
                value={formData.department}
                onChange={(e) => {
                  setFormData({ ...formData, department: e.target.value });
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
                コメント
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="textarea w-full bg-gray-200"
                placeholder="よろしくおねがいします"
                value={formData.comment}
                onChange={(e) => {
                  setFormData({ ...formData, comment: e.target.value });
                }}
              ></textarea>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3" />
            <div className="md:w-2/3">
              {loading ? (
                <PageLoading />
              ) : (
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={onSubmit}
                >
                  保存する
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

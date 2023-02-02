import { FC, useState, FormEvent } from 'react';

import styles from './ProfileImageForm.module.scss';

type Props = {
  selectedImageUrl?: string | null;
  onSelected: (image: File) => void;
  error?: any;
};

export const ProfileImageForm: FC<Props> = ({ selectedImageUrl, onSelected, error }) => {
  const [fileDataURL, setFileDataURL] = useState(selectedImageUrl);

  const readAsDataURLPromise = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  };

  const onAddImages = async (e: FormEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;
    if (!fileList) return;
    const file = fileList[0];
    const dataUrl = await readAsDataURLPromise(file);
    setFileDataURL(dataUrl);
    onSelected(file);
  };

  const onInputButtonClick = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).value = '';
  };

  return (
    <>
      <div className={styles.imageBox}>
        <img
          src={fileDataURL || '/images/blank-profile-picture.png'}
          className="mx-auto rounded-full aspect-square"
          width="180px"
          alt="profile-image"
        />
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            プロフィール画像
          </label>
        </div>
        <div className="md:w-2/3">
          <label htmlFor="imageUpload">
            <div className="flex justify-center">
              <div>
                <input
                  className="form-control block text-sm w-full p-3 font-normal bg-white bg-clip-padding border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onInput={(e) => onAddImages(e)}
                  onClick={(e) => onInputButtonClick(e)}
                  hidden
                />
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

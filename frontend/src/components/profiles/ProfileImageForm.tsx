import { FC, useState, FormEvent } from 'react';

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

  // const onDeleteImage = () => {
  //   onSelected(null);
  // };

  return (
    <>
      <img
        src={fileDataURL || '/images/no-image.png'}
        width="350px"
        alt="profile-image"
      />
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            プロフィール画像
          </label>
        </div>
        <div className="md:w-2/3">
          <label htmlFor="imageUpload">
            {/* <span className="btn btn-primary">画像を選択</span> */}
            {/* <input
              id="imageUpload"
              type="file"
              multiple
              accept="image/*"
              onInput={(e) => onAddImages(e)}
              onClick={(e) => onInputButtonClick(e)}
              hidden
            /> */}
            <div className="flex justify-center">
              <div className="mb-3 w-96">
                <label
                  htmlFor="imageUpload"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Default file input example
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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

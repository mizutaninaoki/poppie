import { FC } from 'react';
import styles from './404.module.scss';

/**
 * 404ページ
 */
const Poppie404Page: FC = () => {
  return (
    <div className="container mx-auto">
      <div className="h-screen flex justify-center items-center">
        <div className="bg-gray-100 px-12 py-10 rounded-xl text-center">
          <h2>ページが見つかりませんでした</h2>
          <p className="mb-5">
            URLが間違っているか、ページが削除された可能性があります。
          </p>
          <a
            className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded-lg"
            href="/"
          >
            トップページへ
          </a>
        </div>
      </div>
    </div>
  );
};

export default Poppie404Page;

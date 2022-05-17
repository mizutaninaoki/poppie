import { FC, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export const HeadComponent: FC = () => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <Head>
      {/* <link rel="icon" type="image/jpg" href={} /> */}
      {/* <link rel="apple-touch-icon" sizes="100x100" href={} /> */}
      <title>poppie</title>
    </Head>
  );
};

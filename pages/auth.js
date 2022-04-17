import React from "react";
import Layout from "../components/layout";
import { useSelector } from "react-redux";

const Auth = ({ Component, pageProps }) => {
  const { isLogin } = useSelector((state) => state.auth);
  if (!isLogin) {
    return <Component {...pageProps} />;
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default Auth;

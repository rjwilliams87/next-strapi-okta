import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

import CheckAuthorization from "../components/CheckAuthorization";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CheckAuthorization>
        <Component {...pageProps} />
      </CheckAuthorization>
    </SessionProvider>
  );
}

export default MyApp;

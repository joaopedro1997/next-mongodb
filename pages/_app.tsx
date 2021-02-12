import { AppProps } from 'next/app';
import '../styles/globals.css';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider
      session={pageProps.session}
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
    >
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

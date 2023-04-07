import 'styles/index.css';
import 'reflect-metadata';

import Head from 'next/head';
import { Router } from 'next/router';
import { NextSeo } from 'next-seo';
import I18nProvider from 'next-translate/I18nProvider';
import nProgress from 'nprogress';
import { SWRConfig } from 'swr';

import i18nConfig from '../../i18n.json';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

import { useMemo } from 'react';

import JPCommon from '../../locales/jp/common.json';
import JPLogin from '../../locales/jp/login.json';

const i18nNameSpaceJP = {
  common: JPCommon,
  login: JPLogin,
};

// const i18nNameSpaceEN = {
//   common: ENCommon,
// };

function App({ Component, pageProps }: any) {
  const i18nNameSpace = useMemo(() => {
    // Get Current Language in order to load namespace

    return i18nNameSpaceJP;
  }, []);

  return (
    <>
      <NextSeo defaultTitle="Admin" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <I18nProvider lang={'jp'} namespaces={i18nNameSpace} config={i18nConfig}>
        <SWRConfig value={{ refreshInterval: 3000, fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()) }}>
          <Component {...pageProps} />
        </SWRConfig>
      </I18nProvider>
    </>
  );
}

export default App;

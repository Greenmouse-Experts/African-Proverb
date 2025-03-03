import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <Script
          async
          data-ad-client="ca-pub-8847725878665598"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`}
          crossOrigin='anonymous'
          strategy='afterInteractive'
        /> */}

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html >
  )
}

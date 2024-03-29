import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="vi">
      <Head >
       <link rel="manifest" href="/manifest.json" />
       <link rel="preconnect" href={`${process.env.NEXT_PUBLIC_API_URL}`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

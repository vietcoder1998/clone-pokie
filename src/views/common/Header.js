import Head from "next/head";

export default function CommonHeader({
  title = '',
  coverImageUrl = '',
  type = "Blog cua Viet",
  description = '',
  itemLink = "",
  seo = ''
}) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" type="image/x-icon" href="logo.jpg"  />
      <meta name="description" content={description} key="desc" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Setting for sharing with facebook detail */}
      <meta property="og:image" content={coverImageUrl} />
      <meta property="og:url" content={itemLink} />
      <meta property="og:type" content={'article:section'} />
      <meta property="og:description" content={description} />
      <meta property="robots" content={String(seo)} />
      <meta name="google-site-verification" content="-FI3s7TFCVRNQVhEEEARY3XyfaYqtUD89-S2gBTjNaM" />
    </Head>
  );
}

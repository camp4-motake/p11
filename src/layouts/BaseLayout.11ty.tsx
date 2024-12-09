import type { EleventyPage, EleventyRenderFunction } from '../types/eleventy';
import { Footer } from '../components/Footer.11ty';
import { Header } from '../components/Header.11ty';
import { usePathJoin } from '../hooks/usePathJoin';

interface DefaultLayoutData extends EleventyPage {}

const render: EleventyRenderFunction<DefaultLayoutData> = (data) => {
  const {
    canonical,
    children,
    description,
    metadata,
    ogImage,
    ogType,
    page,
    title,
  } = data;

  return (
    <html lang={metadata?.lang || 'ja'} className="no-js">
      <head>
        <meta charSet={metadata?.encoding || 'utf-8'} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />

        <title>{title}</title>

        <meta
          name="description"
          content={description || metadata?.description || ''}
        />

        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content={ogType || 'article'} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description || metadata?.description || ''}
        />

        <meta
          property="og:url"
          content={usePathJoin(
            metadata?.siteUrl || '',
            page?.url || canonical || '/',
          )}
        />

        <meta property="og:site_name" content={metadata?.site_name} />

        {metadata?.siteUrl && (
          <meta
            property="og:image"
            content={usePathJoin(
              metadata?.siteUrl,
              ogImage || metadata?.ogImage || '',
            )}
          />
        )}

        <meta name="twitter:card" content="summary_large_image" />

        {metadata?.twitterSite && (
          <meta name="twitter:site" content={metadata?.twitterSite} />
        )}

        <link
          rel="canonical"
          href={usePathJoin(
            metadata?.siteUrl || '',
            page?.url || canonical || '/',
          )}
        />

        {metadata?.webFonts && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin=""
            />
          </>
        )}

        {metadata?.webFonts?.map(
          (url) =>
            url?.path && (
              <link
                key={`fonts-preload-${url?.key}`}
                rel="preload"
                as="style"
                href={url?.path}
              />
            ),
        )}

        {metadata?.webFonts?.map(
          (url) =>
            url?.path && (
              <link
                key={`fonts-${url?.key}`}
                rel="stylesheet"
                href={url?.path}
              />
            ),
        )}

        <link rel="stylesheet" href="/src/main.css" />
        <script type="module" src="/src/main.ts"></script>
      </head>

      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default render;

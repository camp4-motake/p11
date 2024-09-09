import { Footer } from '../components/Footer.11ty';
import { Header } from '../components/Header.11ty';
import { pathJoin } from '../modules/pathJoin';

export function BaseLayout(data) {
  const {
    canonical,
    children,
    description,
    metadata,
    ogImage,
    ogType,
    page,
    title,
    titleText,
  } = data;

  return (
    <>
      <html lang={metadata.lang} className="no-js">
        <head>
          <meta charSet={metadata.encoding} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, viewport-fit=cover"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="theme-color" content="#ffffff" />
          <title>{titleText}</title>
          <meta
            name="description"
            content={description || metadata.description || ''}
          />
          <meta property="og:locale" content="ja_JP" />
          <meta property="og:type" content={ogType || 'article'} />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content={description || metadata.description || ''}
          />
          <meta
            property="og:url"
            content={pathJoin(metadata.siteUrl, page.url || canonical || '/')}
          />
          <meta property="og:site_name" content={metadata.site_name} />
          {metadata.siteUrl && (
            <meta
              property="og:image"
              content={pathJoin(metadata.siteUrl, ogImage || metadata.ogImage)}
            />
          )}
          <meta name="twitter:card" content="summary_large_image" />
          {metadata.twitterSite && (
            <meta name="twitter:site" content={metadata.twitterSite || ''} />
          )}
          <link
            rel="canonical"
            href={pathJoin(metadata.siteUrl, page.url || canonical || '/')}
          />
          {metadata.webFonts && (
            <>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin=""
              />
            </>
          )}
          {metadata?.webFonts.map(
            (url) =>
              url?.path && (
                <link
                  key={`fonts-${url?.key}`}
                  rel="preload"
                  as="style"
                  fetchpriority="high"
                  href={url?.path}
                />
              ),
          )}
          {metadata?.webFonts.map(
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
    </>
  );
}
export const render = BaseLayout;

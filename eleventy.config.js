import 'tsx/esm';

import path from 'node:path';

import sizeOf from 'image-size';
import { renderToStaticMarkup } from 'react-dom/server';

export default function (eleventyConfig) {
  /**
   * jsx support
   * @see https://www.11ty.dev/docs/languages/jsx/
   */
  eleventyConfig.addExtension(['11ty.jsx', '11ty.ts', '11ty.tsx'], {
    key: '11ty.js',
    compile: () =>
      async function (data) {
        const content = await this.defaultRenderer(data);
        return renderToStaticMarkup(content);
      },
  });
  eleventyConfig.addTransform('tsx', async (content) => {
    return `<!doctype html>\n${content}`;
  });
  eleventyConfig.addTemplateFormats('11ty.jsx,11ty.tsx');

  /**
   * eleventy dev server
   * @see https://www.11ty.dev/docs/dev-server/
   */
  eleventyConfig.setServerOptions({
    domDiff: false,
    showAllHosts: true,
  });

  /**
   * Ignore Template Files
   * @see https://www.11ty.dev/docs/ignores/
   */
  eleventyConfig.ignores.add('**/README.md');
  eleventyConfig.ignores.add('**/.gitkeep');
  eleventyConfig.ignores.add('**/_drafts/**');

  /**
   * Watch Ignores
   * @see https://www.11ty.dev/docs/watch-serve/
   */
  eleventyConfig.watchIgnores.add('**/*.map');
  eleventyConfig.watchIgnores.add('**/.**');

  /**
   * Passthrough File Copy
   * @see https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy({});

  /**
   * custom filter
   * @see https://www.11ty.dev/docs/filters/
   */
  eleventyConfig.addFilter('urlJoin', (baseUrl = '', pathname = '') =>
    new URL(path.join(baseUrl, pathname)).toString(),
  );
  eleventyConfig.addFilter('padStart', (str = '', length = 2) =>
    String(str).padStart(length, '0'),
  );

  /**
   * custom short code
   * @see https://www.11ty.dev/docs/shortcodes/
   */
  eleventyConfig.addShortcode('img', (src, attr) => {
    if (!src) return '';
    const newAttr = getImgAttr(src, attr, 'img');
    return `<img ${newAttr}>`;
  });
  eleventyConfig.addShortcode('source', (src, attr) => {
    if (!src) return '';
    const newAttr = getImgAttr(src, attr, 'source');
    return `<source ${newAttr}>`;
  });

  return {
    dir: {
      input: 'src/site',
      includes: '../_includes',
      layouts: '../_includes',
      output: '.tmp',
      data: '../_data',
    },
  };
}

/**
 * Image Attribute Generation
 * @param {string} src
 * @param {object} attr
 * @param {string} mode
 * @returns {string}
 */
function getImgAttr(src, attr = {}, mode = 'img') {
  const q = { as: 'webp', ...getQueryParamsRegex(src) };
  const imgSrc = src.split('?')[0];
  const attrType = {
    img: {
      src: `${path.join(imgSrc)}?${objectToQueryString(q)}`,
      alt: '',
      loading: 'lazy',
    },
    source: {
      srcset: `${path.join(imgSrc)}?${objectToQueryString(q)}`,
    },
  };

  if (!attrType[mode]) {
    return '';
  }

  const imgPath = path.join(__dirname, imgSrc);
  const size = {};
  let dimensions = {};

  try {
    dimensions = sizeOf(imgPath);
    size.width = dimensions?.width;
    size.height = dimensions?.height;
  } catch (error) {
    new Error(error);
  }

  if (q?.width) {
    size.width = q?.width;
  }

  if (q?.height) {
    size.height = q?.height;
  }

  const attrs = { ...attrType[mode], ...size, ...attr };

  return Object.keys(attrs)
    .map((key) => `${key}="${attrs[key]}"`)
    .join(' ');
}

function getQueryParamsRegex(url) {
  const query = url.split('?')[1] || '';
  return query.split('&').reduce((params, param) => {
    const [key, value] = param.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    return params;
  }, {});
}

function objectToQueryString(obj) {
  return new URLSearchParams(obj).toString();
}
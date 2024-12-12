import 'tsx/esm';
import { renderToStaticMarkup } from 'react-dom/server';

export const config = {
  dir: {
    input: 'src/views',
    output: '.tmp',
    includes: '../components',
    layouts: '../layouts',
    data: './_data',
  },
};

export default function (eleventyConfig) {
  /** jsx/tsx support @see https://www.11ty.dev/docs/languages/jsx/ */
  eleventyConfig.addExtension(['11ty.jsx', '11ty.ts', '11ty.tsx'], {
    key: '11ty.js',
    compile: () =>
      async function (data) {
        const content = await this.defaultRenderer(data);
        return renderToStaticMarkup(content);
      },
  });
  eleventyConfig.addTransform(
    'tsx',
    async (content) => `<!doctype html>\n${content}`,
  );
  eleventyConfig.addTemplateFormats('11ty.jsx,11ty.tsx');

  /** ignores */
  eleventyConfig.ignores.add('**/README.md');
  eleventyConfig.ignores.add('**/.gitkeep');
  eleventyConfig.ignores.add('**/_drafts/**');
  eleventyConfig.watchIgnores.add('**/*.map');
  eleventyConfig.watchIgnores.add('**/.**');
}

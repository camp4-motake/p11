import 'tsx/esm';
import type { UserConfig } from '@11ty/eleventy';
import { renderToStaticMarkup } from 'react-dom/server';

interface EleventyIgnores {
  add(pattern: string): void;
}

interface ExtensionOptions {
  key: string;
  compile: (this: CompileContext) => CompileFunction;
}

interface CompileContext {
  defaultRenderer: (
    data: Record<string, unknown>,
  ) => Promise<React.ReactElement>;
}

type CompileFunction = (
  this: CompileContext,
  data: Record<string, unknown>,
) => Promise<string>;

interface EleventyConfig {
  addExtension(extensions: string[], options: ExtensionOptions): void;
  addTemplateFormats(formats: string[]): void;
  ignores: EleventyIgnores;
  watchIgnores: EleventyIgnores;
}

export const config = {
  dir: {
    input: 'src/views',
    output: '.tmp',
    includes: '../components',
    layouts: '../layouts',
    data: './_data',
  },
};

export default function (eleventyConfig: EleventyConfig): UserConfig {
  /** jsx/tsx support @see https://www.11ty.dev/docs/languages/jsx/ */
  eleventyConfig.addExtension(['11ty.jsx', '11ty.ts', '11ty.tsx'], {
    key: '11ty.js',
    compile(this: CompileContext): CompileFunction {
      return async function (
        this: CompileContext,
        data: Record<string, unknown>,
      ): Promise<string> {
        try {
          const content = await this.defaultRenderer(data);
          return renderToStaticMarkup(content);
        } catch (error) {
          console.error('Error rendering React component:', error);
          throw error;
        }
      };
    },
  });

  eleventyConfig.addTemplateFormats(['11ty.jsx', '11ty.ts', '11ty.tsx']);

  /** ignores */
  eleventyConfig.ignores.add('**/README.md');
  eleventyConfig.ignores.add('**/.gitkeep');
  eleventyConfig.ignores.add('**/_drafts/**');
  eleventyConfig.watchIgnores.add('**/*.map');
  eleventyConfig.watchIgnores.add('**/.**');

  return config;
}

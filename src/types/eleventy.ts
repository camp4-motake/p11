import type React from 'react';

/** head メタデータ */
interface SiteMetadata {
  lang?: string;
  encoding?: string;
  description?: string;
  siteUrl?: string;
  site_name?: string;
  ogImage?: string;
  twitterSite?: string;
  webFonts?: Array<{
    key: string;
    path?: string;
  }>;
}

/** 11ty ページデータ */
export interface EleventyPage {
  /** ページのタイトル */
  title: string;

  /** ページのパーマリンク (URL) */
  permalink?: string;

  /** ページの説明 (任意) */
  description?: string;

  /** メタデータ (任意) */
  metadata?: SiteMetadata; //| Record<string, unknown>;

  /** タグ (任意) */
  tags?: string[];

  /** ページ作成日 (任意) */
  date?: Date;

  /** カノニカルURL */
  canonical?: string;

  /** og:image */
  ogImage?: string;

  /** og:type */
  ogType?: string;

  /** 子ノード */
  children?: React.ReactNode;

  url?: '/';

  outputPath?: './.tmp/index.html';

  page?: {
    url?: string;
    [key: string]: unknown;
  };

  inputPath?: string;

  fileSlug?: string;

  filePathStem?: string;

  outputFileExtension?: string;

  templateSyntax?: string;

  /** その他の動的プロパティ */
  [key: string]: unknown;
}

/** ページレンダリング関数の型 */
export type EleventyRenderFunction<T extends EleventyPage = EleventyPage> = (
  data: T,
) => React.JSX.Element;

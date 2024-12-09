import path from 'node:path';
import sizeOf from 'image-size';
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImgType = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

interface SizeOf {
  width?: number;
  height?: number;
}

interface QueryParams {
  as?: string;
  width?: number;
  height?: number;
  [key: string]: string | number | unknown | undefined;
}

/**
 * Image Attribute Generation
 * @param {string} src - Source path of the image
 * @param {object} [attr={}] - Additional attributes to add
 * @param {'img' | 'source'} [mode='img'] - Mode of attribute generation
 * @returns {ImgType} React image element props
 */
export function useImgSizeOfAttr(
  src: string,
  attr: Partial<ImgType> = {},
  mode: 'img' | 'source' = 'img',
): ImgType {
  // Default query params with 'as' set to 'webp'
  const q: QueryParams = { as: 'webp', ...getQueryParamsRegex(src) };
  const imgSrc = src.split('?')[0];

  // Define attribute types for img and source elements
  const attrType = {
    img: {
      src: `${path.join(imgSrc)}?${objectToQueryString(q)}`,
      alt: '',
      // loading: 'lazy',
    },
    source: {
      srcset: `${path.join(imgSrc)}?${objectToQueryString(q)}`,
    },
  };

  // Return empty object if mode is invalid
  if (!attrType[mode]) {
    return {};
  }

  const imgPath = path.join(process.cwd(), imgSrc);
  const size: { width?: number; height?: number } = {};
  let dimensions: SizeOf | undefined;

  try {
    dimensions = sizeOf(imgPath);
    size.width = dimensions?.width;
    size.height = dimensions?.height;
  } catch (error) {
    console.error('Error getting image dimensions:', error);
  }

  // Override dimensions from query parameters if provided
  if (q?.width) {
    size.width = Number(q.width);
  }

  if (q?.height) {
    size.height = Number(q.height);
  }

  // Combine attributes
  const attrs: ImgType = {
    ...attrType.img,
    ...size,
    ...attr,
  };

  return attrs;
}

/**
 * Parse query parameters from a URL
 * @param {string} url - URL to parse
 * @returns {QueryParams} Parsed query parameters
 */
function getQueryParamsRegex(url: string): QueryParams {
  const query = url?.split('?')[1] || '';
  return query.split('&').reduce((params: QueryParams, param) => {
    const [key, value] = param.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    return params;
  }, {});
}

/**
 * Convert object to query string
 * @param {object} obj - Object to convert
 * @returns {string} Query string
 */
function objectToQueryString(
  obj: QueryParams | Record<string, string | number>,
): string {
  return new URLSearchParams(
    Object.entries(obj)
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)]),
  ).toString();
}

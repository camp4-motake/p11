import type { ImgHTMLAttributes, ReactElement } from 'react';
import { type ImgType, useImgSizeOfAttr } from '../../hooks/useImgSizeOfAttr';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

export const Image = (props: Props): ReactElement<HTMLImageElement> | null => {
  const { src, ...restProps } = props;

  if (!src) {
    return null;
  }

  const imgProps = useImgSizeOfAttr(src, { alt: '', ...restProps }) as ImgType;

  // biome-ignore lint/a11y/useAltText: <explanation>
  return <img {...imgProps} />;
};

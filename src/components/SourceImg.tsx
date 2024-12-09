import type { ImgHTMLAttributes, ReactElement } from 'react';
import type { SourceType } from '../hooks/useImgSizeOfAttr';
import { useImgSizeOfAttr } from '../hooks/useImgSizeOfAttr';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

export const SourceImg = (
  props: Props,
): ReactElement<HTMLImageElement> | null => {
  const { src, ...restProps } = props;

  if (!src) {
    return null;
  }

  const imgProps = useImgSizeOfAttr(
    src,
    {
      alt: '',
      ...restProps,
    },
    'source',
  ) as SourceType;

  return <source {...imgProps} />;
};

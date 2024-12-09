import type { ReactElement, SourceHTMLAttributes } from 'react';
import { type SourceType, useImgSizeOfAttr } from '../hooks/useImgSizeOfAttr';

type Props = SourceHTMLAttributes<HTMLSourceElement> & {
  src: string;
};

export const SourceImg = (
  props: Props,
): ReactElement<HTMLSourceElement> | null => {
  const { src, ...attr } = props;

  if (!src) {
    return null;
  }

  const imgProps = useImgSizeOfAttr(
    src,
    {
      ...attr,
    },
    'source',
  ) as SourceType;

  return <source {...imgProps} />;
};

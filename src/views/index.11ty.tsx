import { Image } from '../components/Image';
import { Sample } from '../components/Sample.11ty';
import { SourceImg } from '../components/SourceImg';
import BaseLayout from '../layouts/BaseLayout.11ty';
import type { EleventyPage, EleventyRenderFunction } from '../types/eleventy';

export type HomePageData = EleventyPage;

export const data: HomePageData = {
  title: 'title text',
  permalink: '/',
};

const render: EleventyRenderFunction<HomePageData> = (data) => {
  return (
    <BaseLayout {...data}>
      <h1>{data.title}</h1>
      <p>text</p>
      <img
        src="/src/images/test300x300.png?as=webp"
        alt=""
        width={300}
        height={300}
      />
      <Sample label="sample component text" />
      <Image src="/src/images/test300x300.png" />
      <picture>
        <SourceImg src="/src/images/test300x300.png" />
        <Image src="/src/images/test300x300.png" />
      </picture>
    </BaseLayout>
  );
};

export default render;

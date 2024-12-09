import { Image } from '../components/Image';
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
      <p>sample image</p>
      <Image src="/src/images/test300x300.png" />
      <p>sample image</p>
      <picture>
        <SourceImg
          src="/src/images/test300x300.png"
          media="(inline-size >= 48em)"
        />
        <Image src="/src/images/test300x300.png" />
      </picture>
    </BaseLayout>
  );
};

export default render;

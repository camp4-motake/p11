import type { EleventyPage, EleventyRenderFunction } from '../types/eleventy';
import BaseLayout from '../layouts/BaseLayout.11ty';
import { Sample } from '../components/Sample.11ty';
import { Image } from '../components/Image';

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
      <div x-data="inView" x-bind="trigger"></div>
      <img
        src="/src/images/test300x300.png?as=webp"
        alt=""
        width={300}
        height={300}
      />
      <Sample label="sample component text" />
      <Image src="/src/images/test300x300.png" />
    </BaseLayout>
  );
};

export default render;

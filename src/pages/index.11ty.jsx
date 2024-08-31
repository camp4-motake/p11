import { Sample } from '../components/Sample.11ty';
import { BaseLayout } from '../layouts/BaseLayout.11ty';

export const data = {
  title: 'title text',
  permalink: '/',
};

export default function render(data) {
  return (
    <BaseLayout {...data}>
      <h1>{data.title}</h1>
      <p>text</p>
      <div x-data="inView" x-bind="trigger"></div>
      <img src="/src/images/test300x300.png?as=webp" alt="" />
      <img src="/src/images/test300x300.png?as=webp&width=100" alt="" />
      <Sample label="sample component text" />
    </BaseLayout>
  );
}

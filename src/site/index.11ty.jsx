import React from 'react';
import { Sample } from '../_includes/components/Sample';
import { BaseLayout } from '../_includes/layouts/BaseLayout.11ty';

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
      <Sample label="sample component text" />
    </BaseLayout>
  );
}

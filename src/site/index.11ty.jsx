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
      <Sample label="sample component text" />
    </BaseLayout>
  );
}

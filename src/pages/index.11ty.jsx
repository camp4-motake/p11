import React from 'react';
import Sample from '../components/Sample';

render.data = {
  title: 'title text',
  permalink: '/',
  layout: 'base.11ty.jsx',
};

export default function render({ title }) {
  return (
    <>
      <h1>{title}</h1>
      <p>text</p>
      <div x-data='inView' x-bind='trigger'></div>
      <Sample />
    </>
  );
}

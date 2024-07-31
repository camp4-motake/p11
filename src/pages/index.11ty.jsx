import React from 'react';
import Sample from '../components/Sample';

export const data = {
  title: 'title text',
  permalink: '/',
  layout: 'base.11ty.jsx',
};

export default function render(props) {
  return (
    <>
      <h1>{props.title}</h1>
      <p>text</p>
      <div x-data='inView' x-bind='trigger'></div>
      <Sample label='sample component text' />
    </>
  );
}

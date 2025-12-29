import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image } from '../components/util/Image';
import { SourceImg } from '../components/util/SourceImg';
import BaseLayout from '../layouts/BaseLayout.11ty';
export const data = {
    title: 'title text',
    permalink: '/',
};
const render = (data) => {
    return (_jsxs(BaseLayout, { ...data, children: [_jsx("h1", { children: data.title }), _jsx("p", { children: "sample image" }), _jsx(Image, { src: "/src/images/test300x300.png" }), _jsx("p", { children: "sample image" }), _jsxs("picture", { children: [_jsx(SourceImg, { src: "/src/images/test300x300.png", media: "(inline-size >= 48em)" }), _jsx(Image, { src: "/src/images/test300x300.png" })] })] }));
};
export default render;

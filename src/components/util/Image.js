import { jsx as _jsx } from "react/jsx-runtime";
import { useImgSizeOfAttr } from '../../hooks/useImgSizeOfAttr';
export const Image = (props) => {
    const { src, ...restProps } = props;
    if (!src) {
        return null;
    }
    const imgProps = useImgSizeOfAttr(src, { alt: '', ...restProps });
    // biome-ignore lint/a11y/useAltText: <explanation>
    return _jsx("img", { ...imgProps });
};

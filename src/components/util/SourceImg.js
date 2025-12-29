import { jsx as _jsx } from "react/jsx-runtime";
import { useImgSizeOfAttr, } from '../../hooks/useImgSizeOfAttr';
export const SourceImg = (props) => {
    const { src, ...attr } = props;
    if (!src) {
        return null;
    }
    const imgProps = useImgSizeOfAttr(src, { ...attr }, 'source');
    return _jsx("source", { ...imgProps });
};

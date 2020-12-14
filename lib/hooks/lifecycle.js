import { useEffect, useRef } from "react";

export const useUpdateEffect = (callback, dependencies) => {
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            return callback();
        }
    }, dependencies);
};

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

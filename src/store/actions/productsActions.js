import { SET_PRODUCTS, SET_KEY_PRODUCTS, SET_PRODUCT, SET_ALL_PRODUCTS, SET_TITLE_PRODUCTS } from '~/store';

export const setProduct = (payload) => {
    return {
        type: SET_PRODUCT,
        payload,
    };
};

export const setProducts = (payload) => {
    return {
        type: SET_PRODUCTS,
        payload,
    };
};

export const setKeyProducts = (payload) => {
    return {
        type: SET_KEY_PRODUCTS,
        payload,
    };
};

export const setAllProducts = (payload) => {
    return {
        type: SET_ALL_PRODUCTS,
        payload,
    };
};

export const setTitleProducts = (payload) => {
    return {
        type: SET_TITLE_PRODUCTS,
        payload,
    };
};

import initialState from '~/store/initialState';
import { SET_PRODUCT, SET_PRODUCTS, SET_KEY_PRODUCTS, SET_ALL_PRODUCTS, SET_TITLE_PRODUCTS } from '~/store';
const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                ...state,
                product: action.payload,
            };
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };

        case SET_KEY_PRODUCTS:
            return {
                ...state,
                keyProducts: action.payload,
            };

        case SET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
            };
        case SET_TITLE_PRODUCTS:
            return {
                ...state,
                titleProducts: action.payload,
            };

        default:
            return {
                ...state,
            };
    }
};

export default productsReducer;

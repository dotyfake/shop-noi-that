const initialState = {
    keyProducts: 'Ghế Sofa',
    products: [],
    product: JSON.parse(localStorage.getItem('product' ?? '{}')) ?? {},
    allProducts: [],
    titleProducts: '',
};

export default initialState;

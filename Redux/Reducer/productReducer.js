import { ADD_PRODUCT, FETCH_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/types';

const initialState = {
    products: [],
};

export default  (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return { ...state, products: [...state.products, action.payload] };

        
        
            case FETCH_PRODUCTS:
                return {
                    ...state,
                    products: action.products,
                  };

            case UPDATE_PRODUCT:
const updatedProducts = state.products.map(product => {
if (product.id === action.payload.id) {
return action.payload;
}

return product;
});
return { ...state, products: updatedProducts };




case DELETE_PRODUCT:
const filteredProducts = state.products.filter(product => product.id !== action.payload);
return { ...state, products: filteredProducts };
default:
return state;
}
}




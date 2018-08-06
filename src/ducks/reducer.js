const initialState = {
    //array of objects
    suites: [],
    cart: []
}

const UPDATE_SUITES = "UPDATE_SUITES";
const UPDATE_CART = "UPDATE_CART";
const RESET_CART = "RESET_CART";
// const UPDATE_IMAGES = "UPDATE_IMAGES";

export function updateSuites(suites) {
    return {
        type: UPDATE_SUITES,
        payload: suites
    }
}

export function updateCart(itemObj) {
    return {
        type: UPDATE_CART,
        payload: itemObj
    }
}

export function resetCart() {
    return {
        type: RESET_CART
    }
}

// export function updateImages(images) {
//     return {
//         type: UPDATE_IMAGES,
//         payload: images
//     }
// }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SUITES:
            return Object.assign({}, state, {suites: action.payload});
        case UPDATE_CART:
            return Object.assign({}, state, {cart: [...state.cart, action.payload]});
        case RESET_CART:
            return Object.assign({}, state, {cart: []});
        // case UPDATE_IMAGES:}
        //     return Object.assign({}, state, {images: action.payload});
        default:
            return state;
    }
}
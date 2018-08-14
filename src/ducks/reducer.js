import _ from "lodash";

const initialState = {
    //array of objects
    suites: [],
    loggedIn: false,
    cart: [],
    selectedSuite: {}
}

const UPDATE_SUITES = "UPDATE_SUITES";
const UPDATE_LOGGED_IN = "UPDATE_LOGGED_IN"
const UPDATE_CART = "UPDATE_CART";
const DELETE_ITEM_FROM_CART = "DELETE_ITEM_FROM_CART";
const REFRESH_CART = "REFRESH_CART";
const RESET_CART = "RESET_CART";
const UPDATE_SELECTED_SUITE = "UPDATE_SELECTED_SUITE";
// const UPDATE_IMAGES = "UPDATE_IMAGES";

export function updateSuites(suites) {
    return {
        type: UPDATE_SUITES,
        payload: suites
    }
}

export function updateLoggedIn(status) {
    return {
        type: UPDATE_LOGGED_IN,
        payload: status
    }
}

export function updateCart(itemObj) {
    return {
        type: UPDATE_CART,
        payload: itemObj
    }
}

export function deleteItemFromCart(id) {
    return {
        type: DELETE_ITEM_FROM_CART,
        payload: id
    }
}

export function refreshCart() {
    return {
        type: REFRESH_CART,
    }
}

export function resetCart(cart) {
    return {
        type: RESET_CART,
        payload: cart
    }
}

export function updateSelectedSuite(suite) {
    return {
        type: UPDATE_SELECTED_SUITE,
        payload: suite
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
        case UPDATE_LOGGED_IN:
            return Object.assign({}, state, {loggedIn: action.payload});
        case UPDATE_CART:
            return Object.assign({}, state, {cart: [...state.cart, action.payload]});
        case REFRESH_CART:
            return Object.assign({}, state, {cart: action.payload})
        case DELETE_ITEM_FROM_CART:
            let proxyCart = [...state.cart];
            let index = _.findIndex(proxyCart, ['id', action.payload])
            if(index !== -1){
                proxyCart.splice(index, 1);
              }
            return Object.assign({}, state, {cart: proxyCart}); 
        case RESET_CART:
            return Object.assign({}, state, {cart: []});
        case UPDATE_SELECTED_SUITE:
            return Object.assign({}, state, {selectedSuite: action.payload});
        // case UPDATE_IMAGES:}
        //     return Object.assign({}, state, {images: action.payload});
        default:
            return state;
    }
}
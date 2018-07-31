const initialState = {
    //array of objects
    suites: [],
    images: []
}

const UPDATE_SUITES = "UPDATE_SUITES";
const UPDATE_IMAGES = "UPDATE_IMAGES";

export function updateSuites(suites) {
    return {
        type: UPDATE_SUITES,
        payload: suites
    }
}

export function updateImages(images) {
    return {
        type: UPDATE_IMAGES,
        payload: images
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SUITES:
            return Object.assign({}, state, {suites: action.payload});
        case UPDATE_IMAGES:
            return Object.assign({}, state, {images: action.payload});
        default:
            return state;
    }
}
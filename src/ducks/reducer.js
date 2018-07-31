const initialState = {
    //array of objects
    suites: []
}

const UPDATE_SUITES = "UPDATE_SUITES";

export function updateSuites(suites) {
    return {
        type: UPDATE_SUITES,
        payload: suites
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SUITES:
            return Object.assign({}, state, {suites: action.payload});
        default:
            return state;
    }
}
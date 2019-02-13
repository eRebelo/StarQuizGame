const INITIAL_STATE = {
    loading: false,
    list: [],
    modalStatusAdd: false,
    modalStatusRemove: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'EQUIPMENT_LIST':
            return { ...state, list: action.payload }
        case 'LOADING':
            return { ...state, loading: state.loading === false ? true : false }
        default:
            return state
    }
}
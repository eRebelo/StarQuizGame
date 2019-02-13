import { initialize } from 'redux-form';

const INITIAL_VALUE = {
    name: null
}

export const cleanForm = () => {
    return initialize('starQuizCharacterForm', INITIAL_VALUE)
}
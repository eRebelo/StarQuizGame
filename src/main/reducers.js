import { combineReducers } from 'redux'
import machineReducer from '../components/machine/equipmentReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { reducer as formReducer } from 'redux-form'
import appReducer from '../components/app/appReducer'
import starQuizReducer from '../components/starquiz/starQuizReducer'


const rootReducer = combineReducers({
    machine: machineReducer,
    toastr: toastrReducer,
    form: formReducer,
    app: appReducer,
    starQuiz: starQuizReducer
})

export default rootReducer
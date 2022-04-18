import {combineReducers, createStore} from "redux";
import listReducer from "./listReducer";

let reducers = combineReducers({
    list: listReducer,
})

let store = createStore(reducers)

export default store
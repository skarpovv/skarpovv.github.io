const ADD = "ADD";
const DELETE = "DELETE";
const ON_CHANGE_TEXT = "ON_CHANGE_TEXT";
const TOGGLE_STATUS = "TOGGLE_STATUS";

let initialState = {
    Tasks: [

    ],
    inputText: ""
};
// ????????????????????????????????????
const setID = (Tasks) => {
    return Tasks.length + 1;
}

let listReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD:{
            if (action.text === "") return state;
            return{
                ...state,
                Tasks: [...state.Tasks,{id: setID(state.Tasks), text: action.text, status: true}],
                inputText: ""
            }
        }
        case DELETE:{
            return {
                ...state
            }
        }
        case ON_CHANGE_TEXT:{
            return{
                ...state,
                inputText: action.text
            }
        }
        case TOGGLE_STATUS:{
            return {
                ...state,
                Tasks: state.Tasks.map(el => {
                    if (el.id === action.id){
                        return {...el, status: (!action.status)}
                    }
                    else return el;
                })
            }
        }
        default:
            return state
    }
}

export const addtodo = (text) => ({type: ADD, text})
export const onChangeText = (text) => ({type: ON_CHANGE_TEXT, text})
export const toggleStatus = (id, status) => ({type: TOGGLE_STATUS, id, status})

export default listReducer
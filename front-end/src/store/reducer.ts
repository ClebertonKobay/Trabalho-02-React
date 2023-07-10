import { Reducer } from 'redux';


interface Action {
    type: string;
    payload?: string;
}
interface AuthState {
    token: string | null;
}
  
const initialState:AuthState = {
    token: null,
};

const authReducer:Reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, token: action.payload };
        case 'LOGOUT':
            return { ...state, token: null };
        case 'REGISTER': 
                return { ... state, token: action.payload }
        default:
            return state;
    }
};

export default authReducer;
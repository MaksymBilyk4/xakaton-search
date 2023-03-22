import {composeWithDevTools} from "redux-devtools-extension";
import usersReducer from "../redux/users/reducer";

import thunk from "redux-thunk";
const {applyMiddleware, combineReducers, createStore} = require("redux");

const reducer = combineReducers({
    users: usersReducer
});

export default () => {
    return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
}
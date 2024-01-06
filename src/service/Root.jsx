import {combineReducers} from "redux";   
import { NameSI } from "./Check";
import { productsReducer ,Total,Current,cartReducer,TotalCart,Rolee,Show,coca} from "./Check";
let Root = combineReducers({
    NameSI,productsReducer,Total,Current,cartReducer,TotalCart,Rolee,Show,coca
})

export {Root};
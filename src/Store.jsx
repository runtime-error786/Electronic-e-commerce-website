import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk';
import { Root } from "./service/Root";

let Storee = configureStore({
    reducer:Root
},
applyMiddleware(thunk)
);

export {Storee};
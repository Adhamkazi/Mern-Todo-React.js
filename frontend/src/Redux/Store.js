import { legacy_createStore } from "redux";
import reducer from "./reducer";


const store = legacy_createStore(reducer)
console.log(store.getState())

export  default store
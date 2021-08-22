import { combineReducers } from "redux";
import { formBuilderReducer } from "./FormBuilderReducer";

export const appReducer = combineReducers({
  formbuilder: formBuilderReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};

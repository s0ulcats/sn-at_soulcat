import { useDispatch as useReduxDispatch } from 'react-redux';
import { Action, applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk, ThunkAction } from 'redux-thunk';
import appReducer from './app-reducer.ts';
import authReducer from './auth-reducer.ts';
import chatReducer from './chat-reducer.ts';
import messagesReducer from './messagesReducer.ts';
import profileReducer from './profileReducer.ts';
import usersReducer from './usersReducer.ts';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

let store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore
window.store = store;

export default store;

import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { AnswerReducer } from './reducers/answer.reducer';

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

const rootReducer = combineReducers({
    AnswerReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

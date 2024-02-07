import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../ReduxStore";

interface stateType {
    answerList: any,
    answerIsLoading: boolean
    isOpenNav: boolean
}

const initialState: stateType = {
    answerList: null,
    answerIsLoading: false,
    isOpenNav: false
}
export const slice = createSlice({
    name: 'AnswerReducer',
    initialState,
    reducers: {
        setAnswerListAction: (state, action: PayloadAction<any>) : void  => {
            state.answerList = action.payload
        },
        setAnswerIsLoadingAction: (state, action: PayloadAction<boolean>) : void  => {
            state.answerIsLoading = action.payload
        },
        setIsOpenAction: (state, action: PayloadAction<boolean>) : void  => {
            state.isOpenNav = action.payload
        },
    }
})

export const AnswerReducer = slice.reducer
export const AnswerActions = slice.actions
export const AnswerState = (state: RootState) => state.AnswerReducer

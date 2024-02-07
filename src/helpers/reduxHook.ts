import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type { RootState, AppDispatch } from '../store/ReduxStore'
import {
    Action,
    bindActionCreators, CaseReducerActions, SliceCaseReducers,
} from "@reduxjs/toolkit";


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useActions<T>(actions: T): T {
    const dispatch = useAppDispatch();
    return bindActionCreators(actions as any, dispatch);
}

export function useThunks<T>(actions: T ): T {
    const dispatch = useAppDispatch();
    return bindActionCreators(actions as any, dispatch);
}
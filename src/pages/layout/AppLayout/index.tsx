import s from './index.module.scss';
import {ReactNode, useEffect, useMemo} from "react";
import {DesktopNavigation} from "../../../components/DesktopNavigation";
import {MobileNavigation} from "../../../components/MobileNavigation";
import {useWindowDimensions} from "../../../helpers/getWindowDimensionsHook";
import {ProgressBar} from "../../../components/ProgressBar";
import {useActions, useAppDispatch, useAppSelector} from "../../../helpers/reduxHook";
import {AnswerActions, AnswerState} from "../../../store/reducers/answer.reducer";
import classNames from "classnames";
import {useLocation, useParams} from "react-router-dom";

export const AppLayout = ({
    children,
} : {
    children: ReactNode
}) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { deal_id } = useParams();
    const { setIsOpenAction } = useActions(AnswerActions);
    const { answerList, isOpenNav } = useAppSelector(AnswerState);
    const { height, width } = useWindowDimensions();

    useMemo(() => {
        if (width > 800) {
            dispatch(setIsOpenAction(false))
        }
    }, [width])

    return (
        (location.pathname !== '/' && !deal_id) ?
            <div className={classNames(s.AppLayout, isOpenNav && s.navOpen)}>
                {/* === NAV START === */}
                {
                    width > 800 ?
                        <DesktopNavigation />
                        :
                        ( isOpenNav ? <MobileNavigation /> : null)
                }

                {/* === PROGRESS BAR START === */}
                <ProgressBar progress={answerList?.progress ?? 0}/>

                {/* === OUTLET START === */}
                { children }
            </div>
            :
            <div>
                {children}
            </div>
    );
};

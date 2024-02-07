import s from './index.module.scss';
import classNames from "classnames";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import Skeleton from "../../../ui/Skeleton";
import {useSelector} from "react-redux";
import {useAppSelector} from "../../../helpers/reduxHook";
import {AnswerState} from "../../../store/reducers/answer.reducer";
import {Navigation} from "../../../components/Navigation";
import {useMemo, useState} from "react";
import {DesktopNavigation} from "../../../components/DesktopNavigation";

export const QuestionsLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { deal_id } = useParams();
    const [currentLocation, setCurrentLocation] = useState(location.pathname)
    const { answerIsLoading } = useAppSelector(AnswerState);
    const [isOpenNav, setIsOpenNav] = useState(false);

    const onClickCloseBtnHandler = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('myself')
        localStorage.removeItem('deal_id')
        navigate('/')
    }

    useMemo(() => {
        if (location.pathname !== currentLocation) {
            setIsOpenNav(false)
            setCurrentLocation(location.pathname)
        }
    }, [location])

    return (
        <div className={classNames(s.QuestionsLayout, (location.pathname === '/' || deal_id) && s.startPage, location.pathname === '/all-in-form'  && s.allInPage, location.pathname === '/success' && s.successPage)}>
            {/*{
                (!isOpenNav && location.pathname !== '/' && location.pathname !== '/success') &&
                <div className={classNames(s.navBtn, isOpenNav && s.active)} onClick={() => setIsOpenNav(!isOpenNav)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeWidth="1.5"
                            d="M20 7H4M20 12H4M20 17H4"
                        ></path>
                    </svg>
                </div>
            }
*/}
            {/*{(location.pathname !== '/' && location.pathname !== '/success') && <div className={s.cancel} onClick={onClickCloseBtnHandler}>Отменить заполнение</div>}*/}
            {/*{(location.pathname !== '/' && location.pathname !== '/success') && <Navigation onClose={() => setIsOpenNav(false)} isOpen={isOpenNav}/>}*/}
            {answerIsLoading && <Skeleton/>}
            <Outlet />
        </div>
    );
};

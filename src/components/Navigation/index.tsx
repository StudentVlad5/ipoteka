import s from './index.module.scss';
import {Link, Navigate, useLocation, useParams} from "react-router-dom";
import classNames from "classnames";
import {useAppSelector} from "../../helpers/reduxHook";
import {AnswerState} from "../../store/reducers/answer.reducer";
import useClickOutside from "use-click-outside";
import {useRef} from "react";

export const Navigation = ({
    onClose,
    isOpen
} : {
    onClose: () => void
    isOpen: boolean
}) => {
    const { answerList } = useAppSelector(AnswerState);
    const location = useLocation();


    const onCLickCloseNavigationHandler = (e: any) =>{
        if (e.target.id === "overlay") {
            onClose()
        }
    }

    return (
        <div id={"overlay"} className={s.Navigation} onClick={onCLickCloseNavigationHandler}>
            <nav className={s.nav}>
                <div className={s.close} onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="none"
                        viewBox="-0.5 0 25 25"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 21.32l18-18M3 3.32l18 18"
                        ></path>
                    </svg>
                </div>

                <ul className={s.list}>
                    <li className={classNames(s.item, location.pathname === '/role' && s.active)}>
                        <Link to={"/role"}>Роль клиента</Link>
                        { (answerList && answerList.role) &&
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="none"
                            viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/client-info' && s.active)}>
                        <Link to={"/client-info"}>Информация о клиенте</Link>
                        { (answerList && answerList['client-info']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/employment-status' && s.active)}>
                        <Link to={"/employment-status"}>Статус занятости</Link>
                        { (answerList && answerList['employment-status']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/credit-target' && s.active)}>
                        <Link to={"/credit-target"}>Цель кредита</Link>
                        { (answerList && answerList['credit-target']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/region' && s.active)}>
                        <Link to={"/region"}>Регион приобретения</Link>
                        { (answerList && answerList['region']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/credit-info' && s.active)}>
                        <Link to={"/credit-info"}>Информация о кредите</Link>
                        { (answerList && answerList['credit-info']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/source-initial-payment' && s.active)}>
                        <Link to={"/source-initial-payment"}>Источник первоначального взноса</Link>
                        { (answerList && answerList['source-initial-payment']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/additional-conditions' && s.active)}>
                        <Link to={"/additional-conditions"}>Тип программы</Link>
                        { (answerList && answerList['additional-conditions']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/actual-address' && s.active)}>
                        <Link to={"/actual-address"}>Адрес фактического проживания</Link>
                        { (answerList && answerList['actual-address']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/social-status' && s.active)}>
                        <Link to={"/social-status"}>Социальный статус</Link>
                        { (answerList && answerList['social-status']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/employment-info' && s.active)}>
                        <Link to={"/employment-info"}>Занятость</Link>
                        { (answerList && answerList['employment-info']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/organization' && s.active)}>
                        <Link to={"/organization"}>Организация</Link>
                        { (answerList && answerList['organization']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/work-experience' && s.active)}>
                        <Link to={"/work-experience"}>Трудовой стаж</Link>
                        { (answerList && answerList['work-experience']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    { (answerList && answerList.clientPartTimeJob) && <li className={classNames(s.item, location.pathname === '/part-time-jop-organization' && s.active)}>
                        <Link to={"/part-time-jop-organization"}>Организация (Работа по совместительству)</Link>
                        { (answerList && answerList['']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li> }

                    { (answerList && answerList.clientPartTimeJob) && <li className={classNames(s.item, location.pathname === '/part-time-work-experience' && s.active)}>
                        <Link to={"/part-time-work-experience"}>Трудовой стаж (Работа по совместительству)</Link>
                        { (answerList && answerList['']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li> }

                    <li className={classNames(s.item, location.pathname === '/client-finance' && s.active)}>
                        <Link to={"/client-finance"}>Финансы</Link>
                        { (answerList && answerList['client-finance']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/assets-Vehicle-1' && s.active)}>
                        <Link to={"/assets-Vehicle-1"}>Транспортное средство</Link>
                        { (answerList && answerList['assets-Vehicle-1']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/assets-immovables-1' && s.active)}>
                        <Link to={"/assets-immovables-1"}>Недвижимость</Link>
                        { (answerList && answerList['assets-immovables-1']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>
                    { (answerList && answerList.immovablesType2) && <li className={classNames(s.item, location.pathname === '/assets-immovables-2' && s.active)}>
                        <Link to={"/assets-immovables-2"}>Недвижимость #2</Link>
                        { (answerList && answerList['assets-immovables-2']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li> }

                    { (answerList && answerList.immovablesType3) && <li className={classNames(s.item, location.pathname === '/assets-immovables-3' && s.active)}>
                        <Link to={"/assets-immovables-3"}>Недвижимость #3</Link>
                        { (answerList && answerList['assets-immovables-3']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li> }

                    { (answerList && answerList.clientPartTimeJob) && <li className={classNames(s.item, location.pathname === '/lph-data' && s.active)}>
                        <Link to={"/lph-data"}>Личное подсобное хозяйство</Link>
                        { (answerList && answerList['']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li> }

                    <li className={classNames(s.item, location.pathname === '/other' && s.active)}>
                        <Link to={"/other"}>Прочее</Link>
                        { (answerList && answerList['other']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/additional-information' && s.active)}>
                        <Link to={"/additional-information"}>Дополнительная информация</Link>
                        { (answerList && answerList['additional-information']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    <li className={classNames(s.item, location.pathname === '/upload-files' && s.active)}>
                        <Link to={"/upload-files"}>Приложить файлы</Link>
                        { (answerList && answerList['upload-files']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>

                    {/*<li className={classNames(s.item, location.pathname === '/success' && s.active)}>
                        <Link to={"/success"}>Финальная страница</Link>
                        { (answerList && answerList['success']) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M18 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25h8.86a.75.75 0 110 1.5H6A1.25 1.25 0 004.75 6v12A1.25 1.25 0 006 19.25h12A1.25 1.25 0 0019.25 18v-7.71a.75.75 0 111.5 0V18A2.75 2.75 0 0118 20.75z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"
                                ></path>
                            </svg>
                        }
                    </li>*/}
                </ul>
            </nav>
        </div>
    );
};

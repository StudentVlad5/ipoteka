import s from './index.module.scss';
import HomeIcon from '../../common/assets/images/home.png';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {AnswerActions, AnswerState} from "../../store/reducers/answer.reducer";
import {useActions, useAppDispatch, useAppSelector} from "../../helpers/reduxHook";
import classNames from "classnames";
import {baseUrl} from "../../common/config";

export const MobileNavigation = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);
    const { setIsOpenAction } = useActions(AnswerActions)
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [isLoadingDownloadAnket, setIsLoadingDownloadAnket] = useState(false);

    const onCLickCloseBtnHandler = () => {
        dispatch(setIsOpenAction(false))
    }

    const onClickCloseFormBtnHandler = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('myself')
        localStorage.removeItem('deal_id')
        navigate('/')
    }

    const onClickDownloadAnket = async () => {
        setIsLoadingDownloadAnket(true)
        const anketId = localStorage.getItem('id')
        await fetch(`${baseUrl}/getpdf?identifier=${anketId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/pdf',
            },
        }).then(data => {
            if (data.status === 200) return data.blob()
            else throw Error()
        }).then(blobData => {
            // Создаем ссылку, присваеваем ей URL и имитируем нажатие
            const urlCreator = window.URL || window.webkitURL;

            let link = document.createElement('a');
            link.href = urlCreator.createObjectURL(blobData)
            link.setAttribute(
                'download',
                `${anketId}.pdf`,
            );
            link.click();

            // Удаляем ссылку на объект, для очистки памяти
            URL.revokeObjectURL(link.href);
            setIsLoadingDownloadAnket(false)
        })
    }

    return (
        <div className={s.wrapper}>
            <button className={s.closeBtn} onClick={onCLickCloseBtnHandler}></button>
            <aside className={s.MobileNavigation}>
                <header className={s.header}>
                    <div className={s.title} onClick={onClickCloseFormBtnHandler}>
                        <img className={s.icon} src={HomeIcon} alt="Home Icon"/>
                        <span>Выбор опции</span>
                    </div>
                </header>

                <nav className={s.nav}>
                <ul className={s.navList}>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList.role) && s.fullfield, location.pathname === '/role' && s.active)}>
                        <Link to={"/role"}>Роль клиента</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['client-info']) && s.fullfield, location.pathname === '/client-info' && s.active)}>
                        {
                            <Link to={"/client-info"}>Информация о клиенте</Link>
                        }
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['employment-status']) && s.fullfield, location.pathname === '/employment-status' && s.active)}>
                        <Link to={"/employment-status"}>Статус занятости</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['credit-target']) && s.fullfield, location.pathname === '/credit-target' && s.active)}>
                        <Link to={"/credit-target"}>Цель кредита</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['region']) && s.fullfield, location.pathname === '/region' && s.active)}>
                        <Link to={"/region"}>Регион приобретения</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['credit-info']) && s.fullfield, location.pathname === '/credit-info' && s.active)}>
                        <Link to={"/credit-info"}>Информация о кредите</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['income-proof']) && s.fullfield, location.pathname === '/income-proof' && s.active)}>
                        <Link to={"/income-proof"}>Подтверждение дохода</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['source-initial-payment']) && s.fullfield, location.pathname === '/source-initial-payment' && s.active)}>
                        <Link to={"/source-initial-payment"}>Источник ПВ</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['additional-conditions']) && s.fullfield, location.pathname === '/additional-conditions' && s.active)}>
                        <Link to={"/additional-conditions"}>Тип программы</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['actual-address']) && s.fullfield, location.pathname === '/actual-address' && s.active)}>
                        <Link to={"/actual-address"}>Адрес факn. проживания</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['social-status']) && s.fullfield, location.pathname === '/social-status' && s.active)}>
                        <Link to={"/social-status"}>Социальный статус</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['employment-info']) && s.fullfield, location.pathname === '/employment-info' && s.active)}>
                        <Link to={"/employment-info"}>Занятость</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['organization']) && s.fullfield, location.pathname === '/organization' && s.active)}>
                        <Link to={"/organization"}>Организация</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['work-experience']) && s.fullfield, location.pathname === '/work-experience' && s.active)}>
                        <Link to={"/work-experience"}>Трудовой стаж</Link>
                    </li>

                    {
                        (answerList && answerList.clientPartTimeJob) &&
                        <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['part-time-jop-employment-info']) && s.fullfield, location.pathname === '/part-time-jop-employment-info' && s.active)}>
                            <Link to={"/part-time-jop-employment-info"}>Занятость (Работа по совместительству)</Link>
                        </li>
                    }

                    {
                        (answerList && answerList.clientPartTimeJob) &&
                        <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['part-time-jop-organization']) && s.fullfield, location.pathname === '/part-time-jop-organization' && s.active)}>
                            <Link to={"/part-time-jop-organization"}>Организация (Работа по совместительству)</Link>
                        </li>
                    }

                    {
                        (answerList && answerList.clientPartTimeJob) &&
                        <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['part-time-work-experience']) && s.fullfield, location.pathname === '/part-time-work-experience' && s.active)}>
                            <Link to={"/part-time-work-experience"}>Трудовой стаж (Работа по совместительству)</Link>
                        </li>
                    }

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['client-finance']) && s.fullfield, location.pathname === '/client-finance' && s.active)}>
                        <Link to={"/client-finance"}>Финансы</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['assets-Vehicle-1']) && s.fullfield, location.pathname === '/assets-Vehicle-1' && s.active)}>
                        <Link to={"/assets-Vehicle-1"}>Транспортное средство</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['assets-immovables-1']) && s.fullfield, location.pathname === '/assets-immovables-1' && s.active)}>
                        <Link to={"/assets-immovables-1"}>Недвижимость</Link>
                    </li>

                    {
                        (answerList && answerList.immovablesType2) &&
                        <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['assets-immovables-2']) && s.fullfield, location.pathname === '/assets-immovables-2' && s.active)}>
                            <Link to={"/assets-immovables-2"}>Недвижимость #2</Link>
                        </li>
                    }

                    {
                        (answerList && answerList.immovablesType3) &&
                        <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['assets-immovables-3']) && s.fullfield, location.pathname === '/assets-immovables-3' && s.active)}>
                            <Link to={"/assets-immovables-3"}>Недвижимость #3</Link>
                        </li>
                    }

                    {
                        (answerList && answerList.clientPartTimeJob) &&
                        <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['lph-data']) && s.fullfield, location.pathname === '/lph-data' && s.active)}>
                            <Link to={"/lph-data"}>Личное подсобное хозяйство</Link>
                        </li>
                    }

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['other']) && s.fullfield, location.pathname === '/other' && s.active)}>
                        <Link to={"/other"}>Прочее</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['additional-information']) && s.fullfield, location.pathname === '/additional-information' && s.active)}>
                        <Link to={"/additional-information"}>Доп. информация</Link>
                    </li>

                    <li onClick= {onCLickCloseBtnHandler} className={classNames(s.navItem, (answerList && answerList['upload-files']) && s.fullfield, location.pathname === '/upload-files' && s.active)}>
                        <Link to={"/upload-files"}>Приложить файлы</Link>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['additional-information']) && s.fullfield)}>
                        <span onClick={onClickDownloadAnket}>{isLoadingDownloadAnket ? "Загрузка..." : "Скачать анкету"}</span>
                    </li>
                </ul>
            </nav>

                <footer className={s.footer}>
                    <div className={s.btn}>
                        <button onClick={onClickCloseFormBtnHandler}>Отменить заполнение</button>
                    </div>
                </footer>
        </aside>
        </div>
    );
};

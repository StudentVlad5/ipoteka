import s from './index.module.scss';
import HomeIcon from '../../common/assets/images/home.png';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {AnswerState} from "../../store/reducers/answer.reducer";
import {useAppSelector} from "../../helpers/reduxHook";
import classNames from "classnames";
import {baseUrl} from "../../common/config";
import Skeleton from "../../ui/Skeleton";
import { FaCheck } from "react-icons/fa6";

export const DesktopNavigation = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);
    const location = useLocation();
    const [isLoadingDownloadAnket, setIsLoadingDownloadAnket] = useState(false);

    const onClickCloseBtnHandler = () => {
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
        <aside className={s.DesktopNavigation}>
            <header className={s.header}>
                <div className={s.title} onClick={onClickCloseBtnHandler}>
                    <img className={s.icon} src={HomeIcon} alt="Home Icon"/>
                    <span>Выбор опции</span>
                </div>
            </header>

            <nav className={s.nav}>
                <ul className={s.navList}>

                    <li className={classNames(s.navItem, (answerList && answerList.role) && s.fullfield, location.pathname === '/role' && s.active)}>
                        <div className="check">
                        <Link to={"/role"}>Роль клиента</Link>
                        {answerList && answerList['role']  && 
                        <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['client-info']) && s.fullfield, location.pathname === '/client-info' && s.active)}>
                        <div className="check">
                            <Link to={"/client-info"}>Информация о клиенте</Link>
                            {answerList && answerList['client-info'] &&
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['employment-status']) && s.fullfield, location.pathname === '/employment-status' && s.active)}>
                        <div className="check">
                            <Link to={"/employment-status"}>Статус занятости</Link>
                            {answerList && answerList['employment-status'] && <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['credit-target']) && s.fullfield, location.pathname === '/credit-target' && s.active)}>
                        <div className="check">
                            <Link to={"/credit-target"}>Цель кредита</Link>
                            {answerList && answerList['credit-target'] && <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['region']) && s.fullfield, location.pathname === '/region' && s.active)}>
                        <div className="check">
                            <Link to={"/region"}>Регион приобретения</Link>
                            {answerList && answerList['region'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['credit-info']) && s.fullfield, location.pathname === '/credit-info' && s.active)}>
                        <div className="check">
                            <Link to={"/credit-info"}>Информация о кредите</Link>
                            {answerList && 
                            answerList['credit-info'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['income-proof']) && s.fullfield, location.pathname === '/income-proof' && s.active)}>
                        <div className="check">
                            <Link to={"/income-proof"}>Подтверждение дохода</Link>
                            {answerList && 
                            answerList['income-proof'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['source-initial-payment']) && s.fullfield, location.pathname === '/source-initial-payment' && s.active)}>
                        <div className="check">
                            <Link to={"/source-initial-payment"}>Источник ПВ</Link>
                            {answerList && 
                            answerList['source-initial-payment'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['additional-conditions']) && s.fullfield, location.pathname === '/additional-conditions' && s.active)}>
                        <div className="check">
                            <Link to={"/additional-conditions"}>Тип программы</Link>
                            {answerList && 
                            answerList['additional-conditions'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['actual-address']) && s.fullfield, location.pathname === '/actual-address' && s.active)}>
                        <div className="check">
                            <Link to={"/actual-address"}>Адрес факт. проживания</Link>
                            {answerList && 
                            answerList['actual-address'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['social-status']) && s.fullfield, location.pathname === '/social-status' && s.active)}>
                        <div className="check">
                            <Link to={"/social-status"}>Социальный статус</Link>
                            {answerList && 
                            answerList['social-status'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['employment-info']) && s.fullfield, location.pathname === '/employment-info' && s.active)}>
                        <div className="check">
                            <Link to={"/employment-info"}>Занятость</Link>
                            {answerList && 
                            answerList['employment-info'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['organization']) && s.fullfield, location.pathname === '/organization' && s.active)}>
                        <div className="check">                        
                            <Link to={"/organization"}>Организация</Link>
                            {answerList && 
                            answerList['organization'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['work-experience']) && s.fullfield, location.pathname === '/work-experience' && s.active)}>
                        <div className="check">   
                            <Link to={"/work-experience"}>Трудовой стаж</Link>
                            {answerList && 
                            answerList['work-experience'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    {
                        (answerList && answerList.clientPartTimeJob) &&
                        <li className={classNames(s.navItem, (answerList && answerList['part-time-jop-employment-info']) && s.fullfield, location.pathname === '/part-time-jop-employment-info' && s.active)}>
                            <div className="check"> 
                                <Link to={"/part-time-jop-employment-info"}>Занятость  <br/>(Работа по совместительству)</Link>
                                {answerList && 
                                answerList['part-time-jop-employment-info'] && 
                                <FaCheck style={{fill:'green'}}/>}
                            </div>
                        </li>
                    }

                    {
                        (answerList && answerList.clientPartTimeJob) &&
                        <li className={classNames(s.navItem, (answerList && answerList['part-time-jop-organization']) && s.fullfield, location.pathname === '/part-time-jop-organization' && s.active)}>
                            <div className="check"> 
                                <Link to={"/part-time-jop-organization"}>Организация <br/>(Работа по совместительству)</Link>
                                {answerList && 
                                answerList['part-time-jop-organization'] && 
                                <FaCheck style={{fill:'green'}}/>}
                            </div>
                        </li>
                    }

                    {
                        (answerList && answerList.clientPartTimeJob) &&
                        <li className={classNames(s.navItem, (answerList && answerList['part-time-work-experience']) && s.fullfield, location.pathname === '/part-time-work-experience' && s.active)}>
                            <div className="check">  
                                <Link to={"/part-time-work-experience"}>Трудовой стаж  <br/>(Работа по совместительству)</Link>
                                {answerList && 
                                answerList['part-time-work-experience'] && 
                                <FaCheck style={{fill:'green'}}/>}
                            </div>
                        </li>
                    }

                    <li className={classNames(s.navItem, (answerList && answerList['client-finance']) && s.fullfield, location.pathname === '/client-finance' && s.active)}>
                        <div className="check">   
                            <Link to={"/client-finance"}>Финансы</Link>
                            {answerList && 
                            answerList['client-finance'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['assets-Vehicle-1']) && s.fullfield, location.pathname === '/assets-Vehicle-1' && s.active)}>
                        <div className="check">                           
                            <Link to={"/assets-Vehicle-1"}>Транспортное средство</Link>
                            {answerList && 
                            answerList['assets-Vehicle-1'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['assets-immovables-1']) && s.fullfield, location.pathname === '/assets-immovables-1' && s.active)}>
                        <div className="check"> 
                            <Link to={"/assets-immovables-1"}>Недвижимость</Link>
                            {answerList && 
                            answerList['assets-immovables-1'] && 
                           <FaCheck style={{fill:'green'}}/>}
                         </div>
                    </li>

                    {
                        (answerList && answerList.immovablesType2) &&
                        <li className={classNames(s.navItem, (answerList && answerList['assets-immovables-2']) && s.fullfield, location.pathname === '/assets-immovables-2' && s.active)}>
                            <div className="check"> 
                                <Link to={"/assets-immovables-2"}>Недвижимость #2</Link>
                                {answerList && 
                                answerList['assets-immovables-2'] && 
                            <FaCheck style={{fill:'green'}}/>}
                           </div>
                        </li>
                    }

                    {
                        (answerList && answerList.immovablesType3) &&
                        <li className={classNames(s.navItem, (answerList && answerList['assets-immovables-3']) && s.fullfield, location.pathname === '/assets-immovables-3' && s.active)}>
                            <div className="check"> 
                                <Link to={"/assets-immovables-3"}>Недвижимость #3</Link>
                                {answerList && 
                                answerList['assets-immovables-3'] && 
                                <FaCheck style={{fill:'green'}}/>}
                           </div>
                        </li>
                    }

                    {
                        (answerList && answerList.clientPartTimeJob) &&
                        <li className={classNames(s.navItem, (answerList && answerList['lph-data']) && s.fullfield, location.pathname === '/lph-data' && s.active)}>
                            <div className="check"> 
                                <Link to={"/lph-data"}>Личное подсобное хозяйство</Link>
                                {answerList && 
                                answerList['lph-data'] && 
                                <FaCheck style={{fill:'green'}}/>}
                           </div>
                        </li>
                    }

                    <li className={classNames(s.navItem, (answerList && answerList['other']) && s.fullfield, location.pathname === '/other' && s.active)}>
                        <div className="check">                
                            <Link to={"/other"}>Прочее</Link>
                            {answerList && 
                            answerList['other'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['additional-information']) && s.fullfield, location.pathname === '/additional-information' && s.active)}>
                        <div className="check">                        
                            <Link to={"/additional-information"}>Доп. информация</Link>
                            {answerList && 
                            answerList['additional-information'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['upload-files']) && s.fullfield, location.pathname === '/upload-files' && s.active)}>
                        <div className="check">  
                            <Link to={"/upload-files"}>Приложить файлы</Link>
                            {answerList && 
                            answerList['upload-files'] && 
                            <FaCheck style={{fill:'green'}}/>}
                        </div>
                    </li>

                    <li className={classNames(s.navItem, (answerList && answerList['additional-information']) && s.fullfield)}>
                        <span onClick={onClickDownloadAnket}>{isLoadingDownloadAnket ? "Загрузка..." : "Скачать анкету"}</span>
                    </li>
                </ul>
            </nav>

            <footer className={s.footer}>
                <div className={s.btn}>
                    <button onClick={onClickCloseBtnHandler}>Отменить заполнение</button>
                </div>
            </footer>
        </aside>
    );
};

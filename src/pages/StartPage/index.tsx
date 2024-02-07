import s from './index.module.scss';
import classNames from "classnames";
import {useEffect, useMemo, useState} from "react";
import {RadioButton} from "../../ui/RadioButton";
import {TextInput} from "../../ui/TextInput";
import {Button} from "../../ui/Button";
import {useNavigate, useParams} from "react-router-dom";
import {baseUrl} from "../../common/config";
import {useAppSelector} from "../../helpers/reduxHook";
import {AnswerState} from "../../store/reducers/answer.reducer";
import {isAllOf} from "@reduxjs/toolkit";
import Skeleton from "../../ui/Skeleton";
import Img from '../../common/assets/images/img.png'

export const StartPage = () => {
    const navigate = useNavigate();
    const {deal_id} = useParams()

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isOpenFirstBlock, setIsOpenFirstBlock] = useState<boolean>(false);
    const [isOpenSecondBlock, setIsOpenSecondBlock] = useState<boolean>(false);

    const onClickNextButtonHandler = async () => {
        setIsLoading(true)
        localStorage.setItem('id', Date.now().toString())
        if (deal_id) localStorage.setItem('deal_id', deal_id)
        await fetch(`${baseUrl}/edit?identifier=${localStorage.getItem('id')}&deal_id=${deal_id ?? ''}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).finally(() => {
            setIsLoading(false)
        })
        localStorage.setItem('all-in-form', 'true')
        navigate('/all-in-form')
    }

    const onClickMyselfButtonHandler = async () => {
        setIsLoading(true)
        localStorage.setItem('id', Date.now().toString())
        const params = {
            deal_id: deal_id ?? '',
            myself: true,
        }
        // @ts-ignore
        const urlParams = new URLSearchParams(params).toString()
        const response = await fetch(`${baseUrl}/edit?identifier=${localStorage.getItem('id')}&${urlParams}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).finally(() => {
            setIsLoading(false)
        })
        localStorage.setItem('myself', 'true')
        navigate('/role')
    }
    
    return (
        /*<div className={classNames(s.RolePage)}>
            <h1 className={classNames(s.title)}>Заполнить анкету</h1>
            <div className={classNames(s.main)}></div>
            <div className={s.controls}>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Под ключ</Button>
                <Button onClick={onClickMyselfButtonHandler} disabled={isDisabled} isLoading={isLoading}>Всё сам</Button>
            </div>
        </div>*/
        <div className={s.StartPageWrapper}>
            <div className={s.firstBlockWrapper}>
                <div className={s.imgBox}>
                    <img src={Img} alt=""/>
                </div>
                <div className={s.contentBox}>
                    <div className={s.titleWrapper}>
                        <h1 className={s.title}>Анкета</h1>
                        <h2 className={s.subtitle}>для подачи ипотечной заявки</h2>
                        <p className={s.paragraph}>Подайте документы сразу во все ключевые банки через онлайн сервис ипотечных брокеров</p>
                    </div>
                    <div className={s.optionTitle}>
                        ВЫБЕРИТЕ ОПЦИЮ
                    </div>
                </div>
            </div>

            <div className={s.StartPage}>

                <div className={s.boxWrapper}>
                    {isLoading && <Skeleton/>}
                    <div className={s.header}>
                        <span className={s.title}>всё включено</span>
                        <div className={classNames(s.collapse, isOpenFirstBlock && s.active)} onClick={() => setIsOpenFirstBlock(!isOpenFirstBlock)}>
                            {!isOpenFirstBlock ? "что входит?" : "свернуть"}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                className="icon"
                                viewBox="0 0 1024 1024"
                                fill="#222222"
                            >
                                <path d="M903.232 256L960 306.432 512 768 64 306.432 120.768 256 512 659.072z"></path>
                            </svg>
                        </div>
                    </div>
                    {
                        isOpenFirstBlock &&
                        <div className={s.main}>
                            <div className={s.wrapper}>
                                <strong>От вас потребуется:</strong>
                                <p>• Достаточно предоставить только номер телефона клиента для связи</p>
                            </div>
                            <div className={s.wrapper}>
                                <strong>От ипотечного брокера:</strong>
                                <p>✔ Качественный подбор продукта под любые объекты недвижимости</p>
                                <p>✔ Профессиональная консультация по услугам банка</p>
                                <p>✔ Быстрая подача заявки с высокой вероятностью одобрения</p>
                                <p>✔ Подаем заявки сразу в несколько банков</p>
                                <p>✔ Способствуем ускорению принятия решений и увеличению суммы кредита</p>
                                <p>✔ Прямое взаимодействия с менеджерами банка (мы отправим документы за вас)</p>
                                <p>✔ Ускоренный процесс выхода на сделку</p>
                                <p>✔ Получение доп. вознаграждения за ипотечный кредит</p>
                                <p>✔ Выгодные процентные ставки, возможность одобрить клиента от 0,5% на весь срок кредитования</p>
                                <p>✔ Работаем с любым клиентом</p>
                            </div>
                        </div>
                    }
                    <div className={s.footer}>
                        {/*<Button onClick={() => {}}>Выбрать</Button>*/}
                        <button className={s.selectBtn} onClick={onClickNextButtonHandler}>Выбрать</button>
                    </div>
                </div>
                <div className={s.boxWrapper}>
                    {isLoading && <Skeleton/>}
                    <div className={s.header}>
                        <span className={s.title}>ВСЁ САМ</span>
                        <div className={classNames(s.collapse, isOpenSecondBlock && s.active)} onClick={() => setIsOpenSecondBlock(!isOpenSecondBlock)}>
                            {!isOpenSecondBlock ? "что входит?" : "свернуть"}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                className="icon"
                                viewBox="0 0 1024 1024"
                                fill="#222222"
                            >
                                <path d="M903.232 256L960 306.432 512 768 64 306.432 120.768 256 512 659.072z"></path>
                            </svg>
                        </div>
                    </div>
                    {
                        isOpenSecondBlock &&
                        <div className={s.main}>
                            <div className={s.wrapper}>
                                <strong>От вас потребуется:</strong>
                                <p>• Обсудить с клиентом ипотечные программы</p>
                                <p>• Уточнить параметры кредита</p>
                                <p>• Узнать портрет заемщика</p>
                                <p>• Продумать хорошее предложение по одобрению</p>
                                <p>• Собрать пакет документов для банка по заявке</p>
                                <p>• После одобрения регулярно звонить менеджеру банка для уточнения информации (менеджеры часто бывают на сделках и не берут трубку)</p>
                                <p>• Заниматься пересылкой документов, осуществлять доработки по рассмотрению объекта недвижимости</p>
                                <p>• Решать форс-мажорные ситуации</p>
                                <p>• После одобрения согласовывать время и место (как правило, +3 дня после одобрения)</p>
                                <p>• Самому отслеживать заказ денег и услуг под сделку</p>
                            </div>
                            <div className={s.wrapper}>
                                <strong>От ипотечного брокера:</strong>
                                <p>✔ Предоставление документов в банк</p>
                            </div>
                        </div>
                    }
                    <div className={s.footer}>
                        {/*<Button onClick={() => {}}>Выбрать</Button>*/}
                        <button className={s.selectBtn} onClick={onClickMyselfButtonHandler}>Выбрать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

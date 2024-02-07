import s from './index.module.scss';
import {useEffect, useMemo, useRef, useState} from "react";
import {FileImporter} from "sass";
import {baseUrl} from "../../common/config";
import classNames from "classnames";
import {Button} from "../../ui/Button";
import {useNavigate} from "react-router-dom";
import Skeleton from "../../ui/Skeleton";
import {FieldWrapper} from "../../ui/FieldWrapper";
import {RadioButton} from "../../ui/RadioButton";
import {useAppSelector} from "../../helpers/reduxHook";
import {AnswerState} from "../../store/reducers/answer.reducer";

export const OtherPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [insuranceConditions, setInsuranceConditions] = useState<null | string>('');
    const [executive, setExecutive] = useState<null | string>('');
    const [bankrupt, serBankrupt] = useState<null | string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setInsuranceConditions(answerList.insuranceConditions ?? '')
            setExecutive(answerList.executive ?? '')
            serBankrupt(answerList.bankrupt ?? '')
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const setInsuranceConditionsHandler = (str: string | null) => {
        setInsuranceConditions(str)
    }
    const setExecutiveHandler = (str: string | null) => {
        setExecutive(str)
    }
    const setBankruptHandler = (str: string | null) => {
        serBankrupt(str)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            insuranceConditions: insuranceConditions,
            executive: executive,
            bankrupt: bankrupt,
        }

        // @ts-ignore
        const urlParams = new URLSearchParams(params).toString()

        try {
            setIsLoading(true)
            const response = await fetch(`${baseUrl}/edit?identifier=${localStorage.getItem('id')}&${urlParams}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            navigate('/additional-information')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        // if (answerList.)
        // (answerList && answerList.immovablesType3) ? navigate('/lph-data') : (answerList && answerList.immovablesType3)
        // else navigate('/assets-immovables-1')
        (answerList && answerList.clientPartTimeJob) ? navigate('/lph-data') : navigate('/assets-immovables-1')
    }

    return (
        <div className={s.OtherPage}>
            { isLoading && <Skeleton/> }
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Прочее</h1>

                <div className={`${s.main} contentMain`}>
                    <FieldWrapper>
                        <p className={s.fieldTitle}>Условия страхования</p>
                        <FieldWrapper>
                            <RadioButton currentValue={insuranceConditions} id={'1'} name={'insuranceConditions'} value={"Полный пакет (Выгодный процент по ипотеке)"} onChange={setInsuranceConditionsHandler}/>
                            <div className={s.textBox}>
                                <p>- риск утраты жизни и трудоспособности Заемщика</p>
                                <p>- риск прекращения и ограничения права собственности на объект недвижимости (при необходимости)</p>
                                <p>- риск утраты (гибели) и повреждения объекта едвижимости, передаваемого в залог (ипотеку)</p>
                            </div>
                        </FieldWrapper>
                        <FieldWrapper>
                            <RadioButton currentValue={insuranceConditions} id={'2'} name={'insuranceConditions'} value={"Обязательный пакет"} onChange={setInsuranceConditionsHandler}/>
                            <div className={s.textBox}>
                                <p>- риск утраты (гибели) и повреждения объекта недвижимости, передаваемого в залог (ипотеку) по получаемому кредиту</p>
                            </div>
                        </FieldWrapper>
                    </FieldWrapper>

                    <FieldWrapper>
                        <FieldWrapper><p className={s.fieldTitle}>Заверения</p></FieldWrapper>
                        {/*<br/>*/}
                        <FieldWrapper>
                            <RadioButton currentValue={executive} id={'3'} name={'executive'} value={"Не являюсь"} onChange={setExecutiveHandler}/>
                            <RadioButton currentValue={executive} id={'4'} name={'executive'} value={"Являюсь (и обязуюсь заполнить приложение по форме Банка)"} onChange={setExecutiveHandler}/>
                            <div className={s.textBox}>
                                <p>
                                    иностранным публичным должностным лицом; Российским публичным
                                    должностным лицом; Должностным лицом публичной международной
                                    организации; не занимаю должности в законодательном, исполнительном,
                                    административном, судебном органе РФ или других странах; должности
                                    в Банке России, члена Совета директоров Банка России; государственных
                                    корпорациях и иных организациях, созданных РФ на основании федеральных
                                    законов или родственником такого лица.
                                </p>
                            </div>
                        </FieldWrapper>
                        <hr/>
                        <FieldWrapper>
                            <RadioButton currentValue={bankrupt} id={'5'} name={'bankrupt'} value={"Не нахожусь"} onChange={setBankruptHandler}/>
                            <RadioButton currentValue={bankrupt} id={'6'} name={'bankrupt'} value={"Нахожусь"} onChange={setBankruptHandler}/>
                            <div className={s.textBox}>
                                <p>
                                    на стадии подачи заявления о признании себя банкротом (либо не планирую инициировать подачу такого заявления), а также не имеется основания для подачи заявлений признании меня банкротом у третьих лиц.
                                </p>
                            </div>
                        </FieldWrapper>
                    </FieldWrapper>
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

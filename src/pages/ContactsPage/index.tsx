import s from './index.module.scss';
import classNames from "classnames";
import {useEffect, useMemo, useState} from "react";
import {RadioButton} from "../../ui/RadioButton";
import {TextInput} from "../../ui/TextInput";
import {Button} from "../../ui/Button";
import {useNavigate} from "react-router-dom";
import {baseUrl} from "../../common/config";
import {useAppSelector} from "../../helpers/reduxHook";
import {AnswerState} from "../../store/reducers/answer.reducer";

export const ContactsPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [clientEmail, setClientEmail] = useState<string | null>(null);
    const [clientPhoneNumber, setClientPhoneNumber] = useState<string | null>(null);
    const [clientHomePhoneNumber, setClientPhoneHomeNumber] = useState<string | null>(null);
    const [clientSnils, setClientSnils] = useState<string | null>(null);
    const [clientINN, setClientINN] = useState<string | null>(null);
    const [relativeNameAndPhoneNumber, setRelativeNameAndPhoneNumber] = useState<string | null>(null);
    const [clientDriverLicense, setDriverLicense] = useState<string | null>(null);
    const [clientInternationalPassport, setInternationalPassport] = useState<string | null>(null);
    const [clientMilitaryID, setMilitaryID] = useState<string | null>(null);

    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setClientEmail(answerList.clientEmail || null)
            setClientPhoneNumber(answerList.clientPhoneNumber || null)
            setClientPhoneHomeNumber(answerList.clientHomePhoneNumber || null)
            setClientSnils(answerList.clientSnils || null)
            setClientINN(answerList.clientINN || null)
            setRelativeNameAndPhoneNumber(answerList.relativeNameAndPhoneNumber || null)
            setDriverLicense(answerList.clientDriverLicense || null)
            setInternationalPassport(answerList.clientInternationalPassport || null)
            setMilitaryID(answerList.clientMilitaryID || null)
        }
    }, [answerList])

    const setClientEmailHandler = (str: string | null) => {
        setClientEmail(str)
    }
    const setClientPhoneNumberHandler = (str: string | null) => {
        setClientPhoneNumber(str)
    }
    const setClientPhoneHomeNumberHandler = (str: string | null) => {
        setClientPhoneHomeNumber(str)
    }
    const setClientSnilsHandler = (str: string | null) => {
        setClientSnils(str)
    }
    const setClientINNHandler = (str: string | null) => {
        setClientINN(str)
    }
    const setRelativeNameAndPhoneNumberHandler = (str: string | null) => {
        setRelativeNameAndPhoneNumber(str)
    }
    const setDriverLicenseHandler = (str: string | null) => {
        setDriverLicense(str)
    }
    const setInternationalPassportHandler = (str: string | null) => {
        setInternationalPassport(str)
    }
    const setMilitaryIDHandler = (str: string | null) => {
        setMilitaryID(str)
    }


    const onClickNextButtonHandler = async () => {
        const params = {
            clientEmail: clientEmail,
            clientPhoneNumber: clientPhoneNumber,
            clientHomePhoneNumber: clientHomePhoneNumber,
            clientSnils: clientSnils,
            clientINN: clientINN,
            relativeNameAndPhoneNumber: relativeNameAndPhoneNumber,
            clientDriverLicense: clientDriverLicense,
            clientInternationalPassport: clientInternationalPassport,
            clientMilitaryID: clientMilitaryID
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
            navigate('/employment-info')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useMemo(() => {
        if (clientSnils || clientINN) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [clientSnils, clientINN])

    return (
        <div className={classNames(s.RolePage)}>
            <h1 className={classNames(s.title)}>Контакты и документы</h1>
            <div className={classNames(s.main)}>
                <TextInput onChange={setClientEmailHandler} currentValue={clientEmail} title={"Электронная почта"}/>
                <TextInput onChange={setClientPhoneNumberHandler} currentValue={clientPhoneNumber} title={"Мобильный телефон"}/>
                <TextInput onChange={setClientPhoneHomeNumberHandler} currentValue={clientHomePhoneNumber} title={"Стационарный телефон"}/>
                <TextInput onChange={setClientSnilsHandler} currentValue={clientSnils} title={"СНИЛС"}/>
                <TextInput onChange={setClientINNHandler} currentValue={clientINN} title={"ИНН (Обязательно при отсутствии СНИЛС)"}/>
                <TextInput onChange={setRelativeNameAndPhoneNumberHandler} currentValue={relativeNameAndPhoneNumber} title={"Телефон и имя родственника"}/>
                <p>Дополнительный документ</p>
                <TextInput onChange={setDriverLicenseHandler} currentValue={clientDriverLicense} title={"Водительское удостоверение"}/>
                <TextInput onChange={setInternationalPassportHandler} currentValue={clientInternationalPassport} title={"Заграничный паспорт"}/>
                <TextInput onChange={setMilitaryIDHandler} currentValue={clientMilitaryID} title={"Военный билет"}/>
            </div>
            <div>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

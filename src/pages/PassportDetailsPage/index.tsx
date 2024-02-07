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
import Checkbox from "../../ui/Checkbox";
import {DateInput} from "../../ui/DateInput";

export const PassportDetailsPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [passport, setPassport] = useState<null | string>(null);
    const [passportDateOfIssue, setPassportDateOfIssue] = useState<null | number>(null);
    const [departmentCode, setDepartmentCode] = useState<null | string>(null);
    const [issuedByWhom, setIssuedByWhom] = useState<null | string>(null);
    const [registrationAddress, setRegistrationAddress] = useState<null | string>(null);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setPassport(answerList.passport)
            setPassportDateOfIssue(answerList.passportDateOfIssue)
            setDepartmentCode(answerList.departmentCode)
            setIssuedByWhom(answerList.issuedByWhom)
            setRegistrationAddress(answerList.registrationAddress)
        }
    }, [answerList])

    const setPassportHandler = (str: string | null) => {
        setPassport(str)
    }
    const setPassportDateOfIssueHandler = (value: number | null) => {
        setPassportDateOfIssue(value)
    }
    const setDepartmentCodeHandler = (str: string | null) => {
        setDepartmentCode(str)
    }
    const setIssuedByWhomHandler = (str: string | null) => {
        setIssuedByWhom(str)
    }
    const setRegistrationAddressHandler = (str: string | null) => {
        setRegistrationAddress(str)
    }

    const onClickSkipButtonHandler = () => {
        navigate('/upload-files')
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            passport: passport,
            passportDateOfIssue: passportDateOfIssue,
            departmentCode: departmentCode,
            issuedByWhom: issuedByWhom,
            registrationAddress: registrationAddress
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
            navigate('/upload-files')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={classNames(s.RolePage)}>
            <h1 className={classNames(s.title)}>Паспортные данные</h1>
            <div className={classNames(s.main)}>
                <TextInput onChange={setPassportHandler} currentValue={passport} title={"паспорт (серия, номер)"}/>
                <TextInput onChange={setDepartmentCodeHandler} currentValue={departmentCode} title={"код подразделения"}/>
                <TextInput onChange={setIssuedByWhomHandler} currentValue={issuedByWhom} title={"кем выдан"}/>
                <TextInput onChange={setRegistrationAddressHandler} currentValue={registrationAddress} title={"зарегистрирован(-а) по адресу"}/>
                <DateInput onChange={setPassportDateOfIssueHandler} currentValue={passportDateOfIssue ? +passportDateOfIssue : 0} title={"дата выдачи"}/>
            </div>
            <div className={classNames(s.btnList)}>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
                {/*<Button onClick={onClickSkipButtonHandler} mods={"grey"}>Пропустить</Button>*/}
            </div>
        </div>
    );
};

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
import {FieldWrapper} from "../../ui/FieldWrapper";
import {TelInput} from "../../ui/TelInput";
import {TextArea} from "../../ui/TextArea";

export const AllInPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    // const [role, setRole] = useState<null | string>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        // if (!localStorage.getItem('myself')) navigate('/')
        if (!localStorage.getItem('id')) navigate('/')
        if (localStorage.getItem('myself')) navigate('/')
    }, []);

    useEffect(() => {
        if (answerList) {
            answerList.allInPhoneNumber ? setPhoneNumber(answerList.allInPhoneNumber) : setPhoneNumber('');
            answerList.allInDescription ? setDescription(answerList.allInDescription) : setDescription('');            
        }
    }, [answerList]);

    useEffect(() => {if(phoneNumber !== '' && description !=='') {setIsDisabled(false)} else {setIsDisabled(true)};      
    }, [phoneNumber, description]);

    const setPhoneNumberHandler = (name: string) => {
        setPhoneNumber(name);
    }

    const setDescriptionHandler = (str: string) => {
        setDescription(str);
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            allInPhoneNumber: phoneNumber ?? '',
            allInDescription: description ?? ''
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
            navigate('/success')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={`${classNames(s.title)} contentTitle`}>Заполните данные</h1>
                <div className={`${classNames(s.main)} contentMain`}>
                    <FieldWrapper>
                        <TelInput title={"Номер телефона"} currentValue={phoneNumber} onChange={setPhoneNumberHandler}/>
                    </FieldWrapper>
                    <FieldWrapper>
                        <TextArea placeholder={"Описание"} currentValue={description} onChange={setDescriptionHandler}/>
                    </FieldWrapper>
                </div>
            </div>

            <div className={s.btns}>
                <div></div>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Отправить</Button>
            </div>
        </div>
    );
};

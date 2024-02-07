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
import {FinancePage} from "../FinancePage";
import {FieldWrapper} from "../../ui/FieldWrapper";
import {TextArea} from "../../ui/TextArea";

export const AdditionalInformationPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [additionalInformation, setAdditionalInformation] = useState<string>('');

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setAdditionalInformation(answerList.additionalInformation ?? '')
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const setAdditionalInformationHandler = (name: string) => {
        setAdditionalInformation(name)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            additionalInformation: additionalInformation,
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

    const onClickPrevBtnHandler = () => {
        navigate('/other')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Дополнительная информация</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <FieldWrapper>
                        <TextArea onChange={setAdditionalInformationHandler} currentValue={additionalInformation} placeholder={"Свободный текст"}/>
                    </FieldWrapper>
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

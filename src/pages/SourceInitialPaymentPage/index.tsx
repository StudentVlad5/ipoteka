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

export const SourceInitialPaymentPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [sourceInitialPayment, setSourceInitialPayment] = useState<null | string>('')

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setSourceInitialPayment(answerList.sourceInitialPayment)
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    /*useMemo(() => {
        if (incomeProof) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [incomeProof])*/

    const setSourceInitialPaymentHandler = (str: string | null) => {
        setSourceInitialPayment(str)
    }
    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            sourceInitialPayment: sourceInitialPayment ?? '',
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
            navigate('/additional-conditions')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/income-proof')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Источник первоначального взноса</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <FieldWrapper><RadioButton id={"1"} name={"source"} value={"Накопления"} currentValue={sourceInitialPayment} onChange={setSourceInitialPaymentHandler}/></FieldWrapper>
                    <FieldWrapper><RadioButton id={"2"} name={"source"} value={"Продажа недвижимости"} currentValue={sourceInitialPayment} onChange={setSourceInitialPaymentHandler}/></FieldWrapper>
                    <FieldWrapper><RadioButton id={"3"} name={"source"} value={"Помощь родственников"} currentValue={sourceInitialPayment} onChange={setSourceInitialPaymentHandler}/></FieldWrapper>
                    <TextInput title={"Другой:"} onChange={setSourceInitialPaymentHandler} currentValue={(sourceInitialPayment !== 'Накопления' && sourceInitialPayment !== 'Помощь родственников' && sourceInitialPayment !== 'Продажа недвижимости') ? sourceInitialPayment : ''}></TextInput>
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

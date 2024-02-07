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

export const SalerPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);
    const [seller, setSeller] = useState<null | string>(null);

    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setSeller(answerList.objectSeller)
        }
    }, [answerList])

    useMemo(() => {
        if (seller) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [seller])

    const setSalerHandler = (str: string | null) => {
        setSeller(str)
    }

    const onClickNextButtonHandler = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${baseUrl}/edit?identifier=${localStorage.getItem('id')}&objectSeller=${seller}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            navigate('/credit-info')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={classNames(s.RolePage)}>
            <h1 className={classNames(s.title)}>Компания-продавец объекта</h1>
            <div className={classNames(s.main)}>
                <FieldWrapper>
                    <TextInput onChange={setSalerHandler} title={"(Девелопер, Агентство Недвижимости)"} currentValue={seller}/>
                </FieldWrapper>
            </div>
            <div>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

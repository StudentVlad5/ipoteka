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
import { FaAsterisk } from "react-icons/fa6";

export const ProofIncomePage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [incomeProof, setIncomeProof] = useState<null | string>('')
    // const [incomeProof1, setIncomeProof1] = useState<null | string>(null)
    // const [incomeProof2, setIncomeProof2] = useState<null | string>(null)
    // const [incomeProof3, setIncomeProof3] = useState<null | string>(null)
    // const [incomeProof4, setIncomeProof4] = useState<null | string>(null)
    // const [incomeProof5, setIncomeProof5] = useState<null | string>(null)
    // const [incomeProof6, setIncomeProof6] = useState<null | string>(null)
    // const [incomeProof7, setIncomeProof7] = useState<null | string>(null)

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setIncomeProof(answerList.incomeProof)
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

    const setIncomeProofHandler = (str: string | null) => {
        setIncomeProof(str)
    }

    /*const setIncomeProof1Handler = (name: string | null) => {
        setIncomeProof1(name)
    }
    const setIncomeProof2Handler = (name: string | null) => {
        setIncomeProof2(name)
    }
    const setIncomeProof3Handler = (name: string | null) => {
        setIncomeProof3(name)
    }
    const setIncomeProof4Handler = (name: string | null) => {
        setIncomeProof4(name)
    }
    const setIncomeProof5Handler = (name: string | null) => {
        setIncomeProof5(name)
    }
    const setIncomeProof6Handler = (name: string | null) => {
        setIncomeProof6(name)
    }
    const setIncomeProof7Handler = (name: string | null) => {
        setIncomeProof7(name)
    }*/

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            incomeProof: incomeProof ?? ''
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
            navigate('/source-initial-payment')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/credit-info')
    }

    return (
        <div className={classNames(s.IncomeProofPage)}>
            <div className={s.mainContent}>
                <h1 className={`${classNames(s.title)} contentTitle`}>Подтверждение дохода {(incomeProof  !== "" && incomeProof  !== undefined && incomeProof !== null) ? <FaAsterisk style={{fill:'green', width: "15px", height:"15px", transform:"translateY(-10px)"}}/> : <FaAsterisk style={{fill:'grey', width: "15px", height:"15px", transform:"translateY(-10px)"}}/>}</h1>
                <div className={`${classNames(s.main)} contentMain`}>
                    <label htmlFor="incomeProof">
                        <RadioButton name={"incomeProof"}
                                     id={"1"}
                                     onChange={setIncomeProofHandler}
                                     value={"2-НДФЛ"} currentValue={incomeProof}/>
                        <RadioButton name={"incomeProof"}
                                     id={"2"}
                                     onChange={setIncomeProofHandler}
                                     value={"Выписка из ПФР"} currentValue={incomeProof}/>
                        <RadioButton name={"incomeProof"}
                                     id={"3"}
                                     onChange={setIncomeProofHandler}
                                     value={"Налоговая декларация"} currentValue={incomeProof}/>
                        <RadioButton name={"incomeProof"}
                                     id={"4"}
                                     onChange={setIncomeProofHandler}
                                     value={"Без подтверждения"} currentValue={incomeProof}/>
                        <RadioButton name={"incomeProof"}
                                     id={"5"}
                                     onChange={setIncomeProofHandler}
                                     value={"Справка о размере пенсии"} currentValue={incomeProof}/>
                        <RadioButton name={"incomeProof"}
                                     id={"6"}
                                     onChange={setIncomeProofHandler}
                                     value={"Справка по форме банка"} currentValue={incomeProof}/>
                        <RadioButton name={"incomeProof"}
                                     id={"7"}
                                     onChange={setIncomeProofHandler}
                                     value={"Выписка из похозяственной книги"} currentValue={incomeProof}/>
                    </label>
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

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

export const AdditionalConditionsPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [programType, setProgramType] = useState<null | string>('');
    const [additional1, setAdditional1] = useState<null | string>('');
    const [additional2, setAdditional2] = useState<null | string>('');

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setProgramType(answerList.programType ?? '')
            setAdditional1(answerList.additional1 ?? '')
            setAdditional2(answerList.additional2 ?? '')
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

/*    useMemo(() => {
        if (programType) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [programType])*/

    const setProgramTypeHandler = (name: string | null) => {
        setProgramType(name)
    }
    const setAdditional1Handler = (name: string | null) => {
        setAdditional1(name)
    }
    const setAdditional2Handler = (name: string | null) => {
        setAdditional2(name)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            programType: programType,
            additional1: additional1,
            additional2: additional2,
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
            navigate('/actual-address')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/source-initial-payment')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Тип программы</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <FieldWrapper>
                        <label htmlFor="programType">
                            <RadioButton name={"programType"}
                                         id={"1"}
                                         onChange={setProgramTypeHandler}
                                         value={"Стандартная"} currentValue={programType}/>
                            <RadioButton name={"programType"}
                                         id={"2"}
                                         onChange={setProgramTypeHandler}
                                         value={"По 2-м документам"} currentValue={programType}/>
                            <RadioButton name={"programType"}
                                         id={"3"}
                                         onChange={setProgramTypeHandler}
                                         value={"Семейная ипотека"} currentValue={programType}/>
                            <RadioButton name={"programType"}
                                         id={"4"}
                                         onChange={setProgramTypeHandler}
                                         value={"Военная ипотека"} currentValue={programType}/>
                            <RadioButton name={"programType"}
                                         id={"5"}
                                         onChange={setProgramTypeHandler}
                                         value={"Господдержка 2020"} currentValue={programType}/>
                        </label>
                    </FieldWrapper>
                    <FieldWrapper>
                        <FieldWrapper><p className={'bold'}>Доп. условия</p></FieldWrapper>
                        <label htmlFor="programType">
                            <RadioButton name={"stock"}
                                         id={"6"}
                                         onChange={setAdditional1Handler} currentValue={additional1}
                                         value={"Акции"} inputType={"checkbox"}/>
                        </label>

                        <label htmlFor="programType">
                            <RadioButton name={"stock"}
                                         id={"7"}
                                         onChange={setAdditional2Handler} currentValue={additional2}
                                         value={"Материнский капитал как первоначальный взнос"} inputType={"checkbox"}/>
                        </label>
                    </FieldWrapper>

                    {/*<p>Доп. условия</p>
                <label htmlFor="programType">
                    <RadioButton name={"stock"}
                                 id={"6"}
                                 onChange={setAdditional1Handler}
                                 value={"Акции"} inputType={"checkbox"}/>
                </label>
                <label htmlFor="programType">
                    <RadioButton name={"stock"}
                                 id={"7"}
                                 onChange={setAdditional1Handler}
                                 value={"Материнский капитал как первоначальный взнос"} inputType={"checkbox"}/>
                </label>*/}
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

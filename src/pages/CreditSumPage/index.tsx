import s from './index.module.scss';
import classNames from "classnames";
import {useEffect, useMemo, useState} from "react";
import {RadioButton} from "../../ui/RadioButton";
import {TextInput} from "../../ui/TextInput";
import {Button} from "../../ui/Button";
import {useNavigate} from "react-router-dom";
import {baseUrl} from "../../common/config";
import {FieldWrapper} from "../../ui/FieldWrapper";
import {NumberInput} from "../../ui/NumberInput";
import {useAppSelector} from "../../helpers/reduxHook";
import {AnswerState} from "../../store/reducers/answer.reducer";

export const CreditSumPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [appartCost, setAppartCost] = useState<null | string>('');
    const [initialPayment, setInitialPayment] = useState<null | string>('');
    const [creditSum, setCreditSum] = useState<null | string>('');
    const [subsidies, setSubsidies] = useState<null | string | boolean>('');
    const [subsidiesAmount, setSubsidiesAmount] = useState<null | string>('');
    const [matCapital, setMatCapital] = useState<null | string | boolean>(null);
    const [matCapitalAmount, setMatCapitalAmount] = useState<null | string>('');
    const [creditTerm, setCreditTerm] = useState<null | string>('');
    const [paymentDate, setPaymentDate] = useState<null | string>('');
    const [paymentType, setPaymentType] = useState<null | string>('');

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setAppartCost(answerList.appartCost || '')
            setInitialPayment(answerList.initialPayment || '')
            setCreditSum(answerList.creditSum || '')
            setSubsidies(answerList.subsidiesAmount ? 'Используются субсидии' : false)
            setSubsidiesAmount(answerList.subsidiesAmount || '')
            setMatCapital(answerList.matCapitalAmount ? "Используется материнский капитал" : false)
            setMatCapitalAmount(answerList.matCapitalAmount || '')
            setCreditTerm(answerList.creditTerm || '')
            setPaymentDate(answerList.paymentDate || '')
            setPaymentType(answerList.paymentType || '')
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const setAppartCostHandler = (str: string | null) => {
        setAppartCost(str)
    }
    const setInitialPaymentHandler = (str: string | null) => {
        setInitialPayment(str)
    }
    const setCreditSumHandler = (str: string | null) => {
        setCreditSum(str)
    }
    const setSubsidiesHandler = (str: string | null) => {
        setSubsidies(str)
    }
    const setSubsidiesAmountHandler = (str: string | null) => {
        setSubsidiesAmount(str)
    }
    const setMatCapitalHandler = (str: string | null) => {
        setMatCapital(str)
    }
    const setMatCapitalAmountHandler = (str: string | null) => {
        setMatCapitalAmount(str)
    }
    const setCreditTermHandler = (str: string | null) => {
        setCreditTerm(str)
    }
    const setPaymentDateHandler = (str: string | null) => {
        setPaymentDate(str)
    }
    const setPaymentTypeHandler = (str: string | null) => {
        setPaymentType(str)
    }

    const onClickNextButtonHandler = async () => {

        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            appartCost: appartCost,
            initialPayment: initialPayment,
            creditSum: creditSum,
            subsidiesAmount: (subsidies && subsidiesAmount) ? subsidiesAmount : '',
            matCapitalAmount: (matCapital && matCapitalAmount) ? matCapitalAmount : '',
            creditTerm: creditTerm,
            paymentDate: paymentDate,
            paymentType: paymentType
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
            navigate('/income-proof')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    /*useMemo(() => {
        if (role !== "Созаёмщик") {
            setName(null)
            setDegree(null)
        }
    }, [role])*/

    const onClickPrevBtnHandler = () => {
        navigate('/region')
    }

    return (
        <div className={classNames(s.CreditSumPage)}>
            <div className={s.mainContent}>
                <h1 className={`${classNames(s.title)} contentTitle`}>Информация о кредите</h1>
                <div className={`${classNames(s.main)} contentMain`}>
                    <FieldWrapper><NumberInput onChange={setAppartCostHandler} currentValue={appartCost} title={"Стоимость квартиры \u20bd"}></NumberInput></FieldWrapper>
                    <FieldWrapper><NumberInput onChange={setInitialPaymentHandler} currentValue={initialPayment} title={"Первоначальный взнос \u20bd"}></NumberInput></FieldWrapper>
                    <FieldWrapper><NumberInput onChange={setCreditSumHandler} currentValue={creditSum} title={"Сумма кредита \u20bd"}></NumberInput></FieldWrapper>
                    <FieldWrapper>
                        <RadioButton name={"subcidies"}
                                     id={"1"}
                                     onChange={setSubsidiesHandler}
                                     currentValue={subsidies}
                                     value={"Используются субсидии"}
                                     isDropdown={true}
                                     inputType={"checkbox"}
                                     children={
                                         <div>
                                             <NumberInput title={"Размер субсидий \u20bd:"} currentValue={subsidiesAmount} onChange={setSubsidiesAmountHandler}/>
                                         </div>}/>
                    </FieldWrapper>
                    <FieldWrapper>
                        <RadioButton name={"matCapital"}
                                     id={"2"}
                                     onChange={setMatCapitalHandler}
                                     currentValue={matCapital}
                                     value={"Используется материнский капитал"}
                                     isDropdown={true}
                                     inputType={"checkbox"}
                                     children={
                                         <div>
                                             <NumberInput title={"Размер мат. капитала \u20bd:"} currentValue={matCapitalAmount} onChange={setMatCapitalAmountHandler}/>
                                         </div>}/>
                    </FieldWrapper>
                    <FieldWrapper><NumberInput currentValue={creditTerm} onChange={setCreditTermHandler} title={"Срок кредита (месяцев)"} mods={"small"}/></FieldWrapper>
                    <FieldWrapper><NumberInput currentValue={paymentDate} onChange={setPaymentDateHandler} title={"Удобная дата платежа (число месяца)"} mods={"small"}/></FieldWrapper>

                    <label htmlFor="paymentType" className={s.paymentType}>
                        <p className={'bold'}>Вид платежа</p>
                        <RadioButton name={"paymentType"}
                                     id={"pt1"}
                                     onChange={setPaymentTypeHandler}
                                     currentValue={paymentType}
                                     value={"Аннуитетный"}/>
                        <RadioButton name={"paymentType"}
                                     id={"pt2"}
                                     onChange={setPaymentTypeHandler}
                                     currentValue={paymentType}
                                     value={"Дифференцированный"}/>
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

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
import {types} from "sass";
import Number = types.Number;
import {FieldWrapper} from "../../ui/FieldWrapper";

export const FinancePage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [sumIncome, setSumIncome] = useState<null | string>('');
    const [amountPension, setAmountPension] = useState<null | string>('');
    const [amountBasicIncome, setAmountBasicIncome] = useState<null | string>('');
    const [amountPartTimeIncome, setAmountPartTimeIncome] = useState<null | string>('');
    const [amountAdditionalIncome, setAmountAdditionalIncome] = useState<null | string>('');
    const [sourceAdditionalIncome, setSourceAdditionalIncome] = useState<null | string>('');

    const [sumExpenses, setSumExpenses] = useState<null | string>('');
    const [amountCredit, setAmountCredit] = useState<null | string>('');
    const [amountAliment, setAmountAliment] = useState<null | string>('');
    const [amountAdditionalExpenses, setAmountAdditionalExpenses] = useState<null | string>('');
    const [sourceAdditionalExpenses, setSourceAdditionalExpenses] = useState<null | string>('');


    const [isOpenAdditionalIncome, setIsOpenAdditionalIncome] = useState<boolean>(false);
    const [isOpenAdditionalExpenses, setIsOpenAdditionalExpenses] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setSumExpenses(answerList.sumExpenses ?? '')
            setSumIncome(answerList.sumIncome ?? '')
            setAmountPension(answerList.amountPension ?? '')
            setAmountBasicIncome(answerList.amountBasicIncome ?? '')
            setAmountPartTimeIncome(answerList.amountPartTimeIncome ?? '')
            setAmountAdditionalIncome(answerList.amountAdditionalIncome ?? '')
            setSourceAdditionalIncome(answerList.sourceAdditionalIncome ?? '')

            setAmountCredit(answerList.amountCredit ?? '')
            setAmountAliment(answerList.amountAliment ?? '')
            setAmountAdditionalExpenses(answerList.amountAdditionalExpenses ?? '')
            setSourceAdditionalExpenses(answerList.sourceAdditionalExpenses ?? '')
            setSumExpenses(answerList.sumExpenses ?? '')
            setIsOpenAdditionalIncome(answerList.amountAdditionalIncome || sourceAdditionalIncome)
            setIsOpenAdditionalExpenses(answerList.amountAdditionalExpenses || answerList.sourceAdditionalExpenses)
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    /*useMemo(() => {

    }, [amountPension, amountBasicIncome, amountPartTimeIncome, amountAdditionalIncome])*/

    const setIsOpenAdditionalExpensesHandler = (value: boolean) => {
        setIsOpenAdditionalExpenses(value)
    }
    const setIsOpenAdditionalIncomeHandler = (value: boolean) => {
        setIsOpenAdditionalIncome(value)
    }
    const setSumExpensesHandler = (str: null | string) => {
        setSumExpenses(str)
    }
    const setAmountCreditHandler = (str: null | string) => {
        setAmountCredit(str)
    }
    const setAmountAlimentHandler = (str: null | string) => {
        setAmountAliment(str)
    }
    const setAmountAdditionalExpensesHandler = (str: null | string) => {
        setAmountAdditionalExpenses(str)
    }
    const setSourceAdditionalExpensesHandler = (str: null | string) => {
        setSourceAdditionalExpenses(str)
    }

    const setSumIncomeHandler = (str: null | string) => {
        setSumIncome(str)
    }
    const setAmountBasicIncomeHandler = (str: null | string) => {
        setAmountBasicIncome(str)
    }
    const setAmountPensionHandler = (str: null | string) => {
        setAmountPension(str)
    }
    const setAmountPartTimeIncomeHandler = (str: null | string) => {
        setAmountPartTimeIncome(str)
    }
    const setAmountAdditionalIncomeHandler = (str: null | string) => {
        setAmountAdditionalIncome(str)
    }
    const setSourceAdditionalIncomeHandler = (str: null | string) => {
        setSourceAdditionalIncome(str)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            sumIncome: sumIncome,
            amountPension: amountPension,
            amountBasicIncome: amountBasicIncome,
            amountPartTimeIncome: amountPartTimeIncome,
            amountAdditionalIncome: (amountAdditionalIncome && isOpenAdditionalIncome) ? amountAdditionalIncome  : '',
            sourceAdditionalIncome: (sourceAdditionalIncome && isOpenAdditionalIncome) ? sourceAdditionalIncome : '',
            amountCredit: amountCredit,
            amountAliment: amountAliment,
            amountAdditionalExpenses: (amountAdditionalExpenses && isOpenAdditionalExpenses) ? amountAdditionalExpenses : '',
            sourceAdditionalExpenses: (sourceAdditionalExpenses && isOpenAdditionalExpenses) ? sourceAdditionalExpenses : '',
            sumExpenses: sumExpenses
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
            navigate('/assets-Vehicle-1')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        (answerList && answerList.clientPartTimeJob) ? navigate('/part-time-work-experience') : navigate('/work-experience')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Финансы</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <FieldWrapper><p>Доходы</p></FieldWrapper>
                    <FieldWrapper><TextInput onChange={setAmountBasicIncomeHandler} title={"Основной доход \u20bd/мес"} currentValue={amountBasicIncome} status={amountBasicIncome}/></FieldWrapper>
                    <FieldWrapper><TextInput onChange={setAmountPensionHandler} title={"Пенсия \u20bd/мес"} currentValue={amountPension}/></FieldWrapper>
                    <FieldWrapper><TextInput onChange={setAmountPartTimeIncomeHandler} title={"Доход по совместительству \u20bd/мес"} currentValue={amountPartTimeIncome}/></FieldWrapper>

                    <FieldWrapper>
                        <div className={classNames(s.optionalWrapper, isOpenAdditionalIncome && s.active)}>
                            <Checkbox value={'Иное:'} currentValue={isOpenAdditionalIncome} onChange={setIsOpenAdditionalIncomeHandler}/>
                            {isOpenAdditionalIncome &&
                                <div className={s.inputs}>
                                    <TextInput onChange={setSourceAdditionalIncomeHandler} title={"Источник дохода"} currentValue={sourceAdditionalIncome}/>
                                    <TextInput onChange={setAmountAdditionalIncomeHandler} title={"Размер \u20bd/мес"} currentValue={amountAdditionalIncome}/>
                                </div>
                            }
                        </div>
                    </FieldWrapper>

                    <FieldWrapper><TextInput onChange={setSumIncomeHandler} title={"Сумма доходов \u20bd/мес"} currentValue={sumIncome}/></FieldWrapper>

                    {/*<FieldWrapper>
                    <p style={{fontWeight: 400, margin: '5px 0'}}>Дополнительные доходы:</p>
                    <TextInput onChange={setSourceAdditionalIncomeHandler} title={"Источник дохода"} currentValue={sourceAdditionalIncome}/>
                </FieldWrapper>*/}

                    {/*                <FieldWrapper><TextInput onChange={setAmountAdditionalIncomeHandler} title={"Размер \u20bd/мес"} currentValue={amountAdditionalIncome}/></FieldWrapper>

                <FieldWrapper><TextInput onChange={setSumIncomeHandler} title={"Сумма доходов \u20bd/мес"} currentValue={sumIncome}/></FieldWrapper>*/}

                    <FieldWrapper><p>Расходы</p></FieldWrapper>
                    {/*
                    const [sumExpenses, setSumExpenses] = useState<null | string>(null);
                    const [amountCredit, setAmountCredit] = useState<null | string>(null);
                    const [amountAliment, setAmountAliment] = useState<null | string>(null);
                    const [amountAdditionalExpenses, setAmountAdditionalExpenses] = useState<null | string>(null);
                    const [sourceAdditionalExpenses, setSourceAdditionalExpenses] = useState<null | string>(null);
                */}

                    <FieldWrapper><TextInput onChange={setAmountCreditHandler} title={"Кредиты \u20bd/мес"} currentValue={amountCredit}/></FieldWrapper>
                    <FieldWrapper><TextInput onChange={setAmountAlimentHandler} title={"Алименты/судебные решения \u20bd/мес"} currentValue={amountAliment}/></FieldWrapper>

                    <FieldWrapper>
                        <div className={classNames(s.optionalWrapper, isOpenAdditionalExpenses && s.active)}>
                            <Checkbox value={'Иное:'} currentValue={isOpenAdditionalExpenses} onChange={setIsOpenAdditionalExpensesHandler}/>
                            {isOpenAdditionalExpenses &&
                                <div className={s.inputs}>
                                    <TextInput onChange={setSourceAdditionalExpensesHandler} title={"Источник расходов"} currentValue={sourceAdditionalExpenses}/>
                                    <TextInput onChange={setAmountAdditionalExpensesHandler} title={"Размер \u20bd/мес"} currentValue={amountAdditionalExpenses}/>
                                </div>
                            }
                        </div>
                    </FieldWrapper>

                    {/*<FieldWrapper>
                    <p style={{fontWeight: 400, margin: '5px 0'}}>Дополнительные расходы:</p>
                    <TextInput onChange={setSourceAdditionalExpensesHandler} title={"Источник расходов"} currentValue={sourceAdditionalExpenses}/>
                </FieldWrapper>
                <FieldWrapper><TextInput onChange={setAmountAdditionalExpensesHandler} title={"Размер \u20bd/мес"} currentValue={amountAdditionalExpenses}/></FieldWrapper>*/}


                    <FieldWrapper><TextInput onChange={setSumExpensesHandler} title={"Сумма расходов \u20bd/мес"} currentValue={sumExpenses}/></FieldWrapper>
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

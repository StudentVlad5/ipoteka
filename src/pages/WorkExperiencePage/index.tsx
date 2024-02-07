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
import {FieldWrapper} from "../../ui/FieldWrapper";
import {NumberInput} from "../../ui/NumberInput";

export const WorkExperiencePage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [startOfWorkDate, setStartOfWorkDate] = useState<null | number>(new Date().getTime());
    const [startOfWorkInCurrentOrganizationDate, setStartOfWorkInCurrentOrganizationDate] = useState<null | number>(new Date().getTime());
    const [totalWorkExperienceYear, setTotalWorkExperienceYear] = useState<null | string>('');
    const [totalWorkExperienceMonth, setTotalWorkExperienceMonth] = useState<null | string>('');
    const [currentOrganizationWorkExperienceYear, setCurrentOrganizationWorkExperienceYear] = useState<null | string>('');
    const [currentOrganizationWorkExperienceMonth, setCurrentOrganizationWorkExperienceMonth] = useState<null | string>('');
    const [lifespanCurrentOrganization, setLifespanCurrentOrganization] = useState<null | string>('');

    const [jobTitle, setJobTitle] = useState<null | string>('');
    const [nameSalaryBank, setNameSalaryBank] = useState<null | string>('');
    const [salaryCardNumber, setSalaryCardNumber] = useState<null | string>('');
    const [isBankEmployee, setIsBankEmployee] = useState<boolean>(false);
    const [isOrganizationBankClient, setIsOrganizationBankClient] = useState<boolean>(false);



    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setStartOfWorkDate(answerList.startOfWorkDate ?? new Date().getTime())
            setStartOfWorkInCurrentOrganizationDate(answerList.startOfWorkInCurrentOrganizationDate ?? new Date().getTime())
            if (answerList.totalWorkExperience) {
                setTotalWorkExperienceYear(answerList.totalWorkExperience.split(" ")[0] ?? '')
                setTotalWorkExperienceMonth(answerList.totalWorkExperience.split(" ")[2] ?? '')
            }
            if (answerList.currentOrganizationWorkExperience) {
                setCurrentOrganizationWorkExperienceYear(answerList.currentOrganizationWorkExperience.split(" ")[0] ?? '')
                setCurrentOrganizationWorkExperienceMonth(answerList.currentOrganizationWorkExperience.split(" ")[2] ?? '')
            }
            setLifespanCurrentOrganization(answerList.lifespanCurrentOrganization ?? '')
            setJobTitle(answerList.jobTitle ?? '')
            setNameSalaryBank(answerList.nameSalaryBank ?? '')
            setSalaryCardNumber(answerList.salaryCardNumber ?? '')
            setIsBankEmployee(answerList.isBankEmployee === "true" ?? false)
            setIsOrganizationBankClient(answerList.isOrganizationBankClient === "true" ?? '')
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const setIsBankEmployeeHandler = (value: boolean) => {
        setIsBankEmployee(value)
    }
    const setIsOrganizationBankClientHandler = (value: boolean) => {
        setIsOrganizationBankClient(value)
    }
    const setSalaryCardNumberHandler = (str: string | null) => {
        setSalaryCardNumber(str)
    }
    const setNameSalaryBankHandler = (str: string | null) => {
        setNameSalaryBank(str)
    }
    const setJobTitleHandler = (str: string | null) => {
        setJobTitle(str)
    }
    const setTotalWorkExperienceYearHandler = (str: string | null) => {
        setTotalWorkExperienceYear(str)
    }
    const setTotalWorkExperienceMonthHandler = (str: string | null) => {
        setTotalWorkExperienceMonth(str)
    }
    const setCurrentOrganizationWorkExperienceYearHandler = (str: string | null) => {
        setCurrentOrganizationWorkExperienceYear(str)
    }
    const setCurrentOrganizationWorkExperienceMonthHandler = (str: string | null) => {
        setCurrentOrganizationWorkExperienceMonth(str)
    }
    const setStartOfWorkDateHandler = (value: number | null) => {
        setStartOfWorkDate(value)
    }
    const setStartOfWorkInCurrentOrganizationDateHandler = (value: number | null) => {
        setStartOfWorkInCurrentOrganizationDate(value)
    }
    const setLifespanCurrentOrganizationHandler = (str: string | null) => {
        setLifespanCurrentOrganization(str)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            startOfWorkDate: startOfWorkDate,
            startOfWorkInCurrentOrganizationDate: startOfWorkInCurrentOrganizationDate,
            totalWorkExperience: `${totalWorkExperienceYear ?? 0} лет ${totalWorkExperienceMonth ?? 0} мес.`,
            currentOrganizationWorkExperience: `${currentOrganizationWorkExperienceYear ?? 0} лет ${currentOrganizationWorkExperienceMonth ?? 0} мес.`,
            lifespanCurrentOrganization: lifespanCurrentOrganization,
            jobTitle: jobTitle,
            nameSalaryBank: nameSalaryBank,
            salaryCardNumber: salaryCardNumber,
            isBankEmployee: !!isBankEmployee,
            isOrganizationBankClient: !!isOrganizationBankClient,
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
            if (!!answerList.clientPartTimeJob) {
                navigate('/part-time-jop-employment-info')
            }
            else {
                navigate('/client-finance')
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/organization')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Трудовой стаж</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <FieldWrapper><DateInput onChange={setStartOfWorkDateHandler} currentValue={startOfWorkDate ? +startOfWorkDate : 0} title={"Начало труд.деятельности"}/></FieldWrapper>
                    <FieldWrapper><DateInput onChange={setStartOfWorkInCurrentOrganizationDateHandler} currentValue={startOfWorkInCurrentOrganizationDate ? +startOfWorkInCurrentOrganizationDate : 0} title={"В данной организации"}/></FieldWrapper>

                    <FieldWrapper>
                        <div className={classNames(s.smallWrapper)}>
                            <p>Общий трудовой стаж</p>
                            <NumberInput onChange={setTotalWorkExperienceYearHandler} currentValue={totalWorkExperienceYear} title={"Лет"} mods={"verySmall"}/>
                            <NumberInput onChange={setTotalWorkExperienceMonthHandler} currentValue={totalWorkExperienceMonth} title={"Мес."} mods={"verySmall"}/>
                        </div>
                        <div className={classNames(s.smallWrapper)}>
                            <p>Стаж на текущей работе</p>
                            <NumberInput onChange={setCurrentOrganizationWorkExperienceYearHandler} currentValue={currentOrganizationWorkExperienceYear} title={"Лет"} mods={"verySmall"}/>
                            <NumberInput onChange={setCurrentOrganizationWorkExperienceMonthHandler} currentValue={currentOrganizationWorkExperienceMonth} title={"Мес."} mods={"verySmall"}/>
                        </div>
                    </FieldWrapper>

                    <FieldWrapper>
                        <label htmlFor="lifespanCurrentOrganization">
                            <p>Существование организации</p>
                            <RadioButton id={"1"}
                                         name={"lifespanCurrentOrganization"}
                                         value={"До 2 лет"}
                                         onChange={setLifespanCurrentOrganizationHandler} currentValue={lifespanCurrentOrganization}/>
                            <RadioButton id={"2"}
                                         name={"lifespanCurrentOrganization"}
                                         value={"От 2 до 5 лет"}
                                         onChange={setLifespanCurrentOrganizationHandler} currentValue={lifespanCurrentOrganization}/>
                            <RadioButton id={"3"}
                                         name={"lifespanCurrentOrganization"}
                                         value={"Более 5 лет"}
                                         onChange={setLifespanCurrentOrganizationHandler} currentValue={lifespanCurrentOrganization}/>
                        </label>
                    </FieldWrapper>

                    <FieldWrapper><TextInput onChange={setJobTitleHandler} currentValue={jobTitle} title={"Название должности"}/></FieldWrapper>
                    <FieldWrapper><p>Зарплатный проект/пенсия в банке:</p></FieldWrapper>
                    <FieldWrapper><TextInput onChange={setNameSalaryBankHandler} currentValue={nameSalaryBank} title={"Название банка"}/></FieldWrapper>
                    <FieldWrapper><TextInput onChange={setSalaryCardNumberHandler} currentValue={salaryCardNumber} title={"Номер зарплатной/пенсионной карты"}/></FieldWrapper>
                    <FieldWrapper><Checkbox value={"Я сотрудник этого банка"} onChange={setIsBankEmployeeHandler} currentValue={isBankEmployee}/></FieldWrapper>
                    <FieldWrapper><Checkbox value={"Моя организация – клиент этого банка"} onChange={setIsOrganizationBankClientHandler} currentValue={isOrganizationBankClient}/></FieldWrapper>
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

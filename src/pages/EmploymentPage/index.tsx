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
import {NumberInput} from "../../ui/NumberInput";
import {DateInput} from "../../ui/DateInput";

export const EmploymentPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [clientPartTimeJob, setClientPartTimeJob] = useState<boolean>(false);
    const [clientEmploymentType, setClientEmploymentType] = useState<null | string>('');
    const [clientBusinessPercentage, setClientBusinessPercentage] = useState<null | string>('');

    const [clientTypeOfHire, setClientTypeOfHire] = useState<null | string>('');
    const [clientTypeOfHireStartDate, setClientTypeOfHireStartDate] = useState<null | number>(new Date().getTime());
    const [clientTypeOfHireEndDate, setClientTypeOfHireEndDate] = useState<null | number>(new Date().getTime());

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setClientPartTimeJob(answerList.clientPartTimeJob ?? '')
            setClientEmploymentType(answerList.clientEmploymentType ?? '')
            setClientBusinessPercentage((answerList.clientEmploymentType === 'Свой бизнес' && answerList.clientBusinessPercentage) ?? '')

            setClientTypeOfHire((answerList.clientTypeOfHire) ?? '')
            setClientTypeOfHireStartDate(answerList.clientTypeOfHireStartDate ?? new Date().getTime())
            setClientTypeOfHireEndDate(answerList.clientTypeOfHireEndDate ?? new Date().getTime())
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    /*useMemo(() => {
        if (clientEmploymentType) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [clientEmploymentType])*/

    const setClientPartTimeJobHandler = (value: boolean) => {
        setClientPartTimeJob(value)
    }
    const setClientEmploymentTypeHandler = (str: string | null) => {
        setClientEmploymentType(str)
    }
    const setClientTypeOfHireHandler = (str: string | null) => {
        setClientTypeOfHire(str)
    }
    const setClientBusinessPercentageHandler = (str: string | null) => {
        setClientBusinessPercentage(str)
    }
    const setClientTypeOfHireStartDateHandler = (value: number | null) => {
        setClientTypeOfHireStartDate(value)
    }
    const setClientTypeOfHireEndDateHandler = (value: number | null) => {
        setClientTypeOfHireEndDate(value)
    }


    const onClickNextButtonHandler = async () => {
        console.log(clientTypeOfHireEndDate)
        console.log(clientTypeOfHireEndDate ? true : false)
        const params : any = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            clientPartTimeJob: clientPartTimeJob ? clientPartTimeJob : '',
            clientEmploymentType: clientEmploymentType,
            clientBusinessPercentage: (clientEmploymentType === 'Свой бизнес' && clientBusinessPercentage) ? clientBusinessPercentage : '',

            clientTypeOfHire: clientTypeOfHire ?? '',
            // clientTypeOfHireStartDate: clientTypeOfHireStartDate ?? '',
            // clientTypeOfHireEndDate: clientTypeOfHireEndDate ?? ''
        }

        if (clientTypeOfHire === "срочный договор" && clientEmploymentType == "По найму") {
            params['clientTypeOfHireStartDate'] =  clientTypeOfHireStartDate
            params['clientTypeOfHireEndDate'] =  clientTypeOfHireEndDate
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
            navigate('/organization')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/social-status')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Занятость</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <Checkbox value={"Есть работа по совместительству"} onChange={setClientPartTimeJobHandler} currentValue={clientPartTimeJob}/>
                    <p>Тип занятости</p>
                    <label htmlFor="clientEmploymentType">
                        <RadioButton id={"1"}
                                     name={"clientEmploymentType"}
                                     value={"Коммерческая"}
                                     onChange={setClientEmploymentTypeHandler} currentValue={clientEmploymentType}/>
                        <RadioButton id={"2"}
                                     name={"clientEmploymentType"}
                                     value={"Бюджетная"}
                                     onChange={setClientEmploymentTypeHandler} currentValue={clientEmploymentType}/>
                        <RadioButton id={"3"}
                                     name={"clientEmploymentType"}
                                     value={"Свой бизнес"}
                                     onChange={setClientEmploymentTypeHandler} currentValue={clientEmploymentType}
                                     isDropdown={true}
                                     children={<NumberInput title={'Процент %'} onChange={setClientBusinessPercentageHandler} currentValue={clientBusinessPercentage}/>}
                        />
                        <RadioButton id={"4"}
                                     name={"clientEmploymentType"}
                                     value={"По найму"}
                                     onChange={setClientEmploymentTypeHandler} currentValue={clientEmploymentType}
                                     isDropdown={true}
                                     children={
                                        <div>
                                            <label htmlFor="clientEmploymentTypeHiring">
                                                <RadioButton id={'7'} name={'clientEmploymentTypeHiring'} value={'договор без срока'} onChange={setClientTypeOfHireHandler} currentValue={clientTypeOfHire}/>
                                                <div>
                                                    <RadioButton id={'8'} name={'clientEmploymentTypeHiring'} value={'срочный договор'} onChange={setClientTypeOfHireHandler} currentValue={clientTypeOfHire} isDropdown={true}
                                                                 children={
                                                                     <div className={s.hireDateBox}>
                                                                         <DateInput onChange={setClientTypeOfHireStartDateHandler} title={"Начало труд. деятельности:"} currentValue={clientTypeOfHireStartDate ? +clientTypeOfHireStartDate : 0}/>
                                                                         <DateInput onChange={setClientTypeOfHireEndDateHandler} title={"Конец труд. деятельности:"} currentValue={clientTypeOfHireEndDate ? +clientTypeOfHireEndDate : 0}/>
                                                                     </div>
                                                                 }/>
                                                </div>
                                            </label>
                                        </div>
                                     }/>
                        <RadioButton id={"5"}
                                     name={"clientEmploymentType"}
                                     value={"Пенсионер"}
                                     onChange={setClientEmploymentTypeHandler} currentValue={clientEmploymentType}/>
                        <RadioButton id={"6"}
                                     name={"clientEmploymentType"}
                                     value={"ИП"}
                                     onChange={setClientEmploymentTypeHandler} currentValue={clientEmploymentType}/>
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

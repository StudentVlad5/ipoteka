import s from './index.module.scss';
import classNames from "classnames";
import {useEffect, useMemo, useState} from "react";
import {RadioButton} from "../../ui/RadioButton";
import {TextInput} from "../../ui/TextInput";
import {Button} from "../../ui/Button";
import {useNavigate} from "react-router-dom";
import Checkbox from "../../ui/Checkbox";
import {DateInput} from "../../ui/DateInput";
import {useAppSelector} from "../../helpers/reduxHook";
import {AnswerState} from "../../store/reducers/answer.reducer";
import {baseUrl} from "../../common/config";
import { FaAsterisk } from "react-icons/fa6";

export const EmploymentStatusPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [status, setStatus] = useState<null | string>('');

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setStatus(answerList.clientEmploymentStatus)
        }
    }, [answerList])

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    /*useMemo(() => {
        if (status) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [status])*/

    const setStatusHandler = (str: string | null) => {
        setStatus(str)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            clientEmploymentStatus: status ?? '',
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
                // credentials: 'include'
            })
            // console.log(response)
            navigate('/credit-target')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/client-info')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={`${classNames(s.title)} contentTitle`}>Статус занятости {(status  !== "" && status  !== undefined && status !== null) ? <FaAsterisk style={{fill:'green', width: "15px", height:"15px", transform:"translateY(-10px)"}}/> : <FaAsterisk style={{fill:'grey', width: "15px", height:"15px", transform:"translateY(-10px)"}}/>}</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <label htmlFor="status">
                        <RadioButton name={"status"}
                                     id={"1"}
                                     onChange={setStatusHandler}
                                     value={"Работник/Служащий"} currentValue={status}/>
                        <RadioButton name={"status"}
                                     id={"2"}
                                     onChange={setStatusHandler}
                                     value={"Военнослужащий"} currentValue={status}/>
                        <RadioButton name={"status"}
                                     id={"3"}
                                     onChange={setStatusHandler}
                                     value={"Не работающий"} currentValue={status}/>
                        <RadioButton name={"status"}
                                     id={"4"}
                                     onChange={setStatusHandler}
                                     value={"Работающий пенсионер"} currentValue={status}/>
                        <RadioButton name={"status"}
                                     id={"5"}
                                     onChange={setStatusHandler}
                                     value={"Пенсионер"} currentValue={status}/>
                        <RadioButton name={"status"}
                                     id={"6"}
                                     onChange={setStatusHandler}
                                     value={"Студент"} currentValue={status}/>
                    </label>
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} disabled={isDisabled} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

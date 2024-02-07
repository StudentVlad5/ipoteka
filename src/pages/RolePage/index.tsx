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
import { FaCheck } from "react-icons/fa6";

export const RolePage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    // const [role, setRole] = useState<null | string>(null);
    const [role, setRole] = useState<null | string>('');
    const [name, setName] = useState<null | string>('');
    const [degree, setDegree] = useState<null | string>('');

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (answerList) {
            answerList.clientRole ? setRole(answerList.clientRole) : setRole('')
            answerList.clientName ? setName(answerList.clientName) : setName('')
            answerList.clientDegree ? setDegree(answerList.clientDegree) : setDegree('')
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    /*useMemo(() => {
        if (role) {
            if (role === 'Созаёмщик') {
                if (name && degree) {
                    setIsDisabled(false)
                } else {
                    setIsDisabled(true)
                }
            } else {
                setIsDisabled(false)
            }
        } else {
            setIsDisabled(true)
        }
    }, [role, name, degree])*/

    const setRoleHandler = (name: string | null) => {
        setRole(name)
    }

    const setNameHandler = (str: string) => {
        setName(str)
    }

    const setDegreeHandler = (str: string) => {
        setDegree(str)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            clientRole: role ?? '',
            clientName: name ?? '',
            clientDegree: degree ?? ''
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
            navigate('/client-info')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useMemo(() => {
        if (role !== "Созаёмщик") {
            setName(null)
            setDegree(null)
        }
    }, [role])

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={`${classNames(s.title)} contentTitle`}>Роль клиента</h1>
                <div className={`${classNames(s.main)} contentMain`}>
                    <label htmlFor="role">
                        <RadioButton name={"role"}
                                     id={"1"}
                                     onChange={setRoleHandler}
                                     value={"Заёмщик"} currentValue={role ? role : null}/>
                        <RadioButton name={"role"}
                                     id={"2"}
                                     onChange={setRoleHandler}
                                     value={"Созаемщик/поручитель/залогодатель"}
                                     isDropdown={true}
                                     currentValue={role}
                                     children={
                                         <div className={s.box}>
                                            <div className="check">
                                                <TextInput title={"ФИО заемщика:"} onChange={setNameHandler} currentValue={name}/>
                                                {(name  !== "" && name  !== undefined && name !== null)? <FaCheck style={{fill:'green'}}/> : <FaCheck />}
                                            </div>
                                            <div className="check">
                                                <TextInput title={"Степень родства с заёмщиком:"} onChange={setDegreeHandler} currentValue={degree}/>
                                                {(degree  !== "" && degree  !== undefined && degree !== null)? <FaCheck style={{fill:'green'}}/> : <FaCheck />}
                                             </div>
                                         </div>}/>
                    </label>
                </div>
            </div>

            <div className={s.btns}>
                <div></div>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

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

export const TargetCreditPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [type, setType] = useState<null | string>('');
    const [target, setTarget] = useState<null | string>('');

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setType(answerList.creditTargetType)
            setTarget(answerList.creditTraget)
        }
    }, [answerList])

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    /*useMemo(() => {
        if (type) {
            if ((type === 'Первичный рынок') || (type === 'Вторичный рынок')) {
                if (target) {
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
    }, [type, target])*/

    useMemo(() => {
        if ((type !== "Первичный рынок")) setTarget('')
    }, [type])

    const setTypeHandler = (str: string | null) => {
        setType(str)
    }

    const setTargetHandler = (str: string | null) => {
        setTarget(str)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            creditTargetType: type,
            creditTraget: target
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
            navigate('/region')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/employment-status')
    }

    return (
        <div className={classNames(s.TargetPage)}>
            <div className={s.mainContent}>
                <h1 className={`${classNames(s.title)} contentTitle`}>Цель кредита</h1>
                <div className={`${classNames(s.main)} contentMain`}>
                    <label htmlFor="target">
                        <RadioButton name={"type"}
                                     id={"1"}
                                     onChange={setTypeHandler}
                                     value={"Под залог недвижимости"} currentValue={type}/>
                        <RadioButton name={"type"}
                                     id={"2"}
                                     onChange={setTypeHandler}
                                     value={"Нецелевой кредит"} currentValue={type}/>
                        <RadioButton name={"type"}
                                     id={"3"}
                                     onChange={setTypeHandler}
                                     value={"Первичный рынок"}
                                     isDropdown={true}
                                     currentValue={type}
                                     children={
                                         type === "Первичный рынок" &&
                                         <label htmlFor="target">
                                             <RadioButton name={"target"}
                                                          id={"p1"}
                                                          onChange={setTargetHandler}
                                                          value={"квартира"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"p2"}
                                                          onChange={setTargetHandler}
                                                          value={"апартаменты"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"p3"}
                                                          onChange={setTargetHandler}
                                                          value={"таунхаус"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"p4"}
                                                          onChange={setTargetHandler}
                                                          value={"дом/участок"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"p5"}
                                                          onChange={setTargetHandler}
                                                          value={"ком.помещение"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"p6"}
                                                          onChange={setTargetHandler}
                                                          value={"машиноместо"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"p7"}
                                                          onChange={setTargetHandler}
                                                          value={"кладовые и прочее"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"p8"}
                                                          onChange={setTargetHandler}
                                                          value={"рефинансирование"} currentValue={target}/>
                                         </label>
                                     }/>
                        <RadioButton name={"type"}
                                     id={"4"}
                                     onChange={setTypeHandler}
                                     value={"Вторичный рынок"}
                                     isDropdown={true}
                                     currentValue={type}
                                     children={
                                         type === "Вторичный рынок" &&
                                         <label htmlFor="target">
                                             <RadioButton name={"target"}
                                                          id={"v1"}
                                                          onChange={setTargetHandler}
                                                          value={"квартира"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"v2"}
                                                          onChange={setTargetHandler}
                                                          value={"апартаменты"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"v3"}
                                                          onChange={setTargetHandler}
                                                          value={"таунхаус"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"v4"}
                                                          onChange={setTargetHandler}
                                                          value={"дом/участок"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"v5"}
                                                          onChange={setTargetHandler}
                                                          value={"ком.помещение"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"v6"}
                                                          onChange={setTargetHandler}
                                                          value={"машиноместо"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"v7"}
                                                          onChange={setTargetHandler}
                                                          value={"кладовые и прочее"} currentValue={target}/>
                                             <RadioButton name={"target"}
                                                          id={"v8"}
                                                          onChange={setTargetHandler}
                                                          value={"рефинансирование"} currentValue={target}/>
                                         </label>
                                     }/>
                    </label>
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={"grey"}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} isLoading={isLoading} disabled={isDisabled}>Далее</Button>
            </div>
        </div>
    );
};

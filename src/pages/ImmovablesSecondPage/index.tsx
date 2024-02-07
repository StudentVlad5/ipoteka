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

export const ImmovablesSecondPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [immovablesType2, setImmovablesType2] = useState<null | string>('');
    const [immovablesSquare2, setImmovablesSquare2] = useState<null | string>('');
    const [immovablesShareSize2, setImmovablesShareSize2] = useState<null | string>('');
    const [immovablesPrice2, setImmovablesPrice2] = useState<null | string>('');
    const [immovablesYear2, setImmovablesYear2] = useState<null | string>('');
    const [immovablesAddress2, setImmovablesAddress2] = useState<null | string>('');
    const [immovablesOrigin2, setImmovablesOrigin2] = useState<null | string>('');
    const [immovablesIsDeposit2, setImmovablesIsDeposit2] = useState<boolean>(false);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setImmovablesType2(answerList.immovablesType2 ?? '')
            setImmovablesSquare2(answerList.immovablesSquare2 ?? '')
            setImmovablesShareSize2(answerList.immovablesShareSize2 ?? '')
            setImmovablesPrice2(answerList.immovablesPrice2 ?? '')
            setImmovablesYear2(answerList.immovablesYear2 ?? '')
            setImmovablesAddress2(answerList.immovablesAddress2 ?? '')
            setImmovablesOrigin2(answerList.immovablesOrigin2 ?? '')
            setImmovablesIsDeposit2(answerList.immovablesIsDeposit2 === "true" ?? null)
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const setImmovablesOrigin2Handler = (str: string | null) => {
        setImmovablesOrigin2(str)
    }
    const setImmovablesType2Handler = (str: string | null) => {
        setImmovablesType2(str)
    }
    const setImmovablesSquare2Handler = (str: string | null) => {
        setImmovablesSquare2(str)
    }
    const setImmovablesShareSize2Handler = (str: string | null) => {
        setImmovablesShareSize2(str)
    }
    const setImmovablesPrice2Handler = (str: string | null) => {
        setImmovablesPrice2(str)
    }
    const setImmovablesYear2Handler = (str: string | null) => {
        setImmovablesYear2(str)
    }
    const setImmovablesAddress2Handler = (str: string | null) => {
        setImmovablesAddress2(str)
    }
    const setImmovablesIsDeposit2Handler = (value: boolean) => {
        setImmovablesIsDeposit2(value)
    }

    const onClickSkipButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            immovablesType2: immovablesType2,
            immovablesSquare2: immovablesSquare2,
            immovablesShareSize2: immovablesShareSize2,
            immovablesPrice2: immovablesPrice2,
            immovablesYear2: immovablesYear2,
            immovablesAddress2: immovablesAddress2,
            immovablesIsDeposit2: !!immovablesIsDeposit2,
            immovablesOrigin2: immovablesOrigin2
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
            navigate('/assets-immovables-3')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            immovablesType2: immovablesType2,
            immovablesSquare2: immovablesSquare2,
            immovablesShareSize2: immovablesShareSize2,
            immovablesPrice2: immovablesPrice2,
            immovablesYear2: immovablesYear2,
            immovablesAddress2: immovablesAddress2,
            immovablesIsDeposit2: !!immovablesIsDeposit2,
            immovablesOrigin2: immovablesOrigin2
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
            if (answerList.clientPartTimeJob) {
                navigate('/lph-data')
            } else {
                navigate('/other')
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/assets-immovables-1')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Активы</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <p>Недвижимость #2</p>
                    <FieldWrapper>
                        <label htmlFor="immovablesType2">
                            <p>Тип объекта</p>
                            <RadioButton id={"1"}
                                         name={"immovablesType2"}
                                         value={"квартира"}
                                         onChange={setImmovablesType2Handler} currentValue={immovablesType2}/>
                            <RadioButton id={"2"}
                                         name={"immovablesType2"}
                                         value={"комната"}
                                         onChange={setImmovablesType2Handler} currentValue={immovablesType2}/>
                            <RadioButton id={"3"}
                                         name={"immovablesType2"}
                                         value={"участок"}
                                         onChange={setImmovablesType2Handler} currentValue={immovablesType2}/>
                            <RadioButton id={"4"}
                                         name={"immovablesType2"}
                                         value={"дом"}
                                         onChange={setImmovablesType2Handler} currentValue={immovablesType2}/>
                        </label>
                    </FieldWrapper>

                    <FieldWrapper>
                        <label htmlFor="immovablesOrigin2">
                            <p>Тип объекта</p>
                            <RadioButton id={"5"}
                                         name={"immovablesOrigin2"}
                                         value={"покупка"}
                                         onChange={setImmovablesOrigin2Handler} currentValue={immovablesOrigin2}/>
                            <RadioButton id={"6"}
                                         name={"immovablesOrigin2"}
                                         value={"дарение"}
                                         onChange={setImmovablesOrigin2Handler} currentValue={immovablesOrigin2}/>
                            <RadioButton id={"7"}
                                         name={"immovablesOrigin2"}
                                         value={"приватизация"}
                                         onChange={setImmovablesOrigin2Handler} currentValue={immovablesOrigin2}/>
                            <RadioButton id={"8"}
                                         name={"immovablesOrigin2"}
                                         value={"наследство"}
                                         onChange={setImmovablesOrigin2Handler} currentValue={immovablesOrigin2}/>
                        </label>
                    </FieldWrapper>

                    <FieldWrapper><Checkbox value={"Находится в залоге"} onChange={setImmovablesIsDeposit2Handler} currentValue={immovablesIsDeposit2}/></FieldWrapper>
                    <FieldWrapper>
                        <div className={s.smallWrapper}>
                            <TextInput onChange={setImmovablesSquare2Handler} title={"Площадь м\u00B2"} currentValue={immovablesSquare2} mods={"small"}/>
                            <TextInput onChange={setImmovablesShareSize2Handler} title={"Размер доли %"} currentValue={immovablesShareSize2} mods={"small"}/>
                        </div>
                    </FieldWrapper>
                    <FieldWrapper>
                        <div className={s.smallWrapper}>
                            <TextInput onChange={setImmovablesPrice2Handler} title={"Стоимость \u20BD"} currentValue={immovablesPrice2} mods={"small"}/>
                            <TextInput onChange={setImmovablesYear2Handler} title={"Год приобретения"} currentValue={immovablesYear2} mods={"small"}/>
                        </div>
                    </FieldWrapper>
                    <FieldWrapper><TextInput onChange={setImmovablesAddress2Handler} title={"Адрес объекта"} currentValue={immovablesAddress2}/></FieldWrapper>
                    {/*<Checkbox value={"Находится в залоге"} onChange={setVehicleIsDeposit1Handler} currentValue={vehicleIsDeposit1}/>*/}
                </div>
            </div>
            <div className={classNames(s.btns)}>
                <div className={s.btnsOptional}>
                    <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                    <Button onClick={onClickSkipButtonHandler} mods={"grey"}>Добавить объект</Button>
                </div>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

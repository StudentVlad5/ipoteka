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

export const ImmovablesFirstPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [immovablesType1, setImmovablesType1] = useState<null | string>('');
    const [immovablesSquare1, setImmovablesSquare1] = useState<null | string>('');
    const [immovablesShareSize1, setImmovablesShareSize1] = useState<null | string>('');
    const [immovablesPrice1, setImmovablesPrice1] = useState<null | string>('');
    const [immovablesYear1, setImmovablesYear1] = useState<null | string>('');
    const [immovablesAddress1, setImmovablesAddress1] = useState<null | string>('');
    const [immovablesOrigin1, setImmovablesOrigin1] = useState<null | string>('');
    const [immovablesIsDeposit1, setImmovablesIsDeposit1] = useState<boolean>(false);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setImmovablesType1(answerList.immovablesType1 ?? '')
            setImmovablesSquare1(answerList.immovablesSquare1 ?? '')
            setImmovablesShareSize1(answerList.immovablesShareSize1 ?? '')
            setImmovablesPrice1(answerList.immovablesPrice1 ?? '')
            setImmovablesYear1(answerList.immovablesYear1 ?? '')
            setImmovablesAddress1(answerList.immovablesAddress1 ?? '')
            setImmovablesOrigin1(answerList.immovablesOrigin1 ?? '')
            setImmovablesIsDeposit1(answerList.immovablesIsDeposit1 === "true" ?? null)
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const setImmovablesOrigin1Handler = (str: string | null) => {
        setImmovablesOrigin1(str)
    }
    const setImmovablesType1Handler = (str: string | null) => {
        setImmovablesType1(str)
    }
    const setImmovablesSquare1Handler = (str: string | null) => {
        setImmovablesSquare1(str)
    }
    const setImmovablesShareSize1Handler = (str: string | null) => {
        setImmovablesShareSize1(str)
    }
    const setImmovablesPrice1Handler = (str: string | null) => {
        setImmovablesPrice1(str)
    }
    const setImmovablesYear1Handler = (str: string | null) => {
        setImmovablesYear1(str)
    }
    const setImmovablesAddress1Handler = (str: string | null) => {
        setImmovablesAddress1(str)
    }
    const setImmovablesIsDeposit1Handler = (value: boolean) => {
        setImmovablesIsDeposit1(value)
    }

    const onClickSkipButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            immovablesType1: immovablesType1,
            immovablesSquare1: immovablesSquare1,
            immovablesShareSize1: immovablesShareSize1,
            immovablesPrice1: immovablesPrice1,
            immovablesYear1: immovablesYear1,
            immovablesAddress1: immovablesAddress1,
            immovablesIsDeposit1: !!immovablesIsDeposit1,
            immovablesOrigin1: immovablesOrigin1
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
            navigate('/assets-immovables-2')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            immovablesType1: immovablesType1,
            immovablesSquare1: immovablesSquare1,
            immovablesShareSize1: immovablesShareSize1,
            immovablesPrice1: immovablesPrice1,
            immovablesYear1: immovablesYear1,
            immovablesAddress1: immovablesAddress1,
            immovablesIsDeposit1: !!immovablesIsDeposit1,
            immovablesOrigin1: immovablesOrigin1
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
        navigate('/assets-Vehicle-1')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Активы</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <p>Недвижимость</p>
                    <FieldWrapper>
                        <label htmlFor="immovablesType1">
                            <p>Тип объекта</p>
                            <RadioButton id={"1"}
                                         name={"immovablesType1"}
                                         value={"квартира"}
                                         onChange={setImmovablesType1Handler} currentValue={immovablesType1}/>
                            <RadioButton id={"2"}
                                         name={"immovablesType1"}
                                         value={"комната"}
                                         onChange={setImmovablesType1Handler} currentValue={immovablesType1}/>
                            <RadioButton id={"3"}
                                         name={"immovablesType1"}
                                         value={"участок"}
                                         onChange={setImmovablesType1Handler} currentValue={immovablesType1}/>
                            <RadioButton id={"4"}
                                         name={"immovablesType1"}
                                         value={"дом"}
                                         onChange={setImmovablesType1Handler} currentValue={immovablesType1}/>
                        </label>
                    </FieldWrapper>
                    <FieldWrapper>
                        <label htmlFor="immovablesOrigin1">
                            <p>Тип объекта</p>
                            <RadioButton id={"5"}
                                         name={"immovablesOrigin1"}
                                         value={"покупка"}
                                         onChange={setImmovablesOrigin1Handler} currentValue={immovablesOrigin1}/>
                            <RadioButton id={"6"}
                                         name={"immovablesOrigin1"}
                                         value={"дарение"}
                                         onChange={setImmovablesOrigin1Handler} currentValue={immovablesOrigin1}/>
                            <RadioButton id={"7"}
                                         name={"immovablesOrigin1"}
                                         value={"приватизация"}
                                         onChange={setImmovablesOrigin1Handler} currentValue={immovablesOrigin1}/>
                            <RadioButton id={"8"}
                                         name={"immovablesOrigin1"}
                                         value={"наследство"}
                                         onChange={setImmovablesOrigin1Handler} currentValue={immovablesOrigin1}/>
                        </label>
                    </FieldWrapper>
                    <FieldWrapper><Checkbox value={"Находится в залоге"} onChange={setImmovablesIsDeposit1Handler} currentValue={immovablesIsDeposit1}/></FieldWrapper>
                    <FieldWrapper>
                        <div className={s.smallWrapper}>
                            <TextInput onChange={setImmovablesSquare1Handler} title={"Площадь м\u00B2"} currentValue={immovablesSquare1} mods={"small"}/>
                            <TextInput onChange={setImmovablesShareSize1Handler} title={"Размер доли %"} currentValue={immovablesShareSize1} mods={"small"}/>
                        </div>
                    </FieldWrapper>
                    <FieldWrapper>
                        <div className={s.smallWrapper}>
                            <TextInput onChange={setImmovablesPrice1Handler} title={"Стоимость \u20BD"} currentValue={immovablesPrice1} mods={"small"}/>
                            <TextInput onChange={setImmovablesYear1Handler} title={"Год приобретения"} currentValue={immovablesYear1} mods={"small"}/>
                        </div>
                    </FieldWrapper>
                    <FieldWrapper><TextInput onChange={setImmovablesAddress1Handler} title={"Адрес объекта"} currentValue={immovablesAddress1}/></FieldWrapper>
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

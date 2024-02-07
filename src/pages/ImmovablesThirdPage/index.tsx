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

export const ImmovablesThirdPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [immovablesType3, setImmovablesType3] = useState<null | string>('');
    const [immovablesSquare3, setImmovablesSquare3] = useState<null | string>('');
    const [immovablesShareSize3, setImmovablesShareSize3] = useState<null | string>('');
    const [immovablesPrice3, setImmovablesPrice3] = useState<null | string>('');
    const [immovablesYear3, setImmovablesYear3] = useState<null | string>('');
    const [immovablesAddress3, setImmovablesAddress3] = useState<null | string>('');
    const [immovablesOrigin3, setImmovablesOrigin3] = useState<null | string>('');
    const [immovablesIsDeposit3, setImmovablesIsDeposit3] = useState<boolean>(false);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setImmovablesType3(answerList.immovablesType3 ?? '')
            setImmovablesSquare3(answerList.immovablesSquare3 ?? '')
            setImmovablesShareSize3(answerList.immovablesShareSize3 ?? '')
            setImmovablesPrice3(answerList.immovablesPrice3 ?? '')
            setImmovablesYear3(answerList.immovablesYear3 ?? '')
            setImmovablesAddress3(answerList.immovablesAddress3 ?? '')
            setImmovablesOrigin3(answerList.immovablesOrigin3 ?? '')
            setImmovablesIsDeposit3(answerList.immovablesIsDeposit3 === "true" ?? null)
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const setImmovablesOrigin3Handler = (str: string | null) => {
        setImmovablesOrigin3(str)
    }
    const setImmovablesType3Handler = (str: string | null) => {
        setImmovablesType3(str)
    }
    const setImmovablesSquare3Handler = (str: string | null) => {
        setImmovablesSquare3(str)
    }
    const setImmovablesShareSize3Handler = (str: string | null) => {
        setImmovablesShareSize3(str)
    }
    const setImmovablesPrice3Handler = (str: string | null) => {
        setImmovablesPrice3(str)
    }
    const setImmovablesYear3Handler = (str: string | null) => {
        setImmovablesYear3(str)
    }
    const setImmovablesAddress3Handler = (str: string | null) => {
        setImmovablesAddress3(str)
    }
    const setImmovablesIsDeposit3Handler = (value: boolean) => {
        setImmovablesIsDeposit3(value)
    }

    const onClickSkipButtonHandler = () => {
        navigate('/lph-data')
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            immovablesType3: immovablesType3,
            immovablesSquare3: immovablesSquare3,
            immovablesShareSize3: immovablesShareSize3,
            immovablesPrice3: immovablesPrice3,
            immovablesYear3: immovablesYear3,
            immovablesAddress3: immovablesAddress3,
            immovablesIsDeposit3: !!immovablesIsDeposit3,
            immovablesOrigin3: immovablesOrigin3
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
        navigate('/assets-immovables-2')
    }

    return (
        <div className={classNames(s.RolePage)}>

            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Активы</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <p>Недвижимость #3</p>
                    <FieldWrapper>
                        <label htmlFor="immovablesType3">
                            <p>Тип объекта</p>
                            <RadioButton id={"1"}
                                         name={"immovablesType3"}
                                         value={"квартира"}
                                         onChange={setImmovablesType3Handler} currentValue={immovablesType3}/>
                            <RadioButton id={"2"}
                                         name={"immovablesType3"}
                                         value={"комната"}
                                         onChange={setImmovablesType3Handler} currentValue={immovablesType3}/>
                            <RadioButton id={"3"}
                                         name={"immovablesType3"}
                                         value={"участок"}
                                         onChange={setImmovablesType3Handler} currentValue={immovablesType3}/>
                            <RadioButton id={"4"}
                                         name={"immovablesType3"}
                                         value={"дом"}
                                         onChange={setImmovablesType3Handler} currentValue={immovablesType3}/>
                        </label>
                    </FieldWrapper>
                    <FieldWrapper>
                        <label htmlFor="immovablesOrigin3">
                            <p>Тип объекта</p>
                            <RadioButton id={"5"}
                                         name={"immovablesOrigin3"}
                                         value={"покупка"}
                                         onChange={setImmovablesOrigin3Handler} currentValue={immovablesOrigin3}/>
                            <RadioButton id={"6"}
                                         name={"immovablesOrigin3"}
                                         value={"дарение"}
                                         onChange={setImmovablesOrigin3Handler} currentValue={immovablesOrigin3}/>
                            <RadioButton id={"7"}
                                         name={"immovablesOrigin3"}
                                         value={"приватизация"}
                                         onChange={setImmovablesOrigin3Handler} currentValue={immovablesOrigin3}/>
                            <RadioButton id={"8"}
                                         name={"immovablesOrigin3"}
                                         value={"наследство"}
                                         onChange={setImmovablesOrigin3Handler} currentValue={immovablesOrigin3}/>
                        </label>
                    </FieldWrapper>
                    <FieldWrapper><Checkbox value={"Находится в залоге"} onChange={setImmovablesIsDeposit3Handler} currentValue={immovablesIsDeposit3}/></FieldWrapper>
                    <FieldWrapper>
                        <div className={s.smallWrapper}>
                            <TextInput onChange={setImmovablesSquare3Handler} title={"Площадь м\u00B2"} currentValue={immovablesSquare3} mods={"small"}/>
                            <TextInput onChange={setImmovablesShareSize3Handler} title={"Размер доли %"} currentValue={immovablesShareSize3} mods={"small"}/>
                        </div>
                    </FieldWrapper>
                    <FieldWrapper>
                        <div className={s.smallWrapper}>
                            <TextInput onChange={setImmovablesPrice3Handler} title={"Стоимость \u20BD"} currentValue={immovablesPrice3} mods={"small"}/>
                            <TextInput onChange={setImmovablesYear3Handler} title={"Год приобретения"} currentValue={immovablesYear3} mods={"small"}/>
                        </div>
                    </FieldWrapper>
                    <FieldWrapper><TextInput onChange={setImmovablesAddress3Handler} title={"Адрес объекта"} currentValue={immovablesAddress3}/></FieldWrapper>
                </div>
            </div>

            <div className={classNames(s.btns)}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
                {/*<Button onClick={onClickSkipButtonHandler} mods={"grey"}>Пропустить</Button>*/}
            </div>
        </div>
    );
};

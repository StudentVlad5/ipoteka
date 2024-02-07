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

export const VehicleFirstPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [vehicleBrand1, setVehicleBrand1] = useState<null | string>('');
    const [vehiclePrice1, setVehiclePrice1] = useState<null | string>('');
    const [vehicleYear1, setVehicleYear1] = useState<null | string>('');
    const [vehicleIsDeposit1, setVehicleIsDeposit1] = useState<boolean>(false);

    /* Vehicle 2 */
    const [vehicleBrand2, setVehicleBrand2] = useState<null | string>('');
    const [vehiclePrice2, setVehiclePrice2] = useState<null | string>('');
    const [vehicleYear2, setVehicleYear2] = useState<null | string>('');
    const [vehicleIsDeposit2, setVehicleIsDeposit2] = useState<boolean>(false);

    /* Vehicle 3 */
    const [vehicleBrand3, setVehicleBrand3] = useState<null | string>('');
    const [vehiclePrice3, setVehiclePrice3] = useState<null | string>('');
    const [vehicleYear3, setVehicleYear3] = useState<null | string>('');
    const [vehicleIsDeposit3, setVehicleIsDeposit3] = useState<boolean>(false);

    const [isOpenVehicle2, setIsOpenVehicle2] = useState<boolean>(false);
    const [isOpenVehicle3, setIsOpenVehicle3] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setVehicleBrand1(answerList.vehicleBrand1 ?? '')
            setVehiclePrice1(answerList.vehiclePrice1 ?? '')
            setVehicleYear1(answerList.vehicleYear1 ?? '')
            setVehicleIsDeposit1(answerList.vehicleIsDeposit1 === "true" ?? '')

            /* Vehicle 2 */
            setVehicleBrand2(answerList.vehicleBrand2 ?? '')
            setVehiclePrice2(answerList.vehiclePrice2 ?? '')
            setVehicleYear2(answerList.vehicleYear2 ?? '')
            setVehicleIsDeposit2(answerList.vehicleIsDeposit2 === "true" ?? null)
            setIsOpenVehicle2((answerList.vehicleBrand2 || answerList.vehiclePrice2 || answerList.vehicleYear2) ? true : false)

            /* Vehicle 3 */
            setVehicleBrand3(answerList.vehicleBrand3 ?? '')
            setVehiclePrice3(answerList.vehiclePrice3 ?? '')
            setVehicleYear3(answerList.vehicleYear3 ?? '')
            setVehicleIsDeposit3(answerList.vehicleIsDeposit3 === "true" ?? null)
            setIsOpenVehicle3((answerList.vehicleBrand3 || answerList.vehiclePrice3 || answerList.vehicleYear3) ? true : false)
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const setIsOpenVehicle3Handler = (value: boolean) => {
        setIsOpenVehicle3(value)
    }
    const setIsOpenVehicle2Handler = (value: boolean) => {
        setIsOpenVehicle2(value)
    }

    const setVehicleBrand1Handler = (str: string | null) => {
        setVehicleBrand1(str)
    }
    const setVehiclePrice1Handler = (str: string | null) => {
        setVehiclePrice1(str)
    }
    const setVehicleYear1Handler = (str: string | null) => {
        setVehicleYear1(str)
    }
    const setVehicleIsDeposit1Handler = (value: boolean) => {
        setVehicleIsDeposit1(value)
    }

    /* Vehicle 2 */
    const setVehicleBrand2Handler = (str: string | null) => {
        setVehicleBrand2(str)
    }
    const setVehiclePrice2Handler = (str: string | null) => {
        setVehiclePrice2(str)
    }
    const setVehicleYear2Handler = (str: string | null) => {
        setVehicleYear2(str)
    }
    const setVehicleIsDeposit2Handler = (value: boolean) => {
        setVehicleIsDeposit2(value)
    }

    /* Vehicle 3 */
    const setVehicleBrand3Handler = (str: string | null) => {
        setVehicleBrand3(str)
    }
    const setVehiclePrice3Handler = (str: string | null) => {
        setVehiclePrice3(str)
    }
    const setVehicleYear3Handler = (str: string | null) => {
        setVehicleYear3(str)
    }
    const setVehicleIsDeposit3Handler = (value: boolean) => {
        setVehicleIsDeposit3(value)
    }

    const onClickSkipButtonHandler = () => {
        navigate('/assets-immovables-1')
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            vehicleBrand1: vehicleBrand1,
            vehiclePrice1: vehiclePrice1,
            vehicleYear1: vehicleYear1,
            vehicleIsDeposit1: !!vehicleIsDeposit1,

            /* Vehicle 2 */
            vehicleBrand2: (vehicleBrand2 && isOpenVehicle2) ? vehicleBrand2 : '',
            vehiclePrice2: (vehiclePrice2 && isOpenVehicle2) ? vehiclePrice2: '',
            vehicleYear2: (vehicleYear2 && isOpenVehicle2) ? vehicleYear2 : '',
            vehicleIsDeposit2: (!!vehicleIsDeposit2 && isOpenVehicle3) ? !!vehicleIsDeposit2 : false,

            /* Vehicle 3 */
            vehicleBrand3: (vehicleBrand3 && isOpenVehicle3) ? vehicleBrand3 : '',
            vehiclePrice3: (vehiclePrice3 && isOpenVehicle3) ? vehiclePrice3 : '',
            vehicleYear3: (vehicleYear3 && isOpenVehicle3) ? vehicleYear3 : '',
            vehicleIsDeposit3: (!!vehicleIsDeposit3 && isOpenVehicle3) ? !!vehicleIsDeposit3 : false
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
            navigate('/assets-immovables-1')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/client-finance')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Активы</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <p>Транспортное средство</p>
                    <FieldWrapper><TextInput onChange={setVehicleBrand1Handler} title={"Марка и модель"} currentValue={vehicleBrand1}/></FieldWrapper>
                    <FieldWrapper><TextInput onChange={setVehiclePrice1Handler} title={"Стоимость \u20bd"} currentValue={vehiclePrice1}/></FieldWrapper>
                    <FieldWrapper>
                        <div className={s.smallWrapper}>
                            <TextInput onChange={setVehicleYear1Handler} title={"Год выпуска"} currentValue={vehicleYear1} mods={"verySmall"}/>
                        </div>
                    </FieldWrapper>
                    <FieldWrapper><Checkbox value={"Находится в залоге"} onChange={setVehicleIsDeposit1Handler} currentValue={vehicleIsDeposit1}/></FieldWrapper>

                    <FieldWrapper>
                        <div className={classNames(s.optionalWrapper, isOpenVehicle2 && s.active)}>
                            {/*<Checkbox value={'Иное:'} currentValue={isOpenVehicle2} onChange={setIsOpenVehicle2Handler}/>*/}
                            <button className={s.addVehicleBtn} onClick={() => setIsOpenVehicle2Handler(!isOpenVehicle2)}>{!isOpenVehicle2 ? 'Добавить ТС (2)' : 'Удалить ТС (2)'}</button>
                            {isOpenVehicle2 &&
                                <div className={s.inputs}>
                                    <FieldWrapper><TextInput onChange={setVehicleBrand2Handler} title={"Марка и модель"} currentValue={vehicleBrand2}/></FieldWrapper>
                                    <FieldWrapper><TextInput onChange={setVehiclePrice2Handler} title={"Стоимость \u20bd"} currentValue={vehiclePrice2}/></FieldWrapper>
                                    <FieldWrapper>
                                        <div className={s.smallWrapper}>
                                            <TextInput onChange={setVehicleYear2Handler} title={"Год выпуска"} currentValue={vehicleYear2} mods={"verySmall"}/>
                                        </div>
                                    </FieldWrapper>
                                    <FieldWrapper><FieldWrapper><Checkbox value={"Находится в залоге"} onChange={setVehicleIsDeposit2Handler} currentValue={vehicleIsDeposit2}/></FieldWrapper></FieldWrapper>
                                </div>
                            }
                        </div>
                    </FieldWrapper>

                    <FieldWrapper>
                        <div className={classNames(s.optionalWrapper, isOpenVehicle3 && s.active)}>
                            {/*<Checkbox value={'Иное:'} currentValue={isOpenVehicle2} onChange={setIsOpenVehicle2Handler}/>*/}
                            <button className={s.addVehicleBtn} onClick={() => setIsOpenVehicle3Handler(!isOpenVehicle3)}>{!isOpenVehicle3 ? 'Добавить ТС (3)' : 'Удалить ТС (3)'}</button>
                            {isOpenVehicle3 &&
                                <div className={s.inputs}>
                                    <FieldWrapper><TextInput onChange={setVehicleBrand3Handler} title={"Марка и модель"} currentValue={vehicleBrand3}/></FieldWrapper>
                                    <FieldWrapper><TextInput onChange={setVehiclePrice3Handler} title={"Стоимость \u20bd"} currentValue={vehiclePrice3}/></FieldWrapper>
                                    <FieldWrapper>
                                        <div className={s.smallWrapper}>
                                            <TextInput onChange={setVehicleYear3Handler} title={"Год выпуска"} currentValue={vehicleYear3} mods={"verySmall"}/>
                                        </div>
                                    </FieldWrapper>
                                    <FieldWrapper><FieldWrapper><Checkbox value={"Находится в залоге"} onChange={setVehicleIsDeposit3Handler} currentValue={vehicleIsDeposit3}/></FieldWrapper></FieldWrapper>
                                </div>
                            }
                        </div>
                    </FieldWrapper>

                </div>
            </div>
            <div className={classNames(s.btnList, s.btns)}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
                {/*<Button onClick={onClickSkipButtonHandler} mods={"grey"}>Пропустить</Button>*/}
            </div>
        </div>
    );
};

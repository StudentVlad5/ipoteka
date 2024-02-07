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

export const VehicleThirdPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [vehicleBrand3, setVehicleBrand3] = useState<null | string>(null);
    const [vehiclePrice3, setVehiclePrice3] = useState<null | string>(null);
    const [vehicleYear3, setVehicleYear3] = useState<null | string>(null);
    const [vehicleIsDeposit3, setVehicleIsDeposit3] = useState<boolean>(false);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setVehicleBrand3(answerList.vehicleBrand3 ?? null)
            setVehiclePrice3(answerList.vehiclePrice3 ?? null)
            setVehicleYear3(answerList.vehicleYear3 ?? null)
            setVehicleIsDeposit3(answerList.vehicleIsDeposit3 === "true" ?? null)
        }
    }, [answerList])

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
            vehicleBrand3: vehicleBrand3,
            vehiclePrice3: vehiclePrice3,
            vehicleYear3: vehicleYear3,
            vehicleIsDeposit3: !!vehicleIsDeposit3
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

    return (
        <div className={classNames(s.RolePage)}>
            <h1 className={classNames(s.title)}>Активы</h1>
            <div className={classNames(s.main)}>
                <p>Транспортное средство #3</p>
                <TextInput onChange={setVehicleBrand3Handler} title={"Марка и модель"} currentValue={vehicleBrand3}/>
                <TextInput onChange={setVehiclePrice3Handler} title={"Стоимость"} currentValue={vehiclePrice3}/>
                <div className={s.smallWrapper}>
                    <TextInput onChange={setVehicleYear3Handler} title={"Год выпуска"} currentValue={vehicleYear3} mods={"verySmall"}/>
                </div>
                <Checkbox value={"Находится в залоге"} onChange={setVehicleIsDeposit3Handler} currentValue={vehicleIsDeposit3}/>
            </div>
            <div className={classNames(s.btnList)}>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
                <Button onClick={onClickSkipButtonHandler} mods={"grey"}>Пропустить</Button>
            </div>
        </div>
    );
};

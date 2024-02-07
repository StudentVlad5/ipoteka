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

export const VehicleSecondPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [vehicleBrand2, setVehicleBrand2] = useState<null | string>(null);
    const [vehiclePrice2, setVehiclePrice2] = useState<null | string>(null);
    const [vehicleYear2, setVehicleYear2] = useState<null | string>(null);
    const [vehicleIsDeposit2, setVehicleIsDeposit2] = useState<boolean>(false);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setVehicleBrand2(answerList.vehicleBrand2 ?? null)
            setVehiclePrice2(answerList.vehiclePrice2 ?? null)
            setVehicleYear2(answerList.vehicleYear2 ?? null)
            setVehicleIsDeposit2(answerList.vehicleIsDeposit2 === "true" ?? null)
        }
    }, [answerList])

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

    const onClickSkipButtonHandler = () => {
        navigate('/assets-Vehicle-3')
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            vehicleBrand2: vehicleBrand2,
            vehiclePrice2: vehiclePrice2,
            vehicleYear2: vehicleYear2,
            vehicleIsDeposit2: !!vehicleIsDeposit2
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
            navigate('/assets-Vehicle-3')
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
                <p>Транспортное средство #2</p>
                <TextInput onChange={setVehicleBrand2Handler} title={"Марка и модель"} currentValue={vehicleBrand2}/>
                <TextInput onChange={setVehiclePrice2Handler} title={"Стоимость"} currentValue={vehiclePrice2}/>
                <div className={s.smallWrapper}>
                    <TextInput onChange={setVehicleYear2Handler} title={"Год выпуска"} currentValue={vehicleYear2} mods={"verySmall"}/>
                </div>
                <Checkbox value={"Находится в залоге"} onChange={setVehicleIsDeposit2Handler} currentValue={vehicleIsDeposit2}/>
            </div>
            <div className={classNames(s.btnList)}>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
                <Button onClick={onClickSkipButtonHandler} mods={"grey"}>Пропустить</Button>
            </div>
        </div>
    );
};

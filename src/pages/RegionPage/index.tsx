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
import {FieldWrapper} from "../../ui/FieldWrapper";
import { FaAsterisk } from "react-icons/fa6";

export const RegionPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [region, setRegion] = useState<null | string>('');

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setRegion(answerList.cityOfAcquisition)
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    /*useMemo(() => {
        if (region) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [region])*/

    const setRegionHandler = (name: string | null) => {
        setRegion(name)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            cityOfAcquisition: region,
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
            navigate('/credit-info')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/credit-target')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={`${classNames(s.title)} contentTitle`}>Регион приобретения  {(region  !== "" && region  !== undefined && region !== null) ? <FaAsterisk style={{fill:'green', width: "15px", height:"15px", transform:"translateY(-10px)"}}/> : <FaAsterisk style={{fill:'grey', width: "15px", height:"15px", transform:"translateY(-10px)"}}/>}</h1>
                <div className={`${classNames(s.main)} contentMain`}>
                    <FieldWrapper><RadioButton id={"1"} name={"region"} value={"Москва"} currentValue={region} onChange={setRegionHandler}/></FieldWrapper>
                    <FieldWrapper><RadioButton id={"2"} name={"region"} value={"Санкт-Петербург"} currentValue={region} onChange={setRegionHandler}/></FieldWrapper>
                    <FieldWrapper><TextInput onChange={setRegionHandler} title={"Другой:"} currentValue={(region !== "Москва" && region !== "Санкт-Петербург") ? region : ''}/></FieldWrapper>
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

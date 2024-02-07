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
import {CellsInput} from "../../ui/CellsInput";
import {FieldWrapper} from "../../ui/FieldWrapper";
import {NumberInput} from "../../ui/NumberInput";
import {SixCellsInput} from "../../components/SixCellsInput";
import { FaAsterisk } from "react-icons/fa6";

export const ActualAddressPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [actualEqualRegistration, setActualEqualRegistration] = useState<boolean>(false);
    const [temporaryRegistration, setTemporaryRegistration] = useState<boolean>(false);
    const [actualRegistrationInfo, setActualRegistrationInfo] = useState<null | string>('');
    const [reasonsForResidence, setReasonsForResidence] = useState<null | string>('');
    const [specialMarks, setSpecialMarks] = useState<null | string>('');
    const [index, setIndex] = useState<null | string>('');
    const [country, setCountry] = useState<null | string>('');
    const [region, setRegion] = useState<null | string>('');
    const [district, setDistrict] = useState<null | string>('');
    const [locality, setLocality] = useState<null | string>('');
    const [house, setHouse] = useState<null | string>('');
    const [housing, setHousing] = useState<null | string>('');
    const [apartment, setApartment] = useState<null | string>('');
    const [street, setStreet] = useState<null | string>('');
    const [stayYear, setStayYear] = useState<null | string>('');
    const [stayMonths, setStayMonths] = useState<null | string>('');

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            /*setActualEqualRegistration(answerList.actualEqualRegistration === "true" ?? null)
            setActualEqualRegistration(answerList.temporaryRegistration === "true" ?? null)*/
            setActualRegistrationInfo(answerList.actualRegistrationInfo ?? '')
            setIndex(answerList.actualIndex ?? '')
            setCountry(answerList.actualCountry ?? '')
            setRegion(answerList.actualRegion ?? '')
            setDistrict(answerList.actualDistrict ?? '')
            setLocality(answerList.actualLocality ?? '')
            setHouse(answerList.actualHouse ?? '')
            setHousing(answerList.actualHousing ?? '')
            setApartment(answerList.actualApartment ?? '')
            setStreet(answerList.actualStreet ?? '')
            setReasonsForResidence(answerList.actualAddressReasonsForResidence ?? '')
            setSpecialMarks(answerList.actualAddressSpecialMarks ?? '')
            if (answerList.actualLengthOfStay) {
                const actualLengthOfStay = answerList.actualLengthOfStay.split(' ')
                setStayYear(actualLengthOfStay[0])
                setStayMonths(actualLengthOfStay[2])
            }
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const setActualRegistrationInfoHandler = (str: string | null) => {
        setActualRegistrationInfo(str)
    }
    const setTemporaryRegistrationHandler = (value: boolean) => {
        setTemporaryRegistration(value)
    }
    const setActualEqualRegistrationHandler = (value: boolean) => {
        setActualEqualRegistration(value)
    }
    const setSpecialMarksHandler = (str: string | null) => {
        setSpecialMarks(str)
    }
    const setReasonsForResidenceHandler = (str: string | null) => {
        setReasonsForResidence(str)
    }
    const setIndexHandler = (str: string | null) => {
        setIndex(str)
    }
    const setCountryHandler = (str: string | null) => {
        setCountry(str)
    }
    const setRegionHandler = (str: string | null) => {
        setRegion(str)
    }
    const setDistrictHandler = (str: string | null) => {
        setDistrict(str)
    }
    const setLocalityHandler = (str: string | null) => {
        setLocality(str)
    }
    const setHouseHandler = (str: string | null) => {
        setHouse(str)
    }
    const setHousingHandler = (str: string | null) => {
        setHousing(str)
    }
    const setApartmentHandler = (str: string | null) => {
        setApartment(str)
    }
    const setStreetHandler = (str: string | null) => {
        setStreet(str)
    }
    const setStayYearHandler = (str: string | null) => {
        setStayYear(str)
    }
    const setStayMonthsHandler = (str: string | null) => {
        setStayMonths(str)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            /*actualEqualRegistration: !!actualEqualRegistration,
            actualAddressReasonsForResidence: reasonsForResidence,*/
            actualRegistrationInfo: actualRegistrationInfo,
            actualIndex: index,
            actualCountry: country,
            actualRegion: region,
            actualDistrict: district,
            actualLocality: locality,
            actualHouse: house,
            actualHousing: housing,
            actualApartment: apartment,
            actualStreet: street,
            actualLengthOfStay: `${stayYear ?? 0} лет, ${stayMonths ?? 0} мес.`,
            actualAddressSpecialMarks: specialMarks,
            actualAddressReasonsForResidence: reasonsForResidence,
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
            navigate('/social-status')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/additional-conditions')
    }

    /*useMemo(() => {
        if (role !== "Созаёмщик") {
            setName(null)
            setDegree(null)
        }
    }, [role])*/

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Адрес фактического проживания</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <div className={s.wrapper}>
                        <FieldWrapper>
                            <RadioButton inputType={"checkbox"} name={"address"} id={"7"} value={"Адрес проживания совпадает с адресом регистрации"} onChange={setActualRegistrationInfoHandler} currentValue={actualRegistrationInfo}/>
                            <RadioButton inputType={"checkbox"} name={"address"} id={"8"} value={"Есть только временная регистрация (при отсутствии постоянной)"} onChange={setActualRegistrationInfoHandler} currentValue={actualRegistrationInfo}/>
                        </FieldWrapper>
                        {/*<FieldWrapper><CellsInput cellsCount={6} onChange={setIndexHandler} title={"Индекс"} currentValue={index}/></FieldWrapper>*/}

                        {/*<FieldWrapper><SixCellsInput currentValue={index ?? ''} setCurrentValue={setIndexHandler} title={"Индекс"}/></FieldWrapper>*/}
                        <FieldWrapper><TextInput inputMode={'numeric'} placeholder={'123456'} title={"Индекс"} onChange={setIndexHandler} currentValue={index} isNumberField={true} maxLength={6}/></FieldWrapper>

                        <FieldWrapper><TextInput onChange={setCountryHandler} title={"Страна"} currentValue={country} status={country}/></FieldWrapper>
                        <FieldWrapper><TextInput onChange={setRegionHandler} title={"Регион проживания (область, край и пр.)"} currentValue={region}/></FieldWrapper>
                        <FieldWrapper><TextInput onChange={setDistrictHandler} title={"Район"} currentValue={district}/></FieldWrapper>
                        <FieldWrapper><TextInput onChange={setLocalityHandler} title={"Населенный пункт"} currentValue={locality} status={locality}/></FieldWrapper>
                        <FieldWrapper><TextInput onChange={setStreetHandler} title={"Улица"} currentValue={street} status={street}/></FieldWrapper>

                        <FieldWrapper>
                            <div className={s.smallWrapper}>
                                <NumberInput onChange={setHouseHandler} title={"Дом"} mods={"verySmall"} currentValue={house}/>
                                <TextInput onChange={setHousingHandler} title={"Корпус"} mods={"verySmall"} currentValue={housing}/>
                                <NumberInput onChange={setApartmentHandler} title={"Квартира"} mods={"verySmall"} currentValue={apartment}/>
                            </div>
                            <div className={s.smallWrapper}>
                                <p>Срок проживания</p>
                                <NumberInput onChange={setStayYearHandler} title={"Лет"} mods={"verySmall"} currentValue={stayYear}/>
                                <NumberInput onChange={setStayMonthsHandler} title={"Мес"} mods={"verySmall"} currentValue={stayMonths}/>
                            </div>
                        </FieldWrapper>

                        <FieldWrapper>
                            <label htmlFor="reasonsForResidence">
                                <div className="asterisk">
                                    <p>Основание для проживания</p>
                                    {(reasonsForResidence  !== "" && reasonsForResidence  !== undefined && reasonsForResidence !== null) ? <FaAsterisk style={{fill:'green', width: "15px", height:"15px"}}/> : <FaAsterisk style={{fill:'grey', width: "15px", height:"15px"}}/>}
                                </div>
                                <RadioButton name={"reasonsForResidence"}
                                             id={"1"}
                                             onChange={setReasonsForResidenceHandler}
                                             value={"Собственность"} currentValue={reasonsForResidence ? reasonsForResidence : null}/>
                                <RadioButton name={"reasonsForResidence"}
                                             id={"2"}
                                             onChange={setReasonsForResidenceHandler}
                                             value={"Социальный найм"} currentValue={reasonsForResidence ? reasonsForResidence : null}/>
                                <RadioButton name={"reasonsForResidence"}
                                             id={"3"}
                                             onChange={setReasonsForResidenceHandler}
                                             value={"Аренда"} currentValue={reasonsForResidence ? reasonsForResidence : null}/>
                                <RadioButton name={"reasonsForResidence"}
                                             id={"4"}
                                             onChange={setReasonsForResidenceHandler}
                                             value={"Воинская часть"} currentValue={reasonsForResidence ? reasonsForResidence : null}/>
                                <RadioButton name={"reasonsForResidence"}
                                             id={"5"}
                                             onChange={setReasonsForResidenceHandler}
                                             value={"Жилье родственников"} currentValue={reasonsForResidence ? reasonsForResidence : null}/>
                            </label>
                        </FieldWrapper>
                        <FieldWrapper>
                            <label htmlFor="reasonsForResidence">
                                <p>Особые отметки</p>
                                <RadioButton name={"specialMarks"}
                                             id={"6"}
                                             onChange={setSpecialMarksHandler}
                                             value={"Коммунальная квартира"} currentValue={specialMarks ? specialMarks : null} inputType={"checkbox"}/>
                            </label>
                        </FieldWrapper>
                    </div>
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

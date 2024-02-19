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
import {NumberInput} from "../../ui/NumberInput";
import {TelInput} from "../../ui/TelInput";
import {CellsInput} from "../../ui/CellsInput";
import {FieldWrapper} from "../../ui/FieldWrapper";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {FourthCellsInput} from "../../components/FourthCellsInput";
import {SixCellsInput} from "../../components/SixCellsInput";
import {ElevenCellsInput} from "../../components/ElevenCellsInput";
import {TwelveCellsInput} from "../../components/TwelveCellsInput";
import { FaAsterisk } from "react-icons/fa6";

export const ClientInfoPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [name, setName] = useState<null | string>('');
    const [oldName, setOldName] = useState<null | string>('');
    const [reasonForChange, setReasonForChange] = useState<null | string>('');
    const [isRuCitizenship, setIsRuSitizenship] = useState<boolean>(false);
    const [gender, setGender] = useState<null | string>('');
    const [date, setDate] = useState<null | number>(new Date().getTime());

    /* Contacts */
    const [clientEmail, setClientEmail] = useState<string | null>('');
    const [clientPhoneNumber, setClientPhoneNumber] = useState<string | null>('');
    const [clientHomePhoneNumber, setClientPhoneHomeNumber] = useState<string | null>('');
    const [clientSnils, setClientSnils] = useState<string | null>('');
    const [clientINN, setClientINN] = useState<string | null>('');
    const [relativeNameAndPhoneNumber, setRelativeNameAndPhoneNumber] = useState<string | null>('');
    const [clientDriverLicense, setDriverLicense] = useState<string | null>('');
    const [clientInternationalPassport, setInternationalPassport] = useState<string | null>('');
    const [clientMilitaryID, setMilitaryID] = useState<string | null>('');

    /* Passport */
    const [passport, setPassport] = useState<null | string>('');
    const [passportNumber, setPassportNumber] = useState<null | string>('');
    const [passportSeries, setPassportSeries] = useState<null | string>('');
    const [passportDateOfIssue, setPassportDateOfIssue] = useState<null | number>(new Date().getTime());
    const [departmentCode, setDepartmentCode] = useState<null | string>('');
    const [issuedByWhom, setIssuedByWhom] = useState<null | string>('');
    const [registrationAddress, setRegistrationAddress] = useState<null | string>('');

    const [isChangedName, setIsChangedName] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (answerList) {
            setName(answerList.clientFullName || '')
            setOldName(answerList.clientOldFullName || '')
            setReasonForChange(answerList.reasonForChangeFullName || '')
            setIsRuSitizenship(answerList.isRuCitizenship === "true" ? true : false)
            setGender(answerList.clientGender || '')
            setDate(answerList.DOB || new Date().getTime())
            setIsChangedName((answerList.clientOldFullName || answerList.reasonForChangeFullName) ? true : false)

            /* Contacts */
            setClientEmail(answerList.clientEmail || '')
            setClientPhoneNumber(answerList.clientPhoneNumber || '')
            setClientPhoneHomeNumber(answerList.clientHomePhoneNumber || '')
            setClientSnils(answerList.clientSnils || '')
            setClientINN(answerList.clientINN || '')
            setRelativeNameAndPhoneNumber(answerList.relativeNameAndPhoneNumber || '')
            setDriverLicense(answerList.clientDriverLicense || '')
            setInternationalPassport(answerList.clientInternationalPassport || '')
            setMilitaryID(answerList.clientMilitaryID || '')

            /* Passport */
            // setPassport(answerList.passport)
            setPassportSeries(answerList.passportSeries || '')
            setPassportNumber(answerList.passportNumber || '')
            setPassportDateOfIssue(answerList.passportDateOfIssue || new Date().getTime())
            setDepartmentCode(answerList.departmentCode || '')
            setIssuedByWhom(answerList.issuedByWhom || '')
            setRegistrationAddress(answerList.registrationAddress || '')
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    /*useMemo(() => {
        if (isRuCitizenship) {
            setIsRuSitizenship(true)
        } else {
            setIsRuSitizenship(false)
        }
    }, [isRuCitizenship])*/

    useMemo(() => {
        /*if (name && gender && date) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
*/
    }, [name, oldName, reasonForChange, isRuCitizenship, gender, date])

    const setNameHandler = (str: string) => {
        setName(str)
    }
    const setOldNameHandler = (str: string) => {
        setOldName(str)
    }
    const setReasonForChangeHandler = (str: string) => {
        setReasonForChange(str)
    }
    const setIsRuSitizenshipHandler = (value: boolean) => {
        setIsRuSitizenship(value)
    }
    const setGenderHandler = (str: string | null) => {
        setGender(str)
    }
    const setDateHandler = (value: number | null) => {
        setDate(value)
    }

    /* Contacts */
    const setClientEmailHandler = (str: string | null) => {
        setClientEmail(str)
    }
    const setClientPhoneNumberHandler = (str: string | null) => {
        setClientPhoneNumber(str)
    }
    const setClientPhoneHomeNumberHandler = (str: string | null) => {
        setClientPhoneHomeNumber(str)
    }
    const setClientSnilsHandler = (str: string | null) => {
        setClientSnils(str)
    }
    const setClientINNHandler = (str: string | null) => {
        setClientINN(str)
    }
    const setRelativeNameAndPhoneNumberHandler = (str: string | null) => {
        setRelativeNameAndPhoneNumber(str)
    }
    const setDriverLicenseHandler = (str: string | null) => {
        setDriverLicense(str)
    }
    const setInternationalPassportHandler = (str: string | null) => {
        setInternationalPassport(str)
    }
    const setMilitaryIDHandler = (str: string | null) => {
        setMilitaryID(str)
    }

    /* Passport */
    const setPassportHandler = (str: string | null) => {
        setPassport(str)
    }
    const setPassportSeriesHandler = (str: string | null) => {
        setPassportSeries(str)
    }
    const setPassportNumberHandler = (str: string | null) => {
        setPassportNumber(str)
    }
    const setPassportDateOfIssueHandler = (value: number | null) => {
        setPassportDateOfIssue(value)
    }
    const setDepartmentCodeHandler = (str: string | null) => {
        setDepartmentCode(str)
    }
    const setIssuedByWhomHandler = (str: string | null) => {
        setIssuedByWhom(str)
    }
    const setRegistrationAddressHandler = (str: string | null) => {
        setRegistrationAddress(str)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            clientFullName: name,
            clientOldFullName: (isChangedName && oldName) ? oldName : '',
            reasonForChangeFullName: (isChangedName && reasonForChange) ? reasonForChange : '',
            isRuCitizenship: isRuCitizenship ? true : false,
            clientGender: gender,
            DOB: date,
            /* Contacts */
            clientEmail: clientEmail,
            clientPhoneNumber: clientPhoneNumber,
            clientHomePhoneNumber: clientHomePhoneNumber,
            clientSnils: clientSnils,
            clientINN: clientINN,
            relativeNameAndPhoneNumber: relativeNameAndPhoneNumber,
            clientDriverLicense: clientDriverLicense,
            clientInternationalPassport: clientInternationalPassport,
            clientMilitaryID: clientMilitaryID,
            /* Passport */
            // passport: passport,
            passportSeries: passportSeries,
            passportNumber: passportNumber,
            passportDateOfIssue: passportDateOfIssue,
            departmentCode: departmentCode,
            issuedByWhom: issuedByWhom,
            registrationAddress: registrationAddress
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
            navigate('/employment-status')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/role')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={`${classNames(s.title)} contentTitle`}>Информация о клиенте</h1>
                <div className={`${classNames(s.main)} contentMain`}>
                    <FieldWrapper>
                            <TextInput title={"ФИО клиента:"} onChange={setNameHandler} currentValue={name} status={name}/>
                        <div className={classNames(s.optionalWrapper, isChangedName && s.active)}>
                            <Checkbox value={"Менялось ФИО?"} onChange={(value:boolean) => setIsChangedName(value)} currentValue={isChangedName}/>
                            {isChangedName &&
                                <div className={s.inputs}>
                                        <TextInput title={"Укажите старые данные"} onChange={setOldNameHandler} currentValue={oldName}/>
                                         <TextInput title={"Причина изменения"} onChange={setReasonForChangeHandler} currentValue={reasonForChange}/>
                                </div>
                            }
                        </div>
                    </FieldWrapper>

                    <FieldWrapper>
                        <label htmlFor="gender" className={classNames(s.gender)}>
                            <div className='asterisk'>
                                <p className={'bold'}>Пол:</p>
                                {gender  !== undefined &&  gender  !== "" && gender !== null ? <FaAsterisk style={{fill:'green', width: "15px", height:"15px"}}/>: <FaAsterisk style={{fill:'grey', width: "15px", height:"15px"}}/>}
                            </div>
                            <RadioButton name={"gender"}
                                         id={"1"}
                                         onChange={setGenderHandler}
                                         value={"Мужской"} currentValue={gender}/>
                            <RadioButton name={"gender"}
                                         id={"2"}
                                         onChange={setGenderHandler}
                                         value={"Женский"} currentValue={gender}/>
                        </label>
                    </FieldWrapper>

                    <FieldWrapper>
                        <DateInput onChange={setDateHandler} title={"Дата рождения:"} currentValue={date ? +date : 0} status={date}/>
                    </FieldWrapper>

                    <FieldWrapper>
                        <Checkbox value={"Есть гражданство РФ"} onChange={setIsRuSitizenshipHandler} currentValue={isRuCitizenship}/>
                    </FieldWrapper>

                    {/*<FieldWrapper><FourthCellsInput title={"Серия паспорта"} currentValue={passportSeries ?? ''} setCurrentValue={setPassportSeriesHandler}/></FieldWrapper>*/}
                        <FieldWrapper>
                            <TextInput inputMode={'numeric'} placeholder={'1234'} title={"Серия паспорта"} onChange={setPassportSeriesHandler} currentValue={passportSeries} isNumberField={true} maxLength={4} status={passportSeries}/>
                        </FieldWrapper>
                    {/*<FieldWrapper><CellsInput cellsCount={6} onChange={setPassportNumberHandler} currentValue={passportNumber} title={"Номер паспорта"}/></FieldWrapper>*/}
                    {/*<FieldWrapper><SixCellsInput currentValue={passportNumber ?? ''} setCurrentValue={setPassportNumberHandler} title={"Номер паспорта"}/></FieldWrapper>*/}
                        <FieldWrapper><TextInput inputMode={'numeric'} placeholder={'123456'} title={"Номер паспорта"} onChange={setPassportNumberHandler} currentValue={passportNumber} isNumberField={true} maxLength={6} status={passportNumber}/></FieldWrapper>
                    {/*<FieldWrapper><CellsInput cellsCount={6} onChange={setDepartmentCodeHandler} currentValue={departmentCode} title={"Код подразделения"}/></FieldWrapper>*/}

                    {/*<FieldWrapper><SixCellsInput currentValue={departmentCode ?? ''} setCurrentValue={setDepartmentCodeHandler} title={"Код подразделения"}/></FieldWrapper>*/}
                    <FieldWrapper><TextInput inputMode={'numeric'} placeholder={'123456'} title={"Код подразделения"} onChange={setDepartmentCodeHandler} currentValue={departmentCode} isNumberField={true} maxLength={6} status={departmentCode}/></FieldWrapper>
                        <FieldWrapper><TextInput onChange={setIssuedByWhomHandler} currentValue={issuedByWhom} title={"Кем выдан"} status={issuedByWhom}/></FieldWrapper>
                        <FieldWrapper><TextInput onChange={setRegistrationAddressHandler} currentValue={registrationAddress} title={"Зарегистрирован(-а) по адресу"} status={registrationAddress}/></FieldWrapper>
                        <FieldWrapper><DateInput onChange={setPassportDateOfIssueHandler} currentValue={passportDateOfIssue ? +passportDateOfIssue : 0} title={"Дата выдачи"} status={passportDateOfIssue}/></FieldWrapper>
                    
                    {/* <FieldWrapper> */}
                        {/*<CellsInput onChange={setClientSnilsHandler} cellsCount={11} title={"СНИЛС"} currentValue={clientSnils}/>*/}
                        {/*<ElevenCellsInput currentValue={clientSnils ?? ''} setCurrentValue={setClientSnilsHandler} title={"СНИЛС"}/>*/}

                        <FieldWrapper><TextInput inputMode={'numeric'} placeholder={'12345678901'} title={"СНИЛС"} onChange={setClientSnilsHandler} currentValue={clientSnils} isNumberField={true} maxLength={11}/>
                        </FieldWrapper>
                    {/* </FieldWrapper> */}


                    <FieldWrapper>
                        {/*<CellsInput onChange={setClientINNHandler} cellsCount={12} title={"ИНН (Обязательно при отсутствии СНИЛС)"} currentValue={clientINN}/>*/}
                        {/*<TwelveCellsInput setCurrentValue={setClientINNHandler} currentValue={clientINN ?? ''} title={"ИНН (Обязательно при отсутствии СНИЛС)"}/>*/}
                        <FieldWrapper><TextInput inputMode={'numeric'} placeholder={'123456789012'} title={"ИНН (Обязательно при отсутствии СНИЛС)"} onChange={setClientINNHandler} currentValue={clientINN} isNumberField={true} maxLength={12}/></FieldWrapper>
                    </FieldWrapper>

                    <FieldWrapper>
                        <TextInput onChange={setClientEmailHandler} currentValue={clientEmail} title={"Электронная почта"}/>
                    </FieldWrapper>

                    <FieldWrapper>
                        <TelInput onChange={setClientPhoneNumberHandler} currentValue={clientPhoneNumber} title={"Мобильный телефон"} status={clientPhoneNumber}/>
                    </FieldWrapper>

                    <FieldWrapper>
                        <TelInput onChange={setClientPhoneHomeNumberHandler} currentValue={clientHomePhoneNumber} title={"Стационарный телефон"}/>
                    </FieldWrapper>

                    <FieldWrapper>
                        <TextInput onChange={setRelativeNameAndPhoneNumberHandler} currentValue={relativeNameAndPhoneNumber} title={"Телефон и имя родственника"}/>
                    </FieldWrapper>

                    <FieldWrapper>
                        <p className={s.subtitle}>Дополнительный документ:</p>
                        <TextInput onChange={setDriverLicenseHandler} currentValue={clientDriverLicense} title={"Водительское удостоверение"}/>
                    </FieldWrapper>

                    <FieldWrapper>
                        <TextInput onChange={setInternationalPassportHandler} currentValue={clientInternationalPassport} title={"Заграничный паспорт"}/>
                    </FieldWrapper>

                    <FieldWrapper>
                        <TextInput onChange={setMilitaryIDHandler} currentValue={clientMilitaryID} title={"Военный билет"}/>
                    </FieldWrapper>

                </div>
            </div>

            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} disabled={isDisabled} isLoading={isLoading} mods={"grey"}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

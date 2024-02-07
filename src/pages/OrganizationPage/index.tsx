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
import {FieldWrapper} from "../../ui/FieldWrapper";
import {TelInput} from "../../ui/TelInput";
import {CellsInput} from "../../ui/CellsInput";
import {TwelveCellsInput} from "../../components/TwelveCellsInput";

export const OrganizationPage = () => {
    const navigate = useNavigate();
    const {answerList} = useAppSelector(AnswerState);

    const [organizationName, setOrganizationName] = useState<null | string>('');
    const [actualOrganizationAddress, setActualOrganizationAddress] = useState<null | string>('');
    const [organizationIndustry, serOrganizationIndustry] = useState<null | string>('');
    const [organizationIndustryText, serOrganizationIndustryText] = useState<null | string>('');
    
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    /* ORG INFO */
    const [organizationStaffAmount, setOrganizationStaffAmount] = useState<null | string>('');
    const [organizationWebSite, setOrganizationWebSite] = useState<null | string>('');
    const [organizationPhoneNumber, setOrganizationPhoneNumber] = useState<null | string>('');
    const [organizationINN, setOrganizationINN] = useState<null | string>('');

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setOrganizationName(answerList.organizationName ?? '')
            setActualOrganizationAddress(answerList.organizationActualAddress ?? '')
            serOrganizationIndustry(answerList.organizationIndustry ?? '')
            serOrganizationIndustryText(answerList.organizationIndustryOther ?? '')

            /* ORG INFO */
            setOrganizationStaffAmount(answerList.organizationStaffAmount ?? '')
            setOrganizationWebSite(answerList.organizationWebSite ?? '')
            setOrganizationPhoneNumber(answerList.organizationPhoneNumber ?? '')
            setOrganizationINN(answerList.organizationINN ?? '')
        }
    }, [answerList])

    useMemo(() => {
        if (organizationIndustryText) {
            serOrganizationIndustry('')
        }
    }, [organizationIndustryText]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    /*useMemo(() => {
        if ((organizationName && actualOrganizationAddress) && (organizationIndustry || organizationIndustryText)) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [organizationName, actualOrganizationAddress, organizationIndustry, organizationIndustryText])*/

    const setOrganizationNameHandler = (str: null | string) => {
        setOrganizationName(str)
    }
    const setActualOrganizationAddressHandler = (str: null | string) => {
        setActualOrganizationAddress(str)
    }
    const serOrganizationIndustryHandler = (str: null | string) => {
        serOrganizationIndustry(str)
    }
    const serOrganizationIndustryTextHandler = (str: null | string) => {
        serOrganizationIndustryText(str)
    }

    /* ORG INFO */
    const setOrganizationStaffAmountHandler = (str: string | null) => {
        setOrganizationStaffAmount(str)
    }
    const setOrganizationWebSiteHandler = (str: string | null) => {
        setOrganizationWebSite(str)
    }
    const setOrganizationPhoneNumberHandler = (str: string | null) => {
        setOrganizationPhoneNumber(str)
    }
    const setOrganizationINNHandler = (str: string | null) => {
        setOrganizationINN(str)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            organizationName: organizationName,
            organizationActualAddress: actualOrganizationAddress,
            organizationIndustryOther: organizationIndustryText,
            organizationIndustry: organizationIndustry,

            /*  ORG INFO */
            organizationStaffAmount: organizationStaffAmount,
            organizationWebSite: organizationWebSite,
            organizationPhoneNumber: organizationPhoneNumber,
            organizationINN: organizationINN
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
            navigate('/work-experience')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/employment-info')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(s.title)}>Организация</h1>
                <div className={classNames(s.main)}>
                    <FieldWrapper>
                        <TextInput onChange={setOrganizationNameHandler}
                                   title={'Полное наименование организации-работодателя (с указанием ее организационно-правовой формы "ООО", "ПАО" и т.д)'}
                                   currentValue={organizationName}/>
                    </FieldWrapper>
                    <FieldWrapper>
                        <TextInput onChange={setActualOrganizationAddressHandler}
                                   title={"Фактический адрес организации"} currentValue={actualOrganizationAddress}/>
                    </FieldWrapper>

                    <FieldWrapper>
                        <label htmlFor="organiztionIndusrty">
                            <p>Отраслевая принадлежность</p>
                            <RadioButton id={"1"}
                                         name={"organiztionIndusrty"}
                                         value={"Адвокат/юрист"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"2"}
                                         name={"organiztionIndusrty"}
                                         value={"Социальная сфера"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"3"}
                                         name={"organiztionIndusrty"}
                                         value={"Транспорт/Судоходство"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"4"}
                                         name={"organiztionIndusrty"}
                                         value={"Сельское хозяйство"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"5"}
                                         name={"organiztionIndusrty"}
                                         value={"Вооруженные силы"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"6"}
                                         name={"organiztionIndusrty"}
                                         value={"Промышленность"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"7"}
                                         name={"organiztionIndusrty"}
                                         value={"Предприятия ТЭК"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"8"}
                                         name={"organiztionIndusrty"}
                                         value={"Строительство"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"9"}
                                         name={"organiztionIndusrty"}
                                         value={"Органы власти"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"10"}
                                         name={"organiztionIndusrty"}
                                         value={"Консалтинг"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"11"}
                                         name={"organiztionIndusrty"}
                                         value={"Медицина"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"12"}
                                         name={"organiztionIndusrty"}
                                         value={"Образование"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"13"}
                                         name={"organiztionIndusrty"}
                                         value={"Наука"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"14"}
                                         name={"organiztionIndusrty"}
                                         value={"Туризм"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"15"}
                                         name={"organiztionIndusrty"}
                                         value={"Нотариус"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"16"}
                                         name={"organiztionIndusrty"}
                                         value={"Торговля"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"17"}
                                         name={"organiztionIndusrty"}
                                         value={"ИТ/телеком"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"18"}
                                         name={"organiztionIndusrty"}
                                         value={"Финансы"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"19"}
                                         name={"organiztionIndusrty"}
                                         value={"Охрана"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <RadioButton id={"20"}
                                         name={"organiztionIndusrty"}
                                         value={"Услуги"}
                                         onChange={serOrganizationIndustryHandler} currentValue={organizationIndustry}/>
                            <TextInput onChange={serOrganizationIndustryTextHandler} title={"Другая отрасль:"}
                                       currentValue={organizationIndustryText}/>
                        </label>
                    </FieldWrapper>

                    <FieldWrapper>
                        <label htmlFor="organizationStaffAmount">
                            <p>Численность персонала</p>
                            <RadioButton id={"21"}
                                         name={"organizationStaffAmount"}
                                         value={"менее 10"}
                                         onChange={setOrganizationStaffAmountHandler} currentValue={organizationStaffAmount}/>
                            <RadioButton id={"22"}
                                         name={"organizationStaffAmount"}
                                         value={"10–50"}
                                         onChange={setOrganizationStaffAmountHandler} currentValue={organizationStaffAmount}/>
                            <RadioButton id={"23"}
                                         name={"organizationStaffAmount"}
                                         value={"50–100"}
                                         onChange={setOrganizationStaffAmountHandler} currentValue={organizationStaffAmount}/>
                            <RadioButton id={"24"}
                                         name={"organizationStaffAmount"}
                                         value={"100-200"}
                                         onChange={setOrganizationStaffAmountHandler} currentValue={organizationStaffAmount}/>
                            <RadioButton id={"25"}
                                         name={"organizationStaffAmount"}
                                         value={"200-500"}
                                         onChange={setOrganizationStaffAmountHandler} currentValue={organizationStaffAmount}/>
                            <RadioButton id={"26"}
                                         name={"organizationStaffAmount"}
                                         value={"более 500"}
                                         onChange={setOrganizationStaffAmountHandler} currentValue={organizationStaffAmount}/>
                        </label>
                    </FieldWrapper>
                    <FieldWrapper><TextInput onChange={setOrganizationWebSiteHandler} title={"Сайт организации"} currentValue={organizationWebSite}/></FieldWrapper>
                    <FieldWrapper><TelInput onChange={setOrganizationPhoneNumberHandler} title={"Телефон организации (Отдел кадров или бухгалтерия)"} currentValue={organizationPhoneNumber}/></FieldWrapper>
                    {/*<FieldWrapper><CellsInput cellsCount={12} onChange={setOrganizationINNHandler} title={"ИНН организации"} currentValue={organizationINN}/></FieldWrapper>*/}

                    {/*<FieldWrapper><TwelveCellsInput currentValue={organizationINN ?? ''} setCurrentValue={setOrganizationINNHandler} title={"ИНН организации"}/></FieldWrapper>*/}
                    <FieldWrapper><TextInput inputMode={'numeric'} placeholder={'123456789012'} title={"ИНН организации"} onChange={setOrganizationINNHandler} currentValue={organizationINN} isNumberField={true} maxLength={12}/></FieldWrapper>
                </div>
            </div>
            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

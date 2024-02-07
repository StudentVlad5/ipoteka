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
import {TelInput} from "../../ui/TelInput";
import {CellsInput} from "../../ui/CellsInput";
import {FieldWrapper} from "../../ui/FieldWrapper";
import {TwelveCellsInput} from "../../components/TwelveCellsInput";

export const OrganizationInfoPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [organizationStaffAmount, setOrganizationStaffAmount] = useState<null | string>(null);
    const [organizationWebSite, setOrganizationWebSite] = useState<null | string>(null);
    const [organizationPhoneNumber, setOrganizationPhoneNumber] = useState<null | string>(null);
    const [organizationINN, setOrganizationINN] = useState<null | string>(null);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);
    useMemo(() => {
        if (answerList) {
            setOrganizationStaffAmount(answerList.organizationStaffAmount)
            setOrganizationWebSite(answerList.organizationWebSite)
            setOrganizationPhoneNumber(answerList.organizationPhoneNumber)
            setOrganizationINN(answerList.organizationINN)
        }
    }, [answerList])

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

    return (
        <div className={classNames(s.RolePage)}>
            <h1 className={classNames(s.title)}>Организация</h1>
            <div className={classNames(s.main)}>
                <FieldWrapper>
                    <label htmlFor="organiztionIndusrty">
                        <p>Численность персонала</p>
                        <RadioButton id={"1"}
                                     name={"organiztionIndusrty"}
                                     value={"менее 10"}
                                     onChange={setOrganizationStaffAmountHandler} currentValue={organizationStaffAmount}/>
                        <RadioButton id={"2"}
                                     name={"organiztionIndusrty"}
                                     value={"10–50"}
                                     onChange={setOrganizationStaffAmountHandler} currentValue={organizationStaffAmount}/>
                        <RadioButton id={"3"}
                                     name={"organiztionIndusrty"}
                                     value={"50–100"}
                                     onChange={setOrganizationStaffAmountHandler} currentValue={organizationStaffAmount}/>
                        <RadioButton id={"4"}
                                     name={"organiztionIndusrty"}
                                     value={"100-200"}
                                     onChange={setOrganizationStaffAmountHandler} currentValue={organizationStaffAmount}/>
                        <RadioButton id={"5"}
                                     name={"organiztionIndusrty"}
                                     value={"200-500"}
                                     onChange={setOrganizationStaffAmountHandler} currentValue={organizationStaffAmount}/>
                        <RadioButton id={"6"}
                                     name={"organiztionIndusrty"}
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
            <div>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

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
import {NumberInput} from "../../ui/NumberInput";

export const SocialStatusPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [education, setEducation] = useState<null | string>('');
    const [socialStatus, setSocialStatus] = useState<any>(null);
    const [familyStatus, setFamilyStatus] = useState<string | null>('');
    const [marriageContract, setMarriageContract] = useState<string | null>('');
    const [partnerSocialStatus, setPartnerSocialStatus] = useState<any>(null);
    const [amountOfChildren, setAmountOfChildren] = useState<any>(null);
    const [childrenAge, setChildrenAge] = useState<any>(null);
    const [amountFamily, setAmountFamily] = useState<any>(null);
    const [dependents, setDependents] = useState<any>(null);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setEducation(answerList.education ?? '')
            setFamilyStatus(answerList.familyStatus ?? '')
            setMarriageContract(answerList.marriageContract ?? '')
            setPartnerSocialStatus(answerList.partnerSocialStatus ?? '')
            setAmountOfChildren(answerList.partnerSocialStatus ?? '')
            setAmountOfChildren(answerList.amountOfChildren ?? '')
            setChildrenAge(answerList.childrenAge ?? '')
            setAmountFamily(answerList.amountFamily ?? '')
            setDependents(answerList.amountDependents ?? '')
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const setEducationHandler = (str: string | null) => {
        setEducation(str)
    }
    const setFamilyStatusHandler = (str: string | null) => {
        setFamilyStatus(str)
    }
    const setMarriageContractHandler = (str: string | null) => {
        setMarriageContract(str)
    }
    const setPartnerSocialStatusHandler = (str: string | null) => {
        setPartnerSocialStatus(str)
    }
    const setAmountOfChildrenHandler = (str: string | null) => {
        setAmountOfChildren(str)
    }
    const setChildrenAgeHandler = (str: string | null) => {
        setChildrenAge(str)
    }
    const setAmountFamilyHandler = (str: string | null) => {
        setAmountFamily(str)
    }
    const setDependentsHandler = (str: string | null) => {
        setDependents(str)
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            education: education,
            familyStatus: familyStatus,
            marriageContract: marriageContract,
            partnerSocialStatus: partnerSocialStatus,
            amountOfChildren: amountOfChildren,
            childrenAge: childrenAge,
            amountFamily: amountFamily,
            amountDependents: dependents
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
            navigate('/employment-info')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/actual-address')
    }

    /*useMemo(() => {
        if (familyStatus) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [familyStatus])*/

    const educationFields = [
        'Ученая степень',
        'Два высших и более',
        'Высшее',
        'Неоконченное высшее',
        'Среднее специальное',
        'Среднее',
        'Ниже среднего',
        'Российское МВА',
        'Иностранное МВА'
    ]

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Социальный статус</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <FieldWrapper>
                        <p>Образование</p>
                        <RadioButton id={"12"} name={"education"} value={educationFields[0]} currentValue={education} onChange={setEducationHandler}/>
                        <RadioButton id={"13"} name={"education"} value={educationFields[1]} currentValue={education} onChange={setEducationHandler}/>
                        <RadioButton id={"14"} name={"education"} value={educationFields[2]} currentValue={education} onChange={setEducationHandler}/>
                        <RadioButton id={"15"} name={"education"} value={educationFields[3]} currentValue={education} onChange={setEducationHandler}/>
                        <RadioButton id={"16"} name={"education"} value={educationFields[4]} currentValue={education} onChange={setEducationHandler}/>
                        <RadioButton id={"17"} name={"education"} value={educationFields[5]} currentValue={education} onChange={setEducationHandler}/>
                        <RadioButton id={"18"} name={"education"} value={educationFields[6]} currentValue={education} onChange={setEducationHandler}/>
                        <RadioButton id={"19"} name={"education"} value={educationFields[7]} currentValue={education} onChange={setEducationHandler}/>
                        <RadioButton id={"20"} name={"education"} value={educationFields[8]} currentValue={education} onChange={setEducationHandler}/>
                        <TextInput title={"Другое:"} currentValue={(education && !educationFields.includes(education)) ? education : ''} onChange={setEducation} onFocus={() => {
                            if (education && educationFields.includes(education)) setEducation('')
                        }}/>
                    </FieldWrapper>

                    <FieldWrapper>
                        <label htmlFor="familyStatus">
                            <p>Семейное положение</p>
                            <RadioButton name={"familyStatus"}
                                         id={"1"}
                                         onChange={setFamilyStatusHandler}
                                         value={"Женат/замужем"} currentValue={familyStatus ? familyStatus : null}/>
                            <RadioButton name={"familyStatus"}
                                         id={"2"}
                                         onChange={setFamilyStatusHandler}
                                         value={"Гражданский брак"} currentValue={familyStatus ? familyStatus : null}/>
                            <RadioButton name={"familyStatus"}
                                         id={"3"}
                                         onChange={setFamilyStatusHandler}
                                         value={"Холост/не замужем"} currentValue={familyStatus ? familyStatus : null}/>
                            <RadioButton name={"familyStatus"}
                                         id={"4"}
                                         onChange={setFamilyStatusHandler}
                                         value={"Разведен(-а)"} currentValue={familyStatus ? familyStatus : null}/>
                            <RadioButton name={"familyStatus"}
                                         id={"5"}
                                         onChange={setFamilyStatusHandler}
                                         value={"Вдовец/вдова"} currentValue={familyStatus ? familyStatus : null}/>
                        </label>
                    </FieldWrapper>

                    <FieldWrapper>
                        <label htmlFor="marriageContract">
                            <p>Брачный контракт</p>
                            <RadioButton name={"marriageContract"}
                                         id={"6"}
                                         onChange={setMarriageContractHandler}
                                         value={"Есть"} currentValue={marriageContract ? marriageContract : null}/>
                            <RadioButton name={"marriageContract"}
                                         id={"7"}
                                         onChange={setMarriageContractHandler}
                                         value={"Нет"} currentValue={marriageContract ? marriageContract : null}/>
                            <RadioButton name={"marriageContract"}
                                         id={"8"}
                                         onChange={setMarriageContractHandler}
                                         value={"Будет заключен до сделки"} currentValue={marriageContract ? marriageContract : null}/>
                        </label>
                    </FieldWrapper>

                    <FieldWrapper>
                        <label htmlFor="partnerSocialStatus">
                            <p>Соц.статус супруга(-и)</p>
                            <RadioButton name={"partnerSocialStatus"}
                                         id={"9"}
                                         onChange={setPartnerSocialStatusHandler}
                                         value={"Работает"} currentValue={partnerSocialStatus ? partnerSocialStatus : null}/>
                            <RadioButton name={"partnerSocialStatus"}
                                         id={"10"}
                                         onChange={setPartnerSocialStatusHandler}
                                         value={"Не работает"} currentValue={partnerSocialStatus ? partnerSocialStatus : null}/>
                            <RadioButton name={"partnerSocialStatus"}
                                         id={"11"}
                                         onChange={setPartnerSocialStatusHandler}
                                         value={"На пенсии"} currentValue={partnerSocialStatus ? partnerSocialStatus : null}/>
                        </label>
                    </FieldWrapper>

                    <FieldWrapper>
                        <div className={s.smallWrapper}>
                            <NumberInput onChange={setAmountOfChildrenHandler} title={"Кол-во детей"} mods={"verySmall"} currentValue={amountOfChildren}/>
                            <TextInput onChange={setChildrenAgeHandler} title={"Возраст детей"} mods={"verySmall"} currentValue={childrenAge}/>
                        </div>
                    </FieldWrapper>

                    <FieldWrapper>
                        <div className={s.smallWrapper}>
                            <NumberInput onChange={setAmountFamilyHandler} title={"Членов семьи"} mods={"verySmall"} currentValue={amountFamily}/>
                            <NumberInput onChange={setDependentsHandler} title={"Иждивенцев"} mods={"verySmall"} currentValue={dependents}/>
                        </div>
                    </FieldWrapper>

                </div>
            </div>

            <div className={s.btns}>
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={'grey'}>Назад</Button>
                <Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Далее</Button>
            </div>
        </div>
    );
};

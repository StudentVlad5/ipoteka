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

export const LPHPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [LPHData, setLPHData] = useState<null | string>('');
    const [incomeFromCropProduction, setIncomeFromCropProduction] = useState<null | string>('');
    const [incomeFromFarming, setIncomeFromFarming] = useState<null | string>('');
    const [incomeNonAgr, setIncomeNonAgr] = useState<null | string>('');
    const [incomeTotal, setIncomeTotal] = useState<null | string>('');
    const [LPHDate, setLPHDate] = useState<null | number>(new Date().getTime());

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useMemo(() => {
        if (answerList) {
            setLPHData(answerList.LPHData ?? '')
            setIncomeFromCropProduction(answerList.incomeFromCropProduction ?? '')
            setIncomeFromFarming(answerList.incomeFromFarming ?? '')
            setIncomeNonAgr(answerList.incomeNonAgr ?? '')
            setIncomeTotal(answerList.incomeTotal ?? '')
            setLPHDate(answerList.LPHDate ?? new Date().getTime())
        }
    }, [answerList]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const setLPHDataHandler = (str: string | null) => {
        setLPHData(str)
    }
    const setIncomeFromCropProductionHandler = (str: string | null) => {
        setIncomeFromCropProduction(str)
    }
    const setIncomeNonAgrHandler = (str: string | null) => {
        setIncomeNonAgr(str)
    }
    const setIncomeFromFarmingHandler = (str: string | null) => {
        setIncomeFromFarming(str)
    }
    const setIncomeTotalHandler = (str: string | null) => {
        setIncomeTotal(str)
    }
    const setLPHDateHandler = (value: number | null) => {
        setLPHDate(value)
    }

    const onClickSkipButtonHandler = () => {
        navigate('/upload-files')
    }

    const onClickNextButtonHandler = async () => {
        const params = {
            deal_id: localStorage.getItem('deal_id') ?? '',
            LPHData: LPHData,
            incomeFromCropProduction: incomeFromCropProduction,
            incomeFromFarming: incomeFromFarming,
            incomeNonAgr: incomeNonAgr,
            incomeTotal: incomeTotal,
            LPHDate: LPHDate
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
            navigate('/other')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/assets-immovables-1')
    }

    return (
        <div className={classNames(s.RolePage)}>
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Личное подсобное хозяйство</h1>
                <div className={classNames(`${s.main} contentMain`)}>
                    <FieldWrapper>
                        <label htmlFor="LPHData">
                            <p>Данные о ЛПХ</p>
                            <RadioButton id={"1"}
                                         name={"LPHData"}
                                         value={"Веду личное подсобное хозяйство"}
                                         onChange={setLPHDataHandler} currentValue={LPHData}/>
                            <RadioButton id={"2"}
                                         name={"LPHData"}
                                         value={"ЛПХ учтено в похозяйственной книге"}
                                         onChange={setLPHDataHandler} currentValue={LPHData}/>
                            <RadioButton id={"3"}
                                         name={"LPHData"}
                                         value={"Есть земельный участок для веде-"}
                                         onChange={setLPHDataHandler} currentValue={LPHData}/>
                            <RadioButton id={"4"}
                                         name={"LPHData"}
                                         value={"Веду ЛПХ лично"}
                                         onChange={setLPHDataHandler} currentValue={LPHData}/>
                        </label>
                    </FieldWrapper>
                    <FieldWrapper><TextInput onChange={setIncomeFromCropProductionHandler} currentValue={incomeFromCropProduction} title={"Доход от растениеводства"}/></FieldWrapper>
                    <FieldWrapper><TextInput onChange={setIncomeFromFarmingHandler} currentValue={incomeFromFarming} title={"от животноводства"}/></FieldWrapper>
                    <FieldWrapper><TextInput onChange={setIncomeNonAgrHandler} currentValue={incomeNonAgr} title={"от несельскохоз. деятельности в сельской местности"}/></FieldWrapper>
                    <FieldWrapper><TextInput onChange={setIncomeTotalHandler} currentValue={incomeTotal} title={"Совокупный среднемесячный чистый доход /расход от владения ЛПХ"}/></FieldWrapper>
                    <FieldWrapper><DateInput onChange={setLPHDateHandler} title={"Дата первой записи в похозяйственной книге"} currentValue={LPHDate ? +LPHDate : 0}/></FieldWrapper>
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

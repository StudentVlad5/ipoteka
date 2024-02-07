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
import Skeleton from "../../ui/Skeleton";

export const SuccessPage = () => {
    const navigate = useNavigate();
    const { answerList } = useAppSelector(AnswerState);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

    useEffect(() => {
        /*const id = localStorage.getItem('id')
        if (!id) navigate('/')*/

        localStorage.removeItem('id')
        localStorage.removeItem('myself')
        localStorage.removeItem('deal_id')
        localStorage.removeItem('all-in-form')
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const onClickNextButtonHandler = async () => {
        localStorage.removeItem('id')
        localStorage.removeItem('myself')
        localStorage.removeItem('deal_id')
        navigate('/')
    }

    return (
        <div className={classNames(s.RolePage)}>
            { downloadLoading && <Skeleton/> }
            <h1 className={classNames(s.title)}>Спасибо, заявка подана</h1>
            <div className={classNames(s.main)}>
            </div>
            <div className={classNames(s.btnList)}>
                {/*<Button onClick={onClickNextButtonHandler} disabled={isDisabled} isLoading={isLoading}>Новая анкета</Button>*/}
            </div>
        </div>
    );
};

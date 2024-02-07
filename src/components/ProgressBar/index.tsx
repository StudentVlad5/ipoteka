import s from './index.module.scss';
import ListIcon from '../../common/assets/images/list.png';
import {useWindowDimensions} from "../../helpers/getWindowDimensionsHook";
import {Button} from "../../ui/Button";
import {useActions, useAppSelector} from "../../helpers/reduxHook";
import {AnswerActions, AnswerState} from "../../store/reducers/answer.reducer";
import {useDispatch} from "react-redux";
export const ProgressBar = ({
    progress
} : {
    progress: number
}) => {
    const dispatch = useDispatch();
    const { setIsOpenAction } = useActions(AnswerActions);
    const { width } = useWindowDimensions();

    const onClickOpenNavBtnHandler = () => {
        dispatch(setIsOpenAction(true))
    }
    const { answerList } = useAppSelector(AnswerState);
    // const id = localStorage.getItem('deal_id');
    const id = answerList.deal_id;

    return (
        <div className={s.ProgressBarWrapper}>
            <div className={s.titleBox}>
                {
                    width > 800 ?
                        <img className={s.img} src={ListIcon} alt="List Icon" />
                        :
                        <button onClick={onClickOpenNavBtnHandler} className={s.navBtn}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="-0.5 0 25 25"
                            >
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M2 12.32h20M2 18.32h20M2 6.32h20"
                                ></path>
                            </svg>
                        </button>
                }
                <span className={s.title}>Заполнение анкеты {(id && id !==undefined )? id : ""}</span>
                <span className={s.percentage}>({progress}%)</span>
            </div>
            <div className={s.progressBar}>
                <div className={s.line}>
                    <div className={s.progressLine} style={{width: `${progress ?? 0}%`}}></div>
                </div>
            </div>
        </div>
    );
};

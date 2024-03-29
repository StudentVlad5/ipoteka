import {ReactNode, useEffect, useMemo} from "react";
import { v4 as uuidv4 } from 'uuid';
import {baseUrl} from "../common/config";
import { useDispatch } from "react-redux";
import {AnswerActions, AnswerState} from "../store/reducers/answer.reducer";
import {useActions, useAppSelector} from "./reduxHook";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export const CheckIdProvider = ({
    children
} : {
    children: any
}) => {
    const {deal_id} = useParams()
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useDispatch();
    const { setAnswerListAction, setAnswerIsLoadingAction} = useActions(AnswerActions);

    useEffect(() => {
        if  (!localStorage.getItem('deal_id') && deal_id) {
            localStorage.removeItem('id')
            localStorage.removeItem('all-in-form')
        }
        if (localStorage.getItem('deal_id') && deal_id && localStorage.getItem('id')) {
            if (localStorage.getItem('deal_id') !== deal_id) {
                localStorage.removeItem('deal_id')
                localStorage.removeItem('id')
                localStorage.removeItem('myself')
                localStorage.removeItem('all-in-form')
            }
        }

        const id = localStorage.getItem("id")
        if (!id) {
            if (!deal_id) {
                navigate('/')
            } else {
                navigate(`/${deal_id}`)
            }
            // navigate('/')
            // localStorage.setItem('id', Date.now().toString())

        }
        if (id) {
            /* --- my self ---*/
            if (!localStorage.getItem('myself')) {
                navigate('/success')
            }

            if (location.pathname === '/') {
                if (localStorage.getItem('myself')) {
                    navigate('/role')
                } else {
                    navigate('/success')
                }
            }
            /* --- my self end --- */

            setAnswerIsLoadingAction(true)
            fetch(`${baseUrl}/read?identifier=${id}`, {
                method: "POST"
            }).then(res => res).then( async res => {
                const response = await res.json()
                if (!response.error) {
                    setAnswerListAction(response.normal)
                }
            }).finally(() => {
                setAnswerIsLoadingAction(false)
            })
        }

        if (localStorage.getItem('all-in-form')) {
            navigate('/all-in-form')
        }
    }, [location.pathname]);

    return children;
};

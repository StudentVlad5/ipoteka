import s from './index.module.scss';
import {useMemo, useRef, useState} from "react";
import classNames from "classnames";
import {threadId} from "worker_threads";

export const SixCellsInput = ({
    currentValue,
    setCurrentValue,
    title
} : {
    currentValue: string,
    setCurrentValue: (str: null | string) => void
    title: string
}) => {
    const [firstValue, setFirstValue] = useState('');
    const [secondValue, setSecondValue] = useState('');
    const [thirdValue, setThirdValue] = useState('');
    const [fourthValue, setFourthValue] = useState('');
    const [fiveValue, setFiveValue] = useState('');
    const [sixValue, setSixValue] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const firstRef = useRef<any>(null);
    const secondRef = useRef<any>(null);
    const thirdRef = useRef<any>(null);
    const fourthRef = useRef<any>(null);
    const fiveRef = useRef<any>(null);
    const sixRef = useRef<any>(null);

    function validate(evt:any) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
            return false
        }
        return true
    }

    useMemo(() => {
        if (currentValue) {
            setFirstValue(currentValue[0] ?? '')
            setSecondValue(currentValue[1] ?? '')
            setThirdValue(currentValue[2] ?? '')
            setFourthValue(currentValue[3] ?? '')
            setFiveValue(currentValue[4] ?? '')
            setSixValue(currentValue[5] ?? '')
        }
    }, [currentValue])

    useMemo(() => {
        setCurrentValue(`${firstValue + secondValue + thirdValue + fourthValue + fiveValue + sixValue}`)
    }, [firstValue, secondValue, thirdValue, fourthValue, fiveValue, sixValue])

    useMemo(() => {
        switch (currentIndex) {
            case 0:
                if (firstRef) firstRef?.current?.focus()
                break
            case 1:
                if (secondRef) secondRef?.current?.focus()
                break
            case 2:
                if (thirdRef) thirdRef?.current?.focus()
                break
            case 3:
                if (fourthRef) fourthRef?.current?.focus()
                break
            case 4:
                if (fiveRef) fiveRef?.current?.focus()
                break
            case 5:
                if (sixRef) sixRef?.current?.focus()
                break
            default:
                break
        }
    }, [currentIndex])

    const onChangeHandler = (e: any, setValue: any) => {
        setValue(e.target.value)
    }

    const onKeyDownHandler = (e: any) => {
        if (((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) && currentIndex < 5) setCurrentIndex(currentIndex + 1)
    }

    const onFocusHandler = (e:any) => {
        setCurrentIndex(+e.target.dataset.index)
    }

    return (
        <div className={classNames(s.cellInputWrapper)}>
            <span className={classNames(s.title)}>{title}</span>
            <div className={s.cells}>
                <input inputMode={"numeric"} maxLength={1} ref={firstRef} className={s.input} data-index={0} type="text" value={firstValue} onChange={(e) => onChangeHandler(e, setFirstValue)} onKeyDown={onKeyDownHandler} onFocus={onFocusHandler}/>
                <input inputMode={"numeric"} maxLength={1} ref={secondRef} className={s.input} data-index={1} type="text" value={secondValue} onChange={(e) => onChangeHandler(e, setSecondValue)} onKeyDown={onKeyDownHandler} onFocus={onFocusHandler}/>
                <input inputMode={"numeric"} maxLength={1} ref={thirdRef} className={s.input} data-index={2} type="text" value={thirdValue} onChange={(e) => onChangeHandler(e, setThirdValue)} onKeyDown={onKeyDownHandler} onFocus={onFocusHandler}/>
                <input inputMode={"numeric"} maxLength={1} ref={fourthRef} className={s.input} data-index={3} type="text" value={fourthValue} onChange={(e) => onChangeHandler(e, setFourthValue)} onKeyDown={onKeyDownHandler} onFocus={onFocusHandler}/>
                <input inputMode={"numeric"} maxLength={1} ref={fiveRef} className={s.input} data-index={4} type="text" value={fiveValue} onChange={(e) => onChangeHandler(e, setFiveValue)} onKeyDown={onKeyDownHandler} onFocus={onFocusHandler}/>
                <input inputMode={"numeric"} maxLength={1} ref={sixRef} className={s.input} data-index={5} type="text" value={sixValue} onChange={(e) => onChangeHandler(e, setSixValue)} onKeyDown={onKeyDownHandler} onFocus={onFocusHandler}/>
            </div>
        </div>
    );
};

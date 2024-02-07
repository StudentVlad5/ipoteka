import s from './index.module.scss';
import {useMemo, useRef, useState} from "react";
import classNames from "classnames";
import {threadId} from "worker_threads";

export const ElevenCellsInput = ({
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
    const [sevenValue, setSevenValue] = useState('');
    const [eightValue, setEightValue] = useState('');
    const [nineValue, setNineValue] = useState('');
    const [tenValue, setTenValue] = useState('');
    const [elevenValue, setElevenValue] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const firstRef = useRef<any>(null);
    const secondRef = useRef<any>(null);
    const thirdRef = useRef<any>(null);
    const fourthRef = useRef<any>(null);
    const fiveRef = useRef<any>(null);
    const sixRef = useRef<any>(null);
    const sevenRef = useRef<any>(null);
    const eightRef = useRef<any>(null);
    const nineRef = useRef<any>(null);
    const tenRef = useRef<any>(null);
    const elevenRef = useRef<any>(null);

    useMemo(() => {
        if (currentValue) {
            setFirstValue(currentValue[0] ?? '')
            setSecondValue(currentValue[1] ?? '')
            setThirdValue(currentValue[2] ?? '')
            setFourthValue(currentValue[3] ?? '')
            setFiveValue(currentValue[4] ?? '')
            setSixValue(currentValue[5] ?? '')
            setSevenValue(currentValue[6] ?? '')
            setEightValue(currentValue[7] ?? '')
            setNineValue(currentValue[8] ?? '')
            setTenValue(currentValue[9] ?? '')
            setElevenValue(currentValue[10] ?? '')
        }
    }, [currentValue])

    useMemo(() => {
        setCurrentValue(`${firstValue + secondValue + thirdValue + fourthValue + fiveValue + sixValue + sevenValue + eightValue + nineValue + tenValue + elevenValue}`)
    }, [firstValue, secondValue, thirdValue, fourthValue, fiveValue, sixValue, sevenValue, eightValue, nineValue, tenValue, elevenValue])

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
            case 6:
                if (sevenRef) sevenRef?.current?.focus()
                break
            case 7:
                if (eightRef) eightRef?.current?.focus()
                break
            case 8:
                if (nineRef) nineRef?.current?.focus()
                break
            case 9:
                if (tenRef) tenRef?.current?.focus()
                break
            case 10:
                if (elevenRef) elevenRef?.current?.focus()
                break
            default:
                break
        }
    }, [currentIndex])

    const onChangeHandler = (e: any, setValue: any) => {
        setValue(e.target.value)
    }

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

    const onKeyDownHandler = (e: any) => {
        if (((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) && currentIndex < 10) setCurrentIndex(currentIndex + 1)
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
                <input inputMode={"numeric"} maxLength={1} ref={sevenRef} className={s.input} data-index={6} type="text" value={sevenValue} onChange={(e) => onChangeHandler(e, setSevenValue)} onKeyDown={onKeyDownHandler} onFocus={onFocusHandler}/>
                <input inputMode={"numeric"} maxLength={1} ref={eightRef} className={s.input} data-index={7} type="text" value={eightValue} onChange={(e) => onChangeHandler(e, setEightValue)} onKeyDown={onKeyDownHandler} onFocus={onFocusHandler}/>
                <input inputMode={"numeric"} maxLength={1} ref={nineRef} className={s.input} data-index={8} type="text" value={nineValue} onChange={(e) => onChangeHandler(e, setNineValue)} onKeyDown={onKeyDownHandler} onFocus={onFocusHandler}/>
                <input inputMode={"numeric"} maxLength={1} ref={tenRef} className={s.input} data-index={9} type="text" value={tenValue} onChange={(e) => onChangeHandler(e, setTenValue)} onKeyDown={onKeyDownHandler} onFocus={onFocusHandler}/>
                <input inputMode={"numeric"} maxLength={1} ref={elevenRef} className={s.input} data-index={10} type="text" value={elevenValue} onChange={(e) => onChangeHandler(e, setElevenValue)} onKeyDown={onKeyDownHandler} onFocus={onFocusHandler}/>
            </div>
        </div>
    );
};

import s from './index.module.scss';
import classNames from "classnames";
import {useEffect, useMemo, useState} from "react";
import {log} from "util";

export const CellsInput = ({
    title,
    onChange,
    setValue,
    mods,
    currentValue,
    cellsCount
} : {
    title?: string
    onChange: (str: string) => void
    setValue?: () => void
    mods?: "small" | "verySmall"
    currentValue?: any
    cellsCount: number
}) => {
    const [initialValue, setInitialValue] = useState<Array<any>>(Array(cellsCount).fill(null));


    const array = Array(cellsCount).fill(null)

    function validate(evt:any) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
        evt.target.select()
    }

    const onKeyPressHandler = (e: any) => {

    }

    useMemo(() => {

        /*if (currentValue) {
            const currentArray = currentValue.toString().split('')
            initialValue.map((el, index) => {
                if (currentArray[index]) {
                    initialValue[index] = currentArray[index]
                }
            })
        }*/
        // console.log(currentValue[3])
    }, [currentValue]);

    return (
        <div className={classNames(s.CellsInput, mods ? s[mods] : "")}>
            {/*<span className={classNames(s.title)}>{title}</span>
            <input className={classNames(s.input)} type={"number"} onChange={(e: any) => onChange(e.target.value)} value={currentValue}/>*/}
            <span className={classNames(s.title)}>{title}</span>
            <div className={s.inputWrapper}>
                {
                    initialValue.map((value, index) => {
                        return (
                            <input key={index}
                                   className={classNames(s.input)}
                                   type={"text"}
                                   maxLength={1} min={0} max={9}
                                   value={value}
                                   onChange={(e: any) => {
                                       e.target.select()
                                       initialValue[index] = +e.target.value
                                       onChange(initialValue.filter(element => element != null).join(''))}}
                                   onKeyPress={validate}
                                   onFocus={(e) => {
                                       e.target.select()}}
                                   onBlur={(e) => e.target.select()}/>
                        )
                    })
                }
                {/*<input className={classNames(s.input)} onKeyDown={onKeyPressHandler}/>
                <input className={classNames(s.input)} onKeyDown={onKeyPressHandler}/>
                <input className={classNames(s.input)} onKeyDown={onKeyPressHandler}/>
                <input className={classNames(s.input)} onKeyDown={onKeyPressHandler}/>*/}
            </div>
            {/*<input className={classNames(s.input)} type={"number"} min={0} max={9}/>*/}
        </div>
    );
};

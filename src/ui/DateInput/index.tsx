import s from './index.module.scss';
import classNames from "classnames";
import DatePicker from "react-date-picker";
import {useMemo, useState} from "react";
import { FaAsterisk } from "react-icons/fa6";

export const DateInput = ({
    title,
    onChange,
    currentValue,
    status
} : {
    title?: string,
    onChange: (value: number | null) => void,
    currentValue?: any,
    status? : any
}) => {
    const [value, setValue] = useState<any>(new Date());

    useMemo(() => {
        if (currentValue) {
            setValue(new Date(currentValue))
        } else {
            setValue(new Date())
        }
    }, [currentValue])

    return (
        <div className={classNames(s.DateInput)}>
            <div>
                {title && <span className={classNames(s.title)}>{title}</span>}
                {status  === undefined ? '' : (status  === "" || status === null) ? <FaAsterisk style={{fill:'gray', width: "15px", height:"15px", transform:"translateY(-10px)"}}/>: <FaAsterisk style={{fill:'green', width: "15px", height:"15px", transform:"translateY(-10px)"}}/>}
            </div>
            <DatePicker value={value} onChange={(e: any) => onChange(new Date(e).getTime())}/>
        </div>
    );
};

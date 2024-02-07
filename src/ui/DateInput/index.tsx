import s from './index.module.scss';
import classNames from "classnames";
import DatePicker from "react-date-picker";
import {useMemo, useState} from "react";

export const DateInput = ({
    title,
    onChange,
    currentValue
} : {
    title?: string,
    onChange: (value: number | null) => void,
    currentValue?: any
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
            {title && <span className={classNames(s.title)}>{title}</span>}
            <DatePicker value={value} onChange={(e: any) => onChange(new Date(e).getTime())}/>
        </div>
    );
};

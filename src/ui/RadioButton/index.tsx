import s from './index.module.scss';
import {ReactNode, useEffect, useState} from "react";
import classNames from "classnames";

export const RadioButton = ({
    inputType = "radio",
    id,
    name,
    value,
    onChange,
    isDropdown,
    children,
    currentValue
}: {
    inputType?: "checkbox" | "radio"
    id: string
    name: string
    value: string
    onChange: (name:string | null) => void
    isDropdown?: boolean
    children?: ReactNode
    currentValue?: any
}) => {
    const [isActiveDropdown, setIsActiveDropdown] = useState<boolean>(false)
    useEffect(() => {
        if (currentValue === value && isDropdown) setIsActiveDropdown(true)
        else setIsActiveDropdown(false)
    }, [currentValue]);
    return (
        <label className={classNames(s.RadioButton, isActiveDropdown && s.dropdown)} htmlFor={id}>
            <input checked={currentValue === value} id={id} type={inputType} name={name} onChange={(e) => {
                if (!isDropdown) {
                    if (e.target.checked) {
                        onChange(value)
                    } else {
                        onChange(null)
                    }
                } else {
                    if (e.target.checked) {
                        onChange(value)
                        setIsActiveDropdown(true)
                    }
                    else {
                        onChange(null)
                        setIsActiveDropdown(false)
                    }
                }
            }}/>
            <span>{value}</span>
            { (isDropdown && isActiveDropdown) &&
                <div className={classNames(s.dropdownBox)}>
                    {children}
                </div>
            }
        </label>
    );
};

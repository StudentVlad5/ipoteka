import s from './index.module.scss';
import classNames from "classnames";
import {useState} from "react";

const Checkbox = ({
    value,
    onChange,
    currentValue
}: {
    value: any
    onChange: (value: any) => void
    currentValue?: any
}) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className={classNames(s.CheckboxWrapper)}>
            <label>
                <input
                    type="checkbox"
                    checked={!!currentValue}
                    onChange={(e: any) => {
                        setIsChecked(!isChecked);
                        if (e.target.checked) {
                            onChange(value)
                        } else {
                            onChange(null)
                        }
                    }}
                />
                <span
                    // className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
                    className={classNames(s.checkbox, isChecked ? s.checkboxActive : '')}
                    aria-hidden="true"
                />
                {value}
            </label>
        </div>
    );
};

export default Checkbox;

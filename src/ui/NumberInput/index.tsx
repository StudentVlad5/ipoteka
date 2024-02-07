import s from './index.module.scss';
import classNames from "classnames";
import { FaAsterisk } from "react-icons/fa6";

export const NumberInput = ({
    title,
    onChange,
    mods,
    currentValue,
    status
} : {
    title?: string
    onChange: (str: string) => void
    mods?: "small" | "verySmall"
    currentValue?: any
    status?: any
}) => {
    function validate(evt:any) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    return (
        <div className={classNames(s.NumberInput, mods ? s[mods] : "")}>
            <div>
                <span className={classNames(s.title)}>{title}</span>
                {status  === undefined ? '' : (status  === "" || status === null) ? <FaAsterisk style={{fill:'gray', width: "15px", height:"15px", transform:"translateY(-10px)"}}/>: <FaAsterisk style={{fill:'green', width: "15px", height:"15px", transform:"translateY(-10px)"}}/>}
            </div>
            <input className={classNames(s.input)} type={"number"} min={0} onChange={(e: any) => onChange(e.target.value)} value={currentValue} onKeyPress={validate}/>
        </div>
    );
};

import s from './index.module.scss';
import classNames from "classnames";

export const TelInput = ({
    title,
    onChange,
    currentValue
} : {
    title?: string
    onChange: (str: string) => void
    currentValue?: any
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
        <div className={classNames(s.TelInput)}>
            <span className={classNames(s.title)}>{title}</span>
            <input className={classNames(s.input)} type={"tel"} maxLength={12} onChange={(e: any) => onChange(e.target.value)} value={currentValue} onKeyPress={validate}/>
        </div>
    );
};

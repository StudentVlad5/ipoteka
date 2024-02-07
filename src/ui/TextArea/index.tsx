import s from './index.module.scss';

export const TextArea = ({
    onChange,
    currentValue,
    placeholder
} : {
    onChange: (str: string) => void,
    currentValue: string,
    placeholder?: string
}) => {
    return (
        <textarea className={s.textarea} onChange={e => onChange(e.target.value)} value={currentValue} placeholder={placeholder ?? ''}/>
    );
};

import classes from './Input.module.scss'
import type {ChangeEvent} from "react";



interface InputProps {
    placeholder?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    disabled?: boolean,
    max?: number
}

const Input = ({placeholder, onChange, value, disabled, max} : InputProps) => {

    return (
        <input maxLength={max} value={value} disabled={disabled} onChange={onChange} placeholder={placeholder} className={classes.input} />
    );
};

export default Input;
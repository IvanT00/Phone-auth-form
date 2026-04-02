import classes from './Input.module.scss'
import {type ChangeEvent, useState} from "react";
import formatPhone from "../../utils/formatPhone.ts";

interface InputProps {
    placeholder?: string
}

const Input = ({placeholder} : InputProps) => {
    const [displayValue, setDisplayValue] = useState<string>('');

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '');
        const formatted = formatPhone(digits);
        setDisplayValue(formatted);
    };
    return (
        <input value={displayValue} onChange={handleNumberChange} placeholder={placeholder} className={classes.input} />
    );
};

export default Input;
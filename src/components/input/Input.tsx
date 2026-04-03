import classes from './Input.module.scss'
import type {ChangeEvent} from "react";



interface InputProps {
    placeholder?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value?: string,
}

const Input = ({placeholder, onChange, value} : InputProps) => {

    return (
        <input value={value} onChange={onChange} placeholder={placeholder} className={classes.input} />
    );
};

export default Input;
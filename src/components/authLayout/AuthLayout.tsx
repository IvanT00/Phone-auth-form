import classes from './AuthLayout.module.scss';
import Input from "../input/Input.tsx";
import Button from "../button/Button.tsx";
import {type ReactNode} from "react";
import {type ChangeEvent, useState} from "react";
import formatPhone from "../../utils/formatPhone.ts";
import {useNavigate} from "react-router";

interface AuthLayoutProps {
    children?: ReactNode,
    title: string,
    subtitle: string,
    buttonText: string,
    resetText?: string,
    phoneValue?: string,
    isPhoneReadOnly?: boolean,
    buttonNavigateTo: string,
    errorMessage?: string
}

const AuthLayout = ({ children, title, subtitle, buttonText, buttonNavigateTo, errorMessage }: AuthLayoutProps) => {
    const navigate = useNavigate();
    const [displayValue, setDisplayValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '');
        const formatted = formatPhone(digits);
        setDisplayValue(formatted);
        setError(false);
    };

    const handleButtonClick = () => {
        const digits = displayValue.replace(/\D/g, '');
        console.log(digits);
        if (digits.length === 0) {
            setError(true);
            return;
        }
        if(digits.length > 10) {
            setError(false);
            navigate(buttonNavigateTo);
        }
    };

    return (
        <div className={'container'}>
            <div className={classes.auth__container}>
                <h2 className={classes.auth__title}>{title}</h2>
                <div className={classes.auth__phoneField}>
                    <p className={classes.auth__subtitle}>{subtitle}</p>
                    <Input
                        value={displayValue}
                        onChange={handleNumberChange}
                        placeholder={'Телефон'}
                    />
                    {children}
                </div>
                <Button onClick={handleButtonClick}>{buttonText}</Button>
                {error && (
                    <span className={classes.auth__voidInput}>{errorMessage}</span>
                )}
            </div>
        </div>
    );
};

export default AuthLayout;
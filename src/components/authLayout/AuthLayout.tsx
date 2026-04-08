import classes from './AuthLayout.module.scss';
import Input from "../input/Input.tsx";
import Button from "../button/Button.tsx";
import {type ChangeEvent, type ReactNode} from "react";


interface AuthLayoutProps {
    children?: ReactNode,
    title: string,
    subtitle: string,
    buttonText: string,
    resetText?: string,
    phoneValue?: string,
    isPhoneReadOnly?: boolean,
    errorMessage?: string,
    inputValue?: string,
    inputHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    buttonHandler: () => void,
    error: boolean
}

const AuthLayout = ({ children, title, subtitle, buttonText, inputValue, inputHandler, errorMessage, buttonHandler, error }: AuthLayoutProps) => {
    

    return (
        <div className={'container'}>
            <div className={classes.auth__container}>
                <h2 className={classes.auth__title}>{title}</h2>
                <div className={classes.auth__phoneField}>
                    <p className={classes.auth__subtitle}>{subtitle}</p>
                    <Input
                        value={inputValue}
                        onChange={inputHandler}
                        placeholder={'Телефон'}
                    />
                    {children}
                </div>
                <Button onClick={buttonHandler}>{buttonText}</Button>
                {error && (
                    <span className={classes.auth__voidInput}>{errorMessage}</span>
                )}
            </div>
        </div>
    );
};

export default AuthLayout;
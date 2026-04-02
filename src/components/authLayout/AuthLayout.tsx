import classes from './AuthLayout.module.scss';
import Input from "../input/Input.tsx";
import Button from "../button/Button.tsx";
import type {ReactNode} from "react";

interface AuthLayoutProps {
    children?: ReactNode,
    title: string,
    subtitle: string,
    buttonText: string,
    resetText?: string,
    phoneValue?: string,
    isPhoneReadOnly?: boolean

}

const AuthLayout = ({
                        children,
                        title,
                        subtitle,
                        buttonText,
                        resetText,
                        phoneValue,
                        isPhoneReadOnly
}: AuthLayoutProps) => {
    return (
        <div className={'container'}>
            <div className={classes.auth__container}>
                <h2 className={classes.auth__title}>{title}</h2>
                <div className={classes.auth__phoneField}>
                    <p className={classes.auth__subtitle}>{subtitle}</p>
                    <Input placeholder={'Телефон'} />
                    {children}
                </div>
                <Button>{buttonText}</Button>
            </div>
        </div>
    );
};

export default AuthLayout;
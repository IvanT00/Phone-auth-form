import classes from './OtpVerificationPage.module.scss'

import AuthLayout from "../../components/authLayout/AuthLayout.tsx";
import Input from "../../components/input/Input.tsx";
import {type ChangeEvent, useState} from "react";

const OtpVerificationPage = () => {
    const [value, setValue] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <AuthLayout
            title="Вход"
            subtitle="Введите проверочный код для входа в личный кабинет"
            buttonText="Войти"
            buttonNavigateTo={'/auth/phone'}
            errorMessage="Поле является обязательным"
        >
            <div className={classes.inputContainer}>
                <Input value={value} onChange={handleChange} placeholder={"Проверочный код"}/>
            </div>
        </AuthLayout>
    );
};

export default OtpVerificationPage;
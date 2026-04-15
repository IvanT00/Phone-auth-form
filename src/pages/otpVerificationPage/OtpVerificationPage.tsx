import classes from './OtpVerificationPage.module.scss';
import AuthLayout from "../../components/authLayout/AuthLayout.tsx";
import Input from "../../components/input/Input.tsx";
import { type ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const OtpVerificationPage = () => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    const phone = location.state?.phone;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '');
        setValue(digits);
    };

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e, '111');
    };

    const getAuth = async (otpCode: number, phone: string): Promise<boolean> => {
        const options = {
            method: 'POST',
            url: 'https://juniorsbootcamp.ru/api/users/signin',
            headers: { 'Content-Type': 'application/json' },
            data: { phone: phone, code: otpCode }
        };
        try {
            const res = await axios.request(options);
            console.log(res.data);
            return res.data.success;
        } catch (e) {
            if (e.response) {
                console.error('Статус:', e.response.status);
                console.error('Данные ошибки:', e.response.data);
        } else {
            console.error('Ошибка запроса:', e.message);
        }
        return false;
        }
    };

    const handleClickButton = async () => {
        if (!phone) {
            console.error('Номер телефона не передан');
            navigate('/auth/phone');
            return;
        }

        if (value.length !== 6) {
            setError(true);
            return;
        }

        setError(false);
        const num = Number(value);
        const newNumPhone = '8' + phone.slice(2).replace(/\s/g, '');
        console.log(newNumPhone);
        console.log(typeof newNumPhone);
        console.log(num);
        console.log(typeof num);
        const res = await getAuth(num, newNumPhone); 
        console.log(res)
        if (res) {
            console.log('heh');
        } else {
            console.log('Ошибка авторизации');
        }
    };

    return (
        <AuthLayout
            title="Вход"
            subtitle="Введите проверочный код для входа в личный кабинет"
            buttonText="Войти"
            buttonHandler={handleClickButton}
            buttonNavigateTo={'/auth/phone'}
            errorMessage="Код должен содержать 6 цифр"
            inputValue={phone || ''}    
            disabled={true}
            inputHandler={handleNumberChange}
            error={error}
        >
            <div className={classes.inputContainer}>
                <Input max={6} value={value} onChange={handleChange} placeholder={"Проверочный код"} />
            </div>
        </AuthLayout>
    );
};

export default OtpVerificationPage;
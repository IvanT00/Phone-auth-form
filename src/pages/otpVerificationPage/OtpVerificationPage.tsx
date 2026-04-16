import classes from './OtpVerificationPage.module.scss';
import AuthLayout from "../../components/authLayout/AuthLayout.tsx";
import Input from "../../components/input/Input.tsx";
import { type ChangeEvent, useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const OtpVerificationPage = () => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [otpError, setOtpError] = useState<boolean>(false);
    const [timer, setTimer] = useState<number | null>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const phone = location.state?.phone;
    const delay = location.state?.delay;

    const resendOtp = async () => {
        if (!phone) return;

        const options = {
            method: 'POST',
            url: 'https://juniorsbootcamp.ru/api/auth/otp',
            headers: { 'Content-Type': 'application/json' },
            data: { phone: phone }
        };
        try {
            const res = await axios.request(options);
            const newDelay = res.data.retryDelay;
            if (newDelay && typeof newDelay === 'number' && newDelay > 0) {
                const seconds = Math.floor(newDelay / 1000);
                setTimer(seconds);
            } else {
                setTimer(null);
            }
            setOtpError(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (delay && typeof delay === 'number' && delay > 0) {
            const seconds = Math.floor(delay / 1000);
            setTimer(seconds);
        } else {
            setTimer(null);
        }
    }, [delay]);

    useEffect(() => {
        if (timer === null || timer <= 0) return;

        const intervalId = setInterval(() => {
            setTimer(prev => {
                if (prev === null || prev <= 1) {
                    clearInterval(intervalId);
                    return null;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '');
        setValue(digits);
    };

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
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
            return res.data.success;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    const handleClickButton = async () => {
        if (!phone) {
            navigate('/auth/phone');
            return;
        }

        if (value.length !== 6) {
            setError(true);
            setOtpError(false);
            return;
        }

        setError(false);
        const num = Number(value);
        const newNumPhone = '8' + phone.slice(2).replace(/\s/g, '');
        const res = await getAuth(num, newNumPhone);
        if (res) {
            console.log(res);
        } else {
            setOtpError(true);
        }
    };

    return (
        <>
            <AuthLayout
                title="Вход"
                subtitle="Введите проверочный код для входа в личный кабинет"
                buttonText="Войти"
                buttonHandler={handleClickButton}
                errorMessage="Код должен содержать 6 цифр"
                inputValue={phone || ''}
                disabled={true}
                inputHandler={handleNumberChange}
                error={error}
            >
                <div className={classes.inputContainer}>
                    <Input max={6} value={value} onChange={handleChange} placeholder={"Проверочный код"} />
                    {otpError && <div style={{paddingTop: '16px', color: 'red'}}>Неправильный отп код</div>}
                </div>
            </AuthLayout>
            {timer !== null && timer > 0 ? (
                <div className={classes.timerContainer}>
                    Повторить отправку кода через {timer} секунд
                </div>
            ) : (
                <div
                    className={classes.timerContainerEnd}
                    onClick={resendOtp}
                >
                    Запросить код ещё раз
                </div>
            )}
        </>
    );
};

export default OtpVerificationPage;
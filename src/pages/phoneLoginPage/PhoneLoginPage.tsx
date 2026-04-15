// import classe from './PhoneLoginPage.module.scss'
import AuthLayout from "../../components/authLayout/AuthLayout.tsx";
import {type ChangeEvent, useState} from "react";
import formatPhone from "../../utils/formatPhone.ts";
import {data, useNavigate} from "react-router";
import axios from "axios";

const PhoneLoginPage = () => {
    const navigate = useNavigate();
    const [displayValue, setDisplayValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '');
        const formatted = formatPhone(digits);
        setDisplayValue(formatted);
        setError(false);
    };

    const getOtp = async(value: string) =>{
        const options = {
            method: 'POST',
            url: 'https://juniorsbootcamp.ru/api/auth/otp',
            headers: {'Content-Type': 'application/json'},
            data: {phone: value}
        };
        try{
            const res = await axios.request(options);
            console.log(res.data);
            return res.data.success;
        }catch(e){
           console.log(e, '((((((');
        }
    }

    const handleButtonClick = async() => {
        const digits = displayValue.replace(/\D/g, '');
        if (digits.length === 0) {
            setError(true);
            return;
        }
        if(digits.length === 11) {
            setError(false);
            const res = await getOtp(displayValue);
            if (res === true) {
                navigate("/auth/otp", { state: { phone: displayValue } });
            }
            
        }
        
    };
    return (
        <AuthLayout
            inputValue={displayValue}
            inputHandler={handleNumberChange}
            buttonHandler={handleButtonClick}
            error={error}
            title="Вход"
            subtitle="Введите номер телефона для входа в личный кабинет"
            buttonText="Продолжить"
            errorMessage="Поле является обязательным"
        >
            
        </AuthLayout>
    );
};

export default PhoneLoginPage;
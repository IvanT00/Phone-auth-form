// import classe from './PhoneLoginPage.module.scss'
import AuthLayout from "../../components/authLayout/AuthLayout.tsx";

const PhoneLoginPage = () => {
    return (
        <AuthLayout
            title="Вход"
            subtitle="Введите номер телефона для входа в личный кабинет"
            buttonText="Продолжить"
            buttonNavigateTo={"/auth/otp"}
            errorMessage="Поле является обязательным"
        >
        </AuthLayout>
    );
};

export default PhoneLoginPage;
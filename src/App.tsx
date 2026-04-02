import AuthLayout from "./components/authLayout/AuthLayout.tsx";

const App = () => {
    return (
        <AuthLayout
            title="Вход"
            subtitle="Введите номер телефона для входа в личный кабинет"
            buttonText="Продолжить"
        >
        </AuthLayout>
    );
};

export default App;
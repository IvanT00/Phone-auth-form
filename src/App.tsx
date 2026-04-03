import {Navigate, Route, Routes} from "react-router";
import PhoneLoginPage from "./pages/phoneLoginPage/PhoneLoginPage.tsx";
import OtpVerificationPage from "./pages/otpVerificationPage/OtpVerificationPage.tsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/phone" replace/>}/>
                <Route path="/auth/phone" element={<PhoneLoginPage/>}/>
                <Route path="/auth/otp" element={<OtpVerificationPage/>}/>
            </Routes>

        </>
    );
};

export default App;
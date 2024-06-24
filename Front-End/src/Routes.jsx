import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CompanyRegister from "./pages/CompanyRegister";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/Home/:companyId/:userId" element={<Home />}></Route>
                <Route path="/Register" element={<Register />}></Route>
                <Route path="/Register/Company/:userId" element={<CompanyRegister />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
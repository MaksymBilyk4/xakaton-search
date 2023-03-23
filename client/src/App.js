import Header from "./components/Header/Header";
import MainRoutes from "./routes/MainRoutes";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
import {PATH} from "./utils/constants";

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate(PATH.GITHUB)
        }
    }, []);

    return <>
        <Header/>
        <MainRoutes/>
    </>
}

export default App;

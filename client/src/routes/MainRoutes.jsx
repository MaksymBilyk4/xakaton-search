import {useRoutes} from "react-router-dom";
import {routes} from "./routes.js";

const MainRoutes = () => {
    return useRoutes(routes());
}

export default MainRoutes;
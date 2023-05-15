import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import StartPage from "./src/strartPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />
  },
  {
    path: '/:roomName',
    element: <StartPage/>,
  },
])
export default router

import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import StartPage from "./src/strartPage";
import Room from "./src/components/room/Room";

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />
  },
  {
    path: '/:roomName',
    element: <Room/>,
  },
])
export default router

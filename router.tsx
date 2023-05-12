import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import CreateRoom from "./src/components/Room/CreateRoom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/createRoom',
        element: <CreateRoom/>
      }
    ]
  },

])
export default router

import { configureStore } from '@reduxjs/toolkit'
import sliceRoom from "../components/room/sliceRoom";

export default configureStore({
  reducer: {sliceRoom},
})

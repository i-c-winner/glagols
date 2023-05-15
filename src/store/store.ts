import { configureStore } from '@reduxjs/toolkit'
import sliceRoom from "../components/Room/sliceRoom";

export default configureStore({
  reducer: {sliceRoom},
})

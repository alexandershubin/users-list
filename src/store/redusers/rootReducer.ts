import {configureStore} from "@reduxjs/toolkit";
import {usersSlice} from "./store";

const store = configureStore({
    reducer: {
        users: usersSlice.reducer
    },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

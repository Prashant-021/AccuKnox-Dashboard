import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./dashboardSlice";
import { loadState, saveState } from "../utils/localstorage";

const persistedState = loadState();
const store = configureStore({
    reducer: {
        dashboard: dashboardSlice
    },
    preloadedState: {
        dashboard: persistedState || undefined
    }
})

store.subscribe(() => {
    saveState(store.getState().dashboard);
})

export default store;
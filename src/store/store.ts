import gitHubReducer from './github/github.slice';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { githubApi } from "./github/github.api";

export const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer,
        github: gitHubReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
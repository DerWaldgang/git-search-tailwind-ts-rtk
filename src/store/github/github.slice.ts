import { IRepo } from './../../models/IRepos';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const SStore_FAV_KEY = 'gthb'

interface gitHubInitialState {
    favorite: IRepo[]
}

const initialState: gitHubInitialState = {
    favorite: JSON.parse(sessionStorage.getItem(SStore_FAV_KEY) ?? '[]')
}

// JSON.parse(sessionStorage.getItem(SStore_FAV_KEY) ?? '[]') -> 
// если слева от ?? => false, тогда подставь, то что справа => []

export const gitHubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addToFavoriteAction: (state, action: PayloadAction<IRepo>) => {
            state.favorite.push(action.payload)
            sessionStorage.setItem(SStore_FAV_KEY, JSON.stringify(state.favorite))

        },
        removeFromFavoriteAction: (state, action: PayloadAction<IRepo>) => {
            state.favorite = state.favorite.filter(repo => repo.id !== action.payload.id)
            sessionStorage.setItem(SStore_FAV_KEY, JSON.stringify(state.favorite))
        }
    }
})


export const gitHubActions = gitHubSlice.actions
export default gitHubSlice.reducer // in store => import gitHubReducer
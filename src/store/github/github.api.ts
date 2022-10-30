import { IUser, ServerResponse } from '../../models/IUser';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IRepo } from '../../models/IRepos';

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    refetchOnFocus: true,
    endpoints: (build) => ({
        searchUsers: build.query<IUser[], string>({
            query: (search: string) => ({
                url: 'search/users',
                params: {
                    q: search,
                    per_page: 10,
                }
            }),
            transformResponse: (response: ServerResponse<IUser>) => response.items // в каком виде будет дата
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`
            })
        })
    })
})

//  build.query<any, string> - первый дженерик(что ожидаем от сервера), второе(что мы передаем как параметр)
export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi
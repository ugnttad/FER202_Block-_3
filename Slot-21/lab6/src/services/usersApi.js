import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        getUsers: builder.query({ query: () => 'users' }),
        getUser: builder.query({ query: (id) => `users/${id}` }),
    }),
});


export const { useGetUsersQuery, useGetUserQuery } = usersApi;
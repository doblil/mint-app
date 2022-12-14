import { api } from "./api";

export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url: '/api/register',
                method: 'POST',
                body: credentials
            }),
        }),
    }),
});

export const  { useRegisterMutation } =  authApi;

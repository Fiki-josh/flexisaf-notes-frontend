import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders: (Headers, {getState}) => {
        const token = getState().auth.token

        if(token){
            Headers.set("authorization", `Bearer ${token}`)
        }
        return Headers
    }
})

const baseQueryWithReauth = async (args,api,extraoptions) => {

    let result =  await baseQuery(args, api, extraoptions);

    if(result?.error?.status === 403){
        
        let refreshResult = await baseQuery('/auth/refresh', api, extraoptions)

        if(refreshResult?.data){

            api.dispatch(setCredentials({...refreshResult.data}))

            result =  await baseQuery(args, api, extraoptions);
        }
        else{
            if(refreshResult?.error?.status === 403){
                refreshResult.error.data.message = "Your login has expired"
            }
            return refreshResult
        }

    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})
import React from 'react'
import { useParams } from 'react-router-dom'
import { EditUserForm } from './EditUserForm'
import { useGetUsersQuery } from './usersApiSlice'
import { PulseLoader } from 'react-spinners'

export const EditUser = () => {
    const { id } = useParams()

    const {user} = useGetUsersQuery("notesList",{
        selectFromResult: ({data}) => ({
            user: data?.entities[id]
        })
    })

    if(!user) return <PulseLoader color='#FFF'/>

    const content = <EditUserForm user={user} />

    return content
}

import React from 'react'
import { useParams } from 'react-router-dom'
import { EditNoteForm2 } from './EditNoteForm2'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useAuth } from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

export const EditNote = () => {

    const {id} = useParams()

    const {username, isManager, isAdmin} = useAuth()

    const {note} = useGetNotesQuery("notesList",{
        selectFromResult: ({data}) => ({
            note: data?.entities[id]
        })
    })

    const {users} = useGetUsersQuery("usersList",{
        selectFromResult: ({data}) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if( !note || !users) return <PulseLoader color='#FFF'/>

    if(!isManager || !isAdmin){
        if(note.username !== username){
            return <p>No Access</p>
        }
    }

    const content = <EditNoteForm2 note = {note} users = {users} />

    return content
}
 
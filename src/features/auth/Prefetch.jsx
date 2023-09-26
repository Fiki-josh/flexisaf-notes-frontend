import {useEffect} from 'react'
import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice'
import { notesApiSlice } from '../notes/notesApiSlice'
import { Outlet } from 'react-router-dom'
export const Prefetch = () => {

    useEffect(() => {
        
        store.dispatch(notesApiSlice.util.prefetch("getNotes", "notesList", {force: true}))
        store.dispatch(usersApiSlice.util.prefetch("getUsers", "usersList", {force: true}))

    },[])

    return <Outlet />
}

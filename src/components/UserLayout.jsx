import React from 'react'
import { UserHeader } from './UserHeader'
import { Outlet } from 'react-router-dom'
import { UserFooter } from './UserFooter'

export const UserLayout = () => {
    return (
        <>
            <UserHeader />
            <div className='dash-container'>
                <Outlet />
            </div>
            <UserFooter />
        </>
    )
}

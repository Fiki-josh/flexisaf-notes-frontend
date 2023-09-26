import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState} from "react";
import { usePersist } from "../../hooks/usePersist";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

import PulseLoader from "react-spinners/PulseLoader";
export const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef()

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {

        if(effectRan.current === true || process.env.NODE_ENV !== 'development'){//React 18 strict mode
            
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    
                    await refresh()

                    setTrueSuccess(true)
                } catch (error) {
                    console.error(error)
                }
            }

            if(!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true
    },[])

    let content;

    if(!persist){
        console.log("No persist")
        content = <Outlet />
    }
    else if(isLoading){
        console.log("isLoading")
        content = <PulseLoader color='#FFF'/>
    }
    else if(isError){
        console.log("error")
        content = (
            <p className='errmsg'>
                {`${error.data?.message} `}
                <Link to="/login">Please login again</Link>.
            </p>
        ) 
    }
    else if(isSuccess && trueSuccess){
        console.log("success")
        content = <Outlet />
    }
    else if(token && isUninitialized){
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}

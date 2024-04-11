import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { SessionContext } from './Contexts'
import SideBar from './SideBar'

const PrivateRoute = ({ children, ...props}) => {
    const {isLoggedIn, user} = useContext(SessionContext)
    
    useEffect(() => {
      console.log('private route: ', isLoggedIn, user)
    },[])
  return (
    <React.Fragment>
        {
            isLoggedIn && user ?
            <>
                <SideBar user = {user} {...props} />
                {children}
            </>
            : <Navigate to="/login"/>
        }
    </React.Fragment>
  )
}

export default PrivateRoute
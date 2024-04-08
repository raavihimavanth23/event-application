import React, { useEffect, useState } from 'react';
import { SessionContext } from './components/Contexts';
import {EventRoutes} from './EventRoutes';

function App() {

  const [user,setUser] = useState()
  const [isLoggedIn, setLoggedIn] = useState(true)
  const [token, setToken] = useState();
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    console.log('app js: ', localStorage.getItem('user'), localStorage.getItem('isLoggedIn'))
    if(localStorage.getItem('isLoggedIn') && localStorage.getItem('user')){
      setUser(localStorage.getItem('user'));
      setLoggedIn(true);
      setToken(localStorage.getItem("token"))
    }
    setLoaded(true)
  },[])

  return (
   <React.Fragment >
      {/* <div className="w-full bg-gray-700 dark:bg-gray-700 bg-[url('/img/dance-event2.jpeg')] "> */}
        <SessionContext.Provider value={{ user:user, isLoggedIn:isLoggedIn, token }}>
            { loaded && <EventRoutes />}
    </SessionContext.Provider>
    {/* </div> */}
   </React.Fragment>
  );
}

export default App;

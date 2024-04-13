import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { EventService } from '../services/Service';
import { AlertManager } from './AlertManager';
import { SessionContext } from './Contexts';

const Login = (props) => {
  const [user, setUser] = useState();
  const [alert, setAlert] = useState(undefined)
  const sessionContext = useContext(SessionContext)
  const navigate = useNavigate();
  useEffect(() => {
    if(sessionContext.isLoggedIn && sessionContext.user) {
      navigate("/events", {replace:'true'})
    }
  },[])

    const handleLogin =async(e) => {
      e.preventDefault()
      console.log('handle login, ', user);
      if(!user){
        setAlert({message: 'Email and Password required'})
      } else if(user.email===undefined || user.email==='' || (user.email.trim()).length <=0) {
        setAlert({message:'Invalid Email'})
      } else if(user.password===undefined || user.password==='' || (user.password.trim()).length <=0) {
        setAlert({message:'Invalid Password'})
      } else if(props.mode ==='REGISTER' && (user.username===undefined || user.username==='' || (user.username.trim()).length <=0)) {
        setAlert({message:'Invalid Username'})
      } else {
        const response =await EventService().login(user, props.mode.toLowerCase());
        props.mode ==='LOGIN' ? doLogin(response) : doRegister(response);
      }
      return false;
    }

    const doLogin = (response) => {
        if(response && response.status==='SUCCESS') {
            if(response.data){
              localStorage.setItem('user', JSON.stringify(response.data));
            } else {
              localStorage.setItem('user', JSON.stringify(user));
            }
            setAlert({message: 'Authentication Success', type:'success'});
            localStorage.setItem('isLoggedIn',"true");
            localStorage.setItem('token','token');
            window.location.href="/events"
        } else {
          setAlert({message:response.message});
        } 
    }

    const doRegister = (response) => {
        if(response && response.status==='SUCCESS') {
          setAlert({message: response.message, type:'success'})
          setUser({})
          window.location.href="/login"
        } else {
          setAlert({message: response.message});
        } 
    }
  return (
    <React.Fragment>  
      <section className="bg-gray-50 dark:bg-gray-900 bg-[url('/img/event-app-bg.png')] bg-no-repeat bg-cover">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Event App    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 {props.mode === 'LOGIN' ? 'Sign in to your account' : 'Register with us ' }
              </h1>
             {alert && alert.message && <AlertManager message={alert.message} type={alert.type? alert.type :'error'}/> }
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin} >
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your email"
                        value={user?.email}
                        onChange={(e) => setUser({...user, email:e.target.value})}
                      required={true} />
                  </div>
                {props.mode==='REGISTER' && <div>
                      <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your username"
                        value={user?.username}
                        onChange={(e) => setUser({...user, username:e.target.value})}
                      required={true} />
                  </div> }
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password"
                      value={user?.password}
                      required={true}
                      onChange={(e) => setUser({...user, password:e.target.value})}
                      placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                  </div>
                  {/* <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div> */}
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >{props.mode==='LOGIN' ? 'Login' : 'Register Now'}</button>
                 {props.mode ==='LOGIN' && <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p> }
                  {props.mode ==='REGISTER' && <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already a user? <a href="#login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                  </p> }
              </form>
          </div>
      </div>
  </div>
</section>
</React.Fragment>
  )
}

export default Login

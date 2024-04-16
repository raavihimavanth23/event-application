import { Accordion, AccordionBody, AccordionHeader, Button } from '@material-tailwind/react';
import { render } from '@testing-library/react'
import React, { useState } from 'react'
import { EventService } from '../services/Service';
import EventRegisterModal from './EventRegisterModal';

const Event = ({event, status, user, setAlert}) => {
  const [isExpired, setExpired] = useState(false)
  const [finalAmount, setFinalAmount] = useState(event.event_price)
  const [openAccord, setOpenAccord] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [couponDetails, setCouponDetails] = useState()


  const fetchCouponDetails = async () => {
    const response = await EventService().getCouponDetails(event.coupon_code);
    if(response) {
        setCouponDetails(response)
    } else {
      setAlert({message:"Coupon Details Not Found"})
    }

    const discount = response?.discount_amount ? response.discount_amount : 0;
    const finalAmount = (event.event_price - event.event_price*discount/100 )
    setFinalAmount(finalAmount)
  }
  useState(() => {
    const date = new Date(event.event_date);
    console.log('date', date)
    if(date < new Date()){
      console.log('expired: ')
      setExpired(true);
    }
    if(event.coupon_code) {
      fetchCouponDetails()
    }
    console.log('user in event: ', user)
  },[])

    const handleRegisterBtn = () => {
        console.log('handle register event')
      //  render (<EventRegisterModal event={event} show={true} user={user}/>);
        setShowRegisterModal(!showRegisterModal);
    } 


    const handleCancelRegistration = async() => {
        console.log('handle cancel registration: ',event)
     const resp =  await EventService().cancelUserEvent(event);
          if(resp && resp.status==='SUCCESS'){
            setAlert({message:'event cancelled successfully', type:'success'})
            window.location.reload()
          } else {
            setAlert({message:resp?.data?.message})
          }
    }

    const handleOpen = () => {
      setOpenAccord(!openAccord)
    }
  return (
    <div
    key={event.event_id}
    className="mx-2 mb-10 max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-white  dark:shadow-sm dark:hover:shadow-xl hover:-translate-y-2"
  >
    {/* <a href="#">
      <img
        className="rounded-t-lg max-h-60 w-full"
        src={event.event_img}
        alt="product image"
      />
    </a> */}

{showRegisterModal && <EventRegisterModal event={event} show={true} user={user} handleClose = {handleRegisterBtn}/>}
    <article className="relative isolate  font-semibold flex flex-col justify-end overflow-hidden  h-60 max-h-60 w-full  mx-auto">
      <img
        src={event.event_img}
        alt="Event Image Loading..."
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
      <h3 className="z-10 mt-3 mx-3 flex-row justify-between items-center text-2xl font-bold text-white">
        <span className=''>{event.event_name} </span>
        <span className='text-sm'>{event.event_date}</span>
      </h3>
      <div className="z-10 gap-y-1 mx-3 mb-2 overflow-hidden text-sm leading-6 text-gray-300">
        by {event.event_host}
      </div>
    </article>
    <div className="mx-3 pb-5">
        <h5 className="text-md mt-2 tracking-tight text-slate-500 dark:text-slate-500">
          {event.event_description}
        </h5>
      <div className="flex items-center justify-between text-muted mt-2.5 mb-1 font-semibold text-slate-700 dark:text-slate-700">
        <span className='flex items-center flex-row'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        {event.event_location }
        </span>
        
      </div>

      {event.coupon_code && couponDetails && <Accordion className='border-none' open={openAccord} onClick={handleOpen}>
        <AccordionHeader >
            <span className='border-none'>Coupon: {event.coupon_code}</span>
        </AccordionHeader>
        <AccordionBody>
            <p>CouponCode : {couponDetails?.coupon_code}</p>
            <p>description: {couponDetails?.description}</p>
            <p>discount_amount : {couponDetails?.discount_amount}</p>
            <p>validity : {couponDetails?.validity}</p>
            
        </AccordionBody>
      </Accordion> }
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-slate-900 text-muted">
          $ <span className={event.coupon_code && 'line-through'}>{event.event_price}  </span>  {event.coupon_code ? finalAmount : ''}
        </span>
       {status==="P" &&  !isExpired &&<><Button
          type="button"
          className="text-red-700  inline-flex bg-white hover:dark:text-red-300 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white hover:dark:bg-red-800 dark:focus:ring-red-800"
            onClick={handleCancelRegistration}
        >
          Cancel
        </Button><span className="inline-flex   items-center justify-center px-2 ms-3 text-sm font-medium text-slate-800 bg-green-100 rounded-full dark:bg-green-700 dark:text-white">registered</span> </>}

        { ( (status && status!=="P" && status!=="C" && status!=="R") || (status==undefined) && !isExpired) && 
            <><Button
            type="button"
            className="text-white  bg-blue-700 hover:dark:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            onClick={handleRegisterBtn}
         >
            Register Now
          </Button></>
        }

        
        {status && status==='C' && <span className="inline-flex   items-center justify-center px-2 ms-3 text-sm font-medium shadow-sm dark:shadow-sm text-slate-800 bg-green-100 rounded-full dark:bg-green-700 dark:text-white">Event Completed</span> }

        {status && status==='R' && <span className="inline-flex   items-center justify-center px-2 ms-3 text-sm font-medium text-slate-800 bg-red-100 rounded-full dark:bg-red-700 dark:text-white">Cancelled</span> }

        {isExpired  && <span className="inline-flex   items-center justify-center px-2 ms-3 text-sm font-medium text-red-800 shadow-sm dark:shadow-sm bg-red-100 rounded-full dark:bg-red-700 dark:text-white">Expired</span>}
      </div>
    </div>
  </div>
  )
}

export default Event

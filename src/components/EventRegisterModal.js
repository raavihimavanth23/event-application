import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { EventService } from '../services/Service';
import { InputWithButton } from './InputWithButton';
import {SessionContext} from './Contexts'
import { AlertManager } from './AlertManager';
function EventRegisterModal({show,event,user, handleClose,...props }) {
  const [modal, setModal] = useState(show);
  const [couponCode, setCouponCode] = useState()
  const [couponDetails, setCouponDetails] = useState()
  const [disabled, setDisabled] = useState(false)
  const [alert, setAlert] = useState(undefined)
  const toggle = () => {
    setModal(!modal);
    handleClose();
  }
  const [openAccord, setOpenAccor] = useState(false)

  const handleCouponChange = (coupon) => {
    setCouponCode(coupon);
    if(!coupon || coupon===''){
      setDisabled(false)
    } else {
      setDisabled(true)
    }

  }
  const handleRegisterBtn = async() =>{
    console.log('handle register btn', user, couponDetails, couponCode)
   let ccode = couponCode;
   if(ccode) {
    ccode = couponCode.toUpperCase()
   }
    const response = await EventService().registerUserEvent({'coupon_code':ccode,'event_id': event.event_id,'user_id': JSON.parse(user).email });
    if(response && response.status==='SUCCESS') {
      setAlert({message:'Event registered successfully', type:'success'})
        toggle();
        window.location.reload();
    } else {
      setAlert({message: response.message})
    }
    console.log('event registered done')
  }

  const handleCouponDetails = (cd) => {
    console.log('coupon details: ', cd)
    setCouponDetails(cd)
    if(couponCode) {
      if(!cd) {
        setAlert({message:'Invalid Coupon'});
        setDisabled(true)
        return false;
      }else if(cd.validity && (new Date(cd.validity) < new Date())) {
        setAlert({message:'Coupon Expired'})
        setDisabled(true)
        return false;
      } else {
        setDisabled(false)
      }
    } else {
      setDisabled(false)
    }
  }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} {...props} backdrop="static">
        <ModalHeader toggle={toggle}>Registering to Event - {event.event_name}</ModalHeader>
        <ModalBody>
        {alert && alert.message && <AlertManager {...alert}/> }
         <InputWithButton handleCouponChange = {handleCouponChange} finalAmt={event.event_price} handleCouponDetails ={handleCouponDetails} setAlert={setAlert}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={disabled} onClick={handleRegisterBtn}>
            Register Now
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EventRegisterModal;
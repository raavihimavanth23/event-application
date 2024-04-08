import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { EventService } from '../services/Service';
import { InputWithButton } from './InputWithButton';
import {SessionContext} from './Contexts'
function EventRegisterModal({show,event,user, ...props }) {
  const [modal, setModal] = useState(show);
  const [couponCode, setCouponCode] = useState()
  const toggle = () => setModal(!modal);
  const [openAccord, setOpenAccor] = useState(false)

  const handleCouponChange = (coupon) => {
    setCouponCode(coupon)
  }
  const handleRegisterBtn = async() =>{
    console.log('handle register btn', user)
    const response = await EventService().registerUserEvent({'coupon_code':couponCode,'event_id': event.event_id,'user_id': JSON.parse(user).username });
    if(response && response.status==='SUCCESS') {
        alert('Event registered successfully')
        toggle();
    } else {
      alert(response.message)
    }
    console.log('event registered done')
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} {...props} backdrop="static">
        <ModalHeader toggle={toggle}>Registering to Event - {event.event_name}</ModalHeader>
        <ModalBody>
         <InputWithButton handleCouponChange = {handleCouponChange} finalAmt={event.event_price}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleRegisterBtn}>
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
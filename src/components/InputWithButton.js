import React, { useEffect, useState } from "react";
import { Input, Button, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { EventService } from "../services/Service";
 
export function InputWithButton({handleCouponChange, finalAmt, handleCouponDetails, setAlert}) {
  const [couponCode, setCouponCode] = React.useState("");
  const [finalAmount, setFinalAmount] = useState(finalAmt)
  const [couponDetails, setCouponDetails] = useState()
  const onChange = ({ target }) => {
    setCouponCode(target.value);
    handleCouponChange(target.value)
    // setCouponDetails(undefined)
  }

  const getCouponDetails = async () => {
    const cd = {
      "coupon_code": "FIRST50",
      "discount_type": "percentage",
      "discount_amount": "50",
      "coupon_id": "FIRST50",
      "description": "50% off for FIRST EVENT",
      "validity": "2024-04-31"
  }
    const response = await EventService().getCouponDetails(couponCode);
    if(response) {
        setCouponDetails(response)
        handleCouponDetails(response)
    } else {
      setAlert({message: "Invalid Coupon, Coupon Details Not Found!"})
      setCouponDetails(cd)
      handleCouponDetails(cd)
    }
    const discount = couponDetails?.discount_amount ? couponDetails.discount_amount : 0;
    const finalAmount1 = (finalAmt - finalAmt*discount/100 )
    setFinalAmount(finalAmount1)
    
  }

  const handleApplyCoupon =() => {
        getCouponDetails();
        
  }

  return (

    <>
    <div className="relative  mt-3 flex w-full max-w-[24rem]">
      <Input
        type="text"
        label="CouponCode"
        value={couponCode}
        onChange={onChange}
        disabled ={couponCode && couponDetails}
        className="pr-20 text-uppercase"
        containerProps={{
          className: "min-w-0",
        }}
      />
     {couponCode && !couponDetails && <Button
        size="sm"
        color={couponCode ? "gray" : "blue-gray"}
        disabled={!couponCode}
        className="!absolute right-1 top-1 rounded text-green-800"
        onClick={handleApplyCoupon}
      >
        Apply
      </Button> }
      {couponCode && couponDetails && <Button
        size="sm"
        color={couponCode ? "gray" : "blue-gray"}
        disabled={!couponCode}
        className="!absolute right-1 top-1 rounded text-green-800"
        onClick={() => setCouponDetails(undefined)}
      >
        Remove
      </Button>}
    </div>
   {couponDetails && <Accordion open={true}>
        <AccordionHeader >
            <span className=''>Coupon Details for {couponCode}</span>
        </AccordionHeader>
        <AccordionBody>
            <p>CouponCode : {couponDetails.coupon_code}</p>
            <p>description: {couponDetails.description}</p>
            <p>discount_amount : {couponDetails.discount_amount}</p>
            <p>validity : {couponDetails.validity}</p>
            
        </AccordionBody>
      </Accordion> }
      <div>Total Amount: {finalAmt}</div>
      <div> Discount: {couponDetails ? couponDetails.discount_amount : 0}%</div>
      <div>Amount Payable: {finalAmount}</div>
      </>
  );
}
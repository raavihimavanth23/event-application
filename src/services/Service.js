import axios from 'axios'
const EVENT_API = "https://xzc3sw72c3.execute-api.eu-west-1.amazonaws.com/test"
const COUPON_API = "https://w3d1szbsy8.execute-api.us-east-1.amazonaws.com/Staging1/coupon-api"
const LOGIN_API = "https://iw0e1k1bi4.execute-api.eu-west-1.amazonaws.com/test"
export const EventService = () => {

    return ({
        getAllEvents :async() => {
         let response = {status: 'ERROR', message:'Unable to get events'}
         await axios.get(`${EVENT_API}/events`).then(resp => {
                console.log('response', resp)    
                response = resp.data;
            }).catch(err => {
                console.log(err);
            })
            return response;
        },
         getUserEvents:async(userId) => {
            let response = {status: 'ERROR', message:'Unable to get user events'}
            await axios.get(`${EVENT_API}/events/user-events/${userId}`).then(resp => {
                console.log('response: ', resp);
                response = resp.data
            }).catch(err => {
                console.log('err', err);
            })
            return response;
        },

        getCouponDetails: async(couponCode) => {
            let response = undefined
            await axios.get(`${COUPON_API}?coupon_id=${couponCode}`).then(resp => {
                console.log('response: ', resp);
                response = resp.data
            }).catch(err => {
                console.log('err', err);
            })
            return response;
        },
        redeemCoupon: async(couponCode, orderTotal) => {
            let response = undefined
            await axios.get(`${COUPON_API}?coupon_id=${couponCode}&order_total=${orderTotal}`).then(resp => {
                console.log('response: ', resp);
                response = resp.data
            }).catch(err => {
                console.log('err', err);
            })
            return response;
        },
        cancelUserEvent: async(userEvent) => {
            let response = {status: 'ERROR', message:'Unable to cancel event'}
            await axios.put(`${EVENT_API}/events/user-events/`, userEvent).then(resp => {
                console.log('response: ', resp);
                response = resp.data
            }).catch(err => {
                console.log('err', err);
            })
            return response;
        },
        registerUserEvent : async(userEvent) => {
            console.log('registering request: ', userEvent)
            let response = {status: 'ERROR', message:'Unable to register event'}
            await axios.post(`${EVENT_API}/events/user-events/`, userEvent, {
                headers: { 'Content-Type': 'application/json', 'X-Requested-With':'XMLHttpRequest', 'Access-Control-Allow-Origin': '*' },
            }).then(resp => {
                console.log('response: ', resp);
                response = resp.data
            }).catch(err => {
                console.log('err', err);
            })
            return response;
        },

        login : async (data, mode) => {
            let response = {status: 'ERROR', message:'Unable to Login'}
            await axios.post(`${LOGIN_API}/${mode}`, data, {
                headers: { 'Content-Type': 'application/json', 'X-Requested-With':'XMLHttpRequest', 'Access-Control-Allow-Origin': '*' },
            }).then(resp => {
                console.log('response: ', resp);
                response = resp.data
            }).catch(err => {
                console.log('err', err);
            })
            return response;
        },

    });

}
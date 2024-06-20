
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';

import './checkoutForm.css';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { data } from 'autoprefixer';
import Swal from 'sweetalert2';

const CheckoutForm = () => {

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isGoldMember, setIsGoldMember] = useState(false);
  const {user} = useAuth()
  useEffect(()=>{
    getClientSecret({price: 50})
    checkUserBadge()
  },[])

  const getClientSecret = async (price) =>{
    const {data} = await axiosSecure.post(`/create-payment-intent`, price)
    console.log(data)
    setClientSecret(data.clientSecret)
  }

  const checkUserBadge = async () => {
    try {
      const { data } = await axiosSecure.get(`/userBadge?email=${user?.email}`);
      if (data.badge === 'Gold') {
        setIsGoldMember(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true)
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message)
      setProcessing(false)
      return
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setCardError('')
    }
    // confirm payment
   const {error: confirmError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
      payment_method:{
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        }
      }
    })

    if(confirmError){
      console.log(confirmError)
      setCardError(confirmError.message)
      setProcessing(false)
      return
    }

    if(paymentIntent.status === 'succeeded'){
      console.log(paymentIntent)
      // create payment info object
      const paymentInfo = {
        transactionId: paymentIntent.id,
        email: user?.email,
        name: user?.displayName,
        date: new Date()
      }
      console.log(paymentInfo)
     
      try{
         // save payment info in booking collection(db)
         await axiosSecure.post('/booking', paymentInfo)
        // change subscription status
        await axiosSecure.patch('/userBadge', { email: user?.email })
        Toast.fire({
          icon: 'success',
          title: 'Payment successful and badge updated to Gold'
        });
        setIsGoldMember(true);

      }catch(err){
        console.log(err)
      }
      
    }

  };

  return (
    <>
      {!isGoldMember ? (
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <div className='flex gap-10'>
            <button disabled={!stripe || !clientSecret || processing} type='submit' className="px-10 rounded font-medium py-2 mt-6 bg-green-600 text-white text-base lg:text-lg mb-3 uppercase">Pay $50</button>
            <button className="px-10 rounded py-2 mt-6 bg-[#F73E7B] text-white text-base lg:text-lg mb-3 uppercase font-medium">Cancel</button>
          </div>
        </form>
      ) : (
        <p className='text-xl font-semibold text-[#F73E7B] text-center mt-5'>You are already a Gold member!</p>
      )}
      {cardError && <p className='text-lg text-red-500 text-center mt-5'>{cardError}</p>}
    </>
  );
};

export default CheckoutForm



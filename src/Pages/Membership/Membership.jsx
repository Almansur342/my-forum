import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { Helmet } from 'react-helmet-async';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const Membership = () => {
  return (
    <>
      <Helmet>
        <title>Membership</title>
      </Helmet>
      <div className='container mx-auto px-4 my-10'>
        <h1 className='text-center font-bold text-3xl'>Join Our Exclusive <span className='text-[#F73E7B]'>Membership!</span></h1>
        <p className='text-lg text-center text-gray-600 my-3 mb-6 font-medium'>Join our community today and elevate your experience! As a member, you will gain  access to premium features, <br /> including the ability to <span className='text-[#F73E7B] text-xl font-semibold'>post more than 5 times.</span> </p>
        <div className='shadow-2xl w-3/5 mx-auto p-6 border-2'>
          <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
          </Elements>
        </div>
      </div>
    </>
  );
};

export default Membership;
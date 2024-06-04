
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import log from '../../assets/login.json'

// import 'animate.css';
import { useForm } from "react-hook-form";

// import axios from "axios";
import { Helmet } from "react-helmet-async";

import {  useState } from "react";
import Swal from "sweetalert2";

import useAuth from "../../Hooks/useAuth";



const Login = () => {
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

  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors },} = useForm();
  const { signIn, signInWithGoogle,} = useAuth()

  const onSubmit = async(data) =>{
    const {email,password} = data;
    console.log(email,password);
     signIn(email, password)
     try {
      const result = await signInWithGoogle()
      console.log(result.user)
      // const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {email: result?.user?.email},{withCredentials:true})
      // console.log(data)
      Swal.fire({
        title: 'success',
        text: 'User Logged In successfully',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      navigate(location?.state ? location.state : '/')
    } catch (err) {
      console.log(err)
      Toast.fire({
        icon: 'error',
        title: `${err?.message}`,
      })

    }
  }
 
  const handleGoogleLogin = async() => {
    try {
      const result = await signInWithGoogle()
      console.log(result.user)
      // const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {email: result?.user?.email},{withCredentials:true})
      // console.log(data)
      Swal.fire({
        title: 'success',
        text: 'User Logged In successfully',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      navigate(location?.state ? location.state : '/')
    } catch (err) {
      console.log(err)
      Toast.fire({
        icon: 'error',
        title: `${err?.message}`,
      })

    }
    
      
        
  }


  return (
    <div className="bg-white flex max-w-md md:max-w-5xl lg:max-w-7xl p-1 md:p-10 lg:p-10">
       <Helmet>
        <title>Be a Hand|Login</title>
      </Helmet>
      <Lottie className="w-[300px]" animationData={log}></Lottie>
      <div className="bg-white shadow-md border w-4/5 md:w-4/5 lg:w-2/5 mx-auto p-3 lg:p-9 my-5">
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3 rounded">
        <h1 className="text-2xl lg:text-3xl text-[#313131] font-semibold text-center uppercase">Login</h1>
        <p className="text-[#676767] text-center text-lg">Enter username and password to login:</p>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base">Email:</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered"
           {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="form-control relative">
            <label className="label">
              <span className="label-text font-semibold text-base">Password:</span>
            </label>
            <input
             type={showPassword ? "text" : "password"}
              placeholder="password"
               name="password" 
               className="input input-bordered"
               {...register("password", { required: true })}
               />
            <span className="absolute bottom-3 right-4 text-xl" onClick={()=> setShowPassword(!showPassword)}>{
              showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
            }</span>
            {errors.password && <span className="text-red-500">This field is required</span>}
          </div>
        <div className="form-control">
          <button className="btn mt-6 bg-[#F73E7B] text-white text-base lg:text-lg mb-3 uppercase">Sign In</button>
        </div>
        <Link className="flex justify-center" to="/register">New here? <span className="text-[#F63E7B] ml-1">Create an account</span></Link>
        <div className="divider">OR</div>
      </form>
      <div className="justify-around flex gap-1 lg:gap-5">
        <button onClick={handleGoogleLogin} className="shadow-lg border-2 lg:shadow-2xl px-2  lg:px-6 rounded flex items-center gap-2 text-base lg:text-lg mt-2 font-semibold py-1 lg:py-2"><FcGoogle />Login with Google</button>
      </div>
      </div>
      
    </div>
  );
};

export default Login;
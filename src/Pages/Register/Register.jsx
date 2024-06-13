import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

import log from '../../assets/login.json'
import Lottie from "lottie-react";

import Swal from 'sweetalert2'
// import axios from "axios";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Register = () => {

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


  const {createUser,updateUserProfile,signInWithGoogle,saveUser} = useAuth()
    const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors },} = useForm();
  const onSubmit = async(data) => {
    // console.log(data);
    const {email,password,name,photo} = data;
    console.log(email,password,name,photo);
    if(password.length < 6){
      Toast.fire({
        icon: 'error',
        title: 'password must be six character or longer',
      })
         
          return;
        }else if(!/[A-Z]/.test(password)){
          Toast.fire({
            icon: 'error',
            title: 'Password should have at least an uppercase',
           
          })
          return;
        } else if(!/[a-z]/.test(password)){
          Toast.fire({
            icon: 'error',
            title: 'Password should have at least a lowercase',
          })
          return;
        }
     
     try {
        const result = await createUser(email,password)
        // console.log(result)
        await updateUserProfile(name,photo);
        await saveUser(result.user)
        
     
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
      // console.log(result.user)
      // const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {email: result?.user?.email},{withCredentials:true})
      // console.log(data)
      Swal.fire({
        title: 'success',
        text: 'User created In successfully',
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
        <title>Be a Hand|Register</title>
      </Helmet>
       <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 md:w-3/5 lg:w-2/5 mx-auto p-3 bg-white shadow-md border lg:p-9 my-5 space-y-3 rounded">
       <h1 className="text-3xl text-[#313131] font-semibold text-center uppercase">Register</h1>
       <p className="text-[#676767] text-center text-lg">Join our community today:</p>
       <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base">User Name:</span>
          </label>
          <input type="text" placeholder="User name" name="name" className="input input-bordered" 
          {...register("name", { required: true })}
          />
          {errors.name && <span className="text-red-500">This field is required</span>}
        </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base">Email:</span>
            </label>
            <input type="email" name="email" placeholder="email" className="input input-bordered"
             {...register("email", { required: true })}
            />
             {errors.email && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base">photoURL
              :</span>
          </label>
          <input type="text" placeholder="photoURL
          " className="input input-bordered" name="photo"
          {...register("photo", { required: true })}
          />
            {errors.photo && <span className="text-red-500">This field is required</span>}
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
            <button className="btn mt-6 bg-[#6d46c7] text-white ext-base lg:text-lg mb-3 uppercase">create an account</button>
          </div>
          <Link className="flex justify-center text-xs lg:text-base" to="/login">Already have an account?<span className="text-[#9a7ae1] ml-1">Sign in.</span></Link>
          <div className="justify-around flex gap-1 lg:gap-5">
        <button onClick={handleGoogleLogin} className="shadow-lg border-2 lg:shadow-2xl px-2  lg:px-6 rounded flex items-center gap-2 text-base lg:text-lg mt-2 font-semibold py-1 lg:py-2"><FcGoogle />Login with Google</button>
      </div>
        </form>
        <Lottie className="w-[300px]" animationData={log}></Lottie>
    </div>
  );
};

export default Register;
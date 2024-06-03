import { Link, NavLink, useNavigate, } from "react-router-dom";
import logo from "../../assets/logo/docy-2x.png"
// import 'react-tooltip/dist/react-tooltip.css'
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
// import { Tooltip } from "react-tooltip";
// import { Tooltip } from 'react-tooltip'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(result => {
        // console.log(result.user);
        navigate('/');
      })
      .catch(error => {
        console.error(error);
      })
  }
  const handleOpen = () =>{
    setOpen(!open);
  }

  const navLink = <div className="flex items-center gap-5">
    <NavLink to='/' className="font-bold text-base hover:text-[#F63E7B] hover:border-b border-b-[#b18b5e]"><li  className={({ isActive }) => isActive ? '  text-[#F63E7B]' : 'text-[#131313CC] hover:text-[#F63E7B]'}>Home</li></NavLink>

    <NavLink to='/add' className="font-bold text-base hover:text-[#F63E7B] hover:border-b border-b-[#b18b5e]"><li  className={({ isActive }) => isActive ? '  text-[#6d46c7]' : 'text-[#131313CC] hover:text-[#F63E7B]'}>Membership</li></NavLink>

    <NavLink to='/add' className="font-bold text-base hover:text-[#F63E7B] hover:border-b border-b-[#b18b5e]"><li  className={({ isActive }) => isActive ? '  text-[#F63E7B]' : 'text-[#131313CC] hover:text-[#F63E7B]'}>About Us</li></NavLink>
    
    <div className="-mr-16 ml-5">
    <IoMdNotificationsOutline className="w-12 h-12" />
    </div>

    



    {/* { user && <>
      <li><NavLink to='/contactUs' className={({ isActive }) => isActive ? 'border border-green-600 text-[#23BE0A]' : 'text-[#131313CC]'}>Contact Us</NavLink></li> */}

  </div>
  return (
    <div className="bg-[#FFF8F5] py-5">
      <div className="navbar container px-4 mx-auto mt-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-xs dropdown-content mt-3 z-[1] p-1  w-52">
            {navLink}
          </ul>
        </div>
        <div>
          <img className="w-40 h-[25px]" src={logo} alt="" />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLink}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? <div className="flex flex-col items-center justify-center">
            <div onClick={handleOpen} className="">
              <img className="object-cover w-10 lg:w-16 h-10 lg:h-16 rounded-full border-4 border-white cursor-pointer" src={user?.photoURL || 'Image not found'} alt="" />
            </div>
            {
              open &&
              <div className=" px-4 shadow-lg py-2 flex flex-col items-center space-y-1">
                <div className="text-[#F63E7B]">
                  {user?.displayName}
                </div>
                <div className="">
                  <Link to='/'>
                    <button onClick={handleLogOut} className="font-semibold text-xs lg:text-base px-7 border-2 border-[#F63E7B]">Sign out</button>
                  </Link>
                </div>
                <div>
                  <Link to='/dashboard'>
                    <button className="font-semibold text-xs lg:text-base px-5 border-2 border-[#F63E7B]">Dashboard</button>
                  </Link>
                </div>
              </div>
            }
          </div>
            :
            <div>
              <Link to='/login'>
                <button className="px-2 lg:px-3 font-semibold text-xs lg:text-base text-white bg-[#6d46c7] rounded py-2">Join Us</button>
              </Link>
            </div>
        }

      </div>
    </div >
    </div>
  );
};

export default Navbar;

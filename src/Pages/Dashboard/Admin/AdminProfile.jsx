import { MdEmail, MdLocalPostOffice } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import bronze from '../../../assets/badge/bronge.png'
import golden from '../../../assets/badge/golden.jpg'
import { FaCommentDots, FaComments, FaUser } from "react-icons/fa";
import useAxiosCommon, { axiosCommon } from './../../../Hooks/useAxiosCommon';

const AdminProfile = () => {
  const {user} = useAuth()
  
  const axiosSecure = useAxiosSecure();
  const axiosCommon = useAxiosCommon()

  const { data: adminProfile ={} } = useQuery({
    queryKey: ['admin-profile'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin-profile');
      return data;
    }
  });


  const {data:users=[]} = useQuery({
    queryKey: ['users'],
    queryFn: async()=>{
    const {data} = await axiosSecure.get('/users')
    return data
    }
  })

  const {data:getCount= 0} = useQuery({
    queryKey: ['getCount'],
    queryFn: async()=>{
    const {data} = await axiosCommon.get('/post-count')
    return data.count
    },
  })

  const { data: commentCount = 0 } = useQuery({
    queryKey: ['comment-count'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/comment-count');
      return data.count;
    }
  });




  
  return (
    <div className="flex items-center gap-5">
    <div className="flex items-center justify-center my-4">
    <div className="max-w-lg p-8 items-center sm:flex sm:space-x-6 border shadow-2xl">
       <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
         <img src={adminProfile?.image} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
       </div>
       <div className="flex flex-col space-y-4">
         <div>
           <h2 className="text-2xl font-semibold">{adminProfile?.name}</h2>
            <div className="h-16 w-16 mt-3 gap-4 flex items-center">
            {
             adminProfile?.badge == 'Bronze'? <h1 className="text-xl font-semibold">Bronze: </h1> : <h1 className="text-xl font-semibold">Gold: </h1>
            }
            {
             adminProfile?.badge == 'Bronze'? <img src={bronze} alt="" /> : <img src={golden} alt="" />
            }
             
           </div> 
         </div>
         <div className="space-y-1">
           <span className="flex items-center space-x-2">
           <MdEmail />
             <span className="dark:text-gray-600">{adminProfile?.email}</span>
           </span>
         </div>
       </div>
     </div>
    </div>
     <p className="border-b-2 "></p>
     <div className="max-w-lg p-8 items-center border shadow-2xl">
      <h1 className="text-center font-semibold text-3xl mb-5">Information</h1>
      <div>
      <div className="flex items-center p-1 space-x-1.5">
      <FaUser />
				<span className="text-lg font-medium">All users: {users.length}</span>
			</div>
      <div className="flex items-center p-1 space-x-1.5">
      <MdLocalPostOffice />
				<span className="text-lg font-medium">All Post: {getCount}</span>
			</div>
      <div className="flex items-center p-1 space-x-1.5">
      <FaCommentDots />
				<span className="text-lg font-medium">All Comments: {commentCount}</span>
			</div>
      </div>
    </div>
   </div>
  );
};

export default AdminProfile;
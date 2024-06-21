import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";
import UserDataRow from "../../../components/UserDataRow/UserDataRow";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const ManageUsers = () => {
  const [itemsPerPage, setItemsPerPage] = useState(2)
  const [currentPage,setCurrentPage] = useState(1);
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
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()

  const {data:users=[], isLoading,refetch} = useQuery({
    queryKey: ['users',currentPage,itemsPerPage],
    queryFn: async()=>{
    const {data} = await axiosSecure.get(`/users?&page=${currentPage}&size=${itemsPerPage}`)
    return data
    }
  })

  const { data: userCount = [] } = useQuery({
    queryKey: ['userCount'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/userCount')
      return data
    },
  })
  
  const numberOfPage = Math.ceil(userCount.length / itemsPerPage)
  // console.log(page)
  const pages = [...Array(numberOfPage).keys()].map(
    element => element + 1
  )
  // console.log(PageCount);

  // handle pagination buuton
  const handlePaginationButton = (value) =>{
    setCurrentPage(value)
  }

  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <>
      <Helmet>
        <title>Manage users</title>
      </Helmet>

      <div className='container mx-auto px-4 py-4 sm:px-8'>
        <h1 className="text-3xl text-center font-semibold text-[#34373f]">Manage your users</h1>
        <div className='py-6'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200 text-left font-medium uppercase text-[#F73E7B]'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200  text-left font-medium uppercase text-[#F73E7B]'
                    >
                     Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200  text-left font-medium uppercase text-[#F73E7B]'
                    >
                     Role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200  text-left text-sm font-medium uppercase text-[#F73E7B]'
                    >
                      Subscription Status
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200  text-left font-medium uppercase text-[#F73E7B]'
                    >
                     Make admin
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map(user=><UserDataRow key={user._id} user={user} refetch={refetch} ></UserDataRow>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-12'>
        <button
         disabled ={currentPage === 1}
         onClick={()=> handlePaginationButton(currentPage - 1)}
        className='px-4 py-2 mx-1 capitalize bg-[#F73E7B]  rounded-md disabled:cursor-not-allowed text-white font-medium hover:bg-[#F73E7B] '>
          <div className='flex items-center -mx-1'>
          <FaArrowLeftLong />
            <span className='mx-1'>previous</span>
          </div>
        </button>

        {pages.map(btnNum => (
          <button
          onClick={()=> handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${currentPage===btnNum? 'bg-[#F73E7B] text-white font-medium' : 'border border-[#F73E7B]'} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-[#F73E7B]  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
         disabled ={currentPage === numberOfPage}
         onClick={()=> handlePaginationButton(currentPage + 1)}
        className='px-4 py-2 mx-1 capitalize bg-[#F73E7B]  rounded-md disabled:cursor-not-allowed text-white font-medium hover:bg-[#F73E7B]'>
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>
            <FaArrowRightLong />

          </div>
        </button>
      </div>
      </div>
    </>
  );
};

export default ManageUsers;
import PropTypes from 'prop-types'
import { useState } from 'react'
import UpdateUserRoleModal from '../Modal/UpdateUserRoleModal'

import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const UserDataRow = ({ user, refetch }) => {
  const {user: loggedInUser} = useAuth()
  const [isOpen,setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure()
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
  const {mutateAsync} = useMutation({
    mutationFn: async (role) =>{
      const {data} = await axiosSecure.patch(`/user/update/${user?.email}`, role)
      return data
    },
    onSuccess:()=>{
      refetch()
      Toast.fire({
        icon: 'success',
        title: 'User role has been updated',
      })
      setIsOpen(false)
    }
   })
  

  const handleModal = async(selected)=>{
    if(loggedInUser.email === user.email){
      Toast.fire({
        icon: 'error',
        title: 'Action Not Allowed',
      })
      return setIsOpen(false)
    }
    const userRole = {
      role: selected,
    }
    try{
      const data = await mutateAsync(userRole)
      console.log(data)
    } catch(err){
      Toast.fire({
        icon: 'error',
        title: `${err.message}`,
      })
    }
  }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap font-medium'>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap font-medium'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap font-medium'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap font-medium'>{user?.badge === 'Bronze' ? 'Not a Member' : 'Member'}</p>
      </td>
  
      <td className='px-2 py-2 border-b border-gray-200 bg-white'>
      <button onClick={()=>setIsOpen(true)} className="bg-[#F73E7B] px-3 py-2 font-medium rounded text-white text-sm lg:text-xs uppercase">Update role</button>
      <UpdateUserRoleModal isOpen={isOpen} setIsOpen={setIsOpen} handleModal={handleModal} user={user}></UpdateUserRoleModal>
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow
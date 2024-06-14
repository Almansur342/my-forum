

import { AiFillProfile } from 'react-icons/ai'
import MenuItem from './MenuItem'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork } from 'react-icons/md'


const HostMenu = () => {
  return (
    <>
      {/* my Profile */}
      <MenuItem
        label='My Profile'
        address='myProfile'
        icon={AiFillProfile}>
      </MenuItem>


      {/* Add Room */}
      <MenuItem
        label='Add Post'
        address='add-post'
        icon={BsFillHouseAddFill}>
      </MenuItem>


      {/* My Posts */}
      <MenuItem
        label='My Posts'
        address='my-post'
        icon={MdHomeWork}>
      </MenuItem>
    </>
  )
}

export default HostMenu
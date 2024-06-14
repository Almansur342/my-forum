import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'


const AdminMenu = () => {
  return (
    <>
     {/* my Profile */}
     <MenuItem
        label='Manage Users'
        address='manage-users'
        icon={FaUserCog}>
      </MenuItem>
    </>
  )
}

export default AdminMenu
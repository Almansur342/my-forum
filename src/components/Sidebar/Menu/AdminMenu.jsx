import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { MdReport } from 'react-icons/md'


const AdminMenu = () => {
  return (
    <>
     {/* Manage User */}
     <MenuItem
        label='Manage Users'
        address='manage-users'
        icon={FaUserCog}>
      </MenuItem>
     {/* Manage Report */}
     <MenuItem
        label='Manage Report'
        address='manage-report'
        icon={MdReport}>
      </MenuItem>
    </>
  )
}

export default AdminMenu
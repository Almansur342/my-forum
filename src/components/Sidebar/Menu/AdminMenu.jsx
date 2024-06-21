import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { MdReport } from 'react-icons/md'
import { GrAnnounce } from 'react-icons/gr'
import { AiOutlineProfile } from 'react-icons/ai'


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
     {/* Manage Announcement */}
     <MenuItem
        label='Announcement'
        address='announcement'
        icon={GrAnnounce}>
      </MenuItem>

     {/* Manage admin profile */}
     <MenuItem
        label='Admin profile'
        address='admin-profile'
        icon={AiOutlineProfile}>
      </MenuItem>
    </>
  )
}

export default AdminMenu
import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../components/Spinner/LoadingSpinner";
import PropTypes from 'prop-types'

const AdminRoute = ({children}) => {
  const [role, isLoading] = useRole()
  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  if(role==='admin') return children
  return <Navigate to='/dashboard'></Navigate>

};
AdminRoute.propTypes = {
  children: PropTypes.element,
}
export default AdminRoute;
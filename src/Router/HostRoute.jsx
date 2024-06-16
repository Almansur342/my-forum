import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../components/Spinner/LoadingSpinner";

const HostRoute = ({children}) => {
  const [role, isLoading] = useRole()
  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  if(role==='host') return children
  return <Navigate to='/dashboard'></Navigate>

};
HostRoute.propTypes = {
  children: PropTypes.element,
}
export default HostRoute;
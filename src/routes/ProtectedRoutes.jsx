import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
import Loading from '../components/loading/loading';

const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useAppContext();

  if (userLoading) return <Loading />;

  // uncomment this to restrict access when accesss wwihout login

  // if (!user) {
  //   return <Navigate to='/login' />;
  // }
  return children;
};

export default ProtectedRoute;

import React from 'react'
import { Navigate } from 'react-router-dom';

const NavigatePage = () => {
  const currentUser = localStorage.getItem("role");
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!redirect) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {currentUser === "admin" && <Navigate to="/admin" />}
      {currentUser === "hod" && <Navigate to="/user" />}
      {currentUser === "principal" && <Navigate to="/user" />}
      {currentUser === "non-teaching-staff" && <Navigate to="/user" />}
      {currentUser === "teaching-staff" && <Navigate to="/user" />}
    </div>
  )
}

export default NavigatePage

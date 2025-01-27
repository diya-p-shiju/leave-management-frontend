import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LogoutButton = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    // Clear the localStorage values
    localStorage.setItem("user", "");
    localStorage.setItem("role", "");
    localStorage.setItem("_id", "");
    localStorage.setItem("authenticated", "false");

    // Redirect to login page
    navigate("/"); 
  }, [navigate]);

  return (
    <>
    </>
  );
};

export default LogoutButton;

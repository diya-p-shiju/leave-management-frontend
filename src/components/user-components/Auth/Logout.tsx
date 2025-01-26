import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';

const LogoutButton = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    // Clear the localStorage values
    localStorage.setItem("user", null);
    localStorage.setItem("role", null);
    localStorage.setItem("_id", null);
    localStorage.setItem("authenticated", "false");

    // Redirect to login page
    navigate("/"); 
  };

  return (
    <Button onClick={handleLogout} className="bg-red-500 text-white">
      Logout
    </Button>
  );
};

export default LogoutButton;

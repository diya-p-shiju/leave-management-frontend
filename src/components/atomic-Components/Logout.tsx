import { Button } from "react-day-picker"

const Logout = () => {

    function handleClick() {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("authenticated");
        console.log("Logged out");
    }
  return (
    <div>
      <Button onClick={handleClick}>Logout</Button>
    </div>
  )
}

export default Logout

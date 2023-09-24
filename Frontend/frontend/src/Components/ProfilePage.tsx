import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "./Navbar";
import axios from "axios";
import Cookies from "js-cookie";

function ProfilePage() {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const userID = Cookies.get("userID");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://203.188.54.9/~u6411130038/mini-project/Backend/api/employee_search.php?id=${userID}`
        );
        setEmployee(response.data[0]);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, [userID]);

  const handleLogoutClick = () => {
    // Remove the userID cookie
    Cookies.remove("userID");

    // Use navigate to redirect the user to the login page
    navigate("/UserAndEmp"); // Replace with your login page route
  };

  return (
    <div>
      <Navbar />
      <h2>Employee Profile Detail</h2>
      {employee ? (
        <div>
          <div>
            {/* Render employee details */}
            <table>
              <tbody>
                <tr>
                  <td>ID:</td>
                  <td>{employee.employee_id}</td>
                </tr>
                {/* Display other employee attributes */}
                <tr>
                  <td>Name:</td>
                  <td>{employee.name}</td>
                </tr>
                <tr>
                  <td>Last Name:</td>
                  <td>{employee.lname}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{employee.email}</td>
                </tr>
                <tr>
                  <td>Telephone:</td>
                  <td>{employee.tel}</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>{employee.address}</td>
                </tr>
                <tr>
                  <td>Join Date:</td>
                  <td>{employee.join_date}</td>
                </tr>
                <tr>
                  <td>Skill:</td>
                  <td>{employee.skill}</td>
                </tr>
                <tr>
                  <td>Experience:</td>
                  <td>{employee.experience}</td>
                </tr>
                <tr>
                  <td>Department ID:</td>
                  <td>{employee.department_id}</td>
                </tr>
                <tr>
                  <td>Position ID:</td>
                  <td>{employee.position_id}</td>
                </tr>
                <tr>
                  <td>User ID:</td>
                  <td>{employee.user_id}</td>
                </tr>
                <tr>
                  <td>Password:</td>
                  <td>{employee.password}</td>
                </tr>
                <tr>
                  <td>Permission Name:</td>
                  <td>{employee.permission_name}</td>
                </tr>
                <tr>
                  <td>Permission:</td>
                  <td>{employee.permission}</td>
                </tr>
              </tbody>
            </table>
            <button type="button" onClick={handleLogoutClick}>
              Loguot
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;

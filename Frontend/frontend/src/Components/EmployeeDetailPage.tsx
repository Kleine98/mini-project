import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function EmployeeDetailPage() {
  // Use the useParams hook to get the employee ID from the URL
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false); // Track edit mode
  const [formData, setFormData] = useState({}); // Store form data
  const [positions, setPositions] = useState([]); // Store employee positions

  useEffect(() => {
    // Fetch employee details based on the id
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost/mini-project/mini-project/Backend/api/employee_search.php?id=${id}`
        );
        setEmployee(response.data[0]); // Assuming you get a single employee with the given id
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  useEffect(() => {
    // Fetch employee positions
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          "http://localhost/mini-project/mini-project/Backend/api/direct_search/position.php"
        );
        setPositions(response.data); // Assuming response.data is an array of positions
      } catch (error) {
        console.error("Error fetching employee positions:", error);
      }
    };

    fetchPositions();
  }, []);

  useEffect(() => {
    // When entering edit mode, populate the formData including skills and position name
    if (editMode && employee) {
      setFormData({
        ...employee,
        skill: employee.skills ? employee.skills.join(", ") : "",
        employee_position_name: employee.position_name || "", // Initialize with the current position name
      });
    }
  }, [editMode, employee]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    // Update form data when input fields change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Send a PUT request to update the employee data
      const response = await axios.put(
        `http://localhost/mini-project/mini-project/Backend/api/employee_management.php/${id}`,
        formData
      );

      if (response.data) {
        // Update the employee state with the edited data
        setEmployee(formData);
        setEditMode(false);
        // Reload the page to reflect the updated data
        window.location.reload();
        console.log(formData);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Employee Detail</h2>
      {employee ? (
        <div>
          {editMode ? (
            <div>
              {/* Render the edit form */}
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Last Name:</td>
                    <td>
                      <input
                        type="text"
                        name="lname"
                        value={formData.lname || ""}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>
                      <input
                        type="text"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Telephone:</td>
                    <td>
                      <input
                        type="text"
                        name="tel"
                        value={formData.tel || ""}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>
                      <input
                        type="text"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Join Date:</td>
                    <td>
                      <input
                        type="date"
                        name="join_date"
                        value={formData.join_date || ""}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Skills:</td>
                    <td>
                      <input
                        type="text"
                        name="skill"
                        value={formData.skill || ""}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Experience:</td>
                    <td>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience || ""}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Position:</td>
                    <td>
                      <select
                        name="employee_position_id"
                        value={formData.no || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select Position</option>
                        {positions.map(
                          (
                            position,
                            index // Add 'index' as the second argument
                          ) => (
                            <option
                              key={index} // Use 'index' as the key
                              value={position.no}
                            >
                              {position.position_name}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>User ID:</td>
                    <td>
                      <input
                        type="text"
                        name="user_id"
                        value={formData.user_id || ""}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Password:</td>
                    <td>
                      <input
                        type="password"
                        name="password"
                        value={formData.password || ""}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button type="button" onClick={handleSave}>
                        Save
                      </button>
                    </td>
                    <td>
                      <button type="button" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
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
                    <td>Skills:</td>
                    <td>{employee.skills ? employee.skills.join(", ") : ""}</td>
                  </tr>
                  <tr>
                    <td>Experience:</td>
                    <td>{employee.experience}</td>
                  </tr>
                  <tr>
                    <td>Department:</td>
                    <td>{employee.department_name}</td>
                  </tr>
                  <tr>
                    <td>Position:</td>
                    <td>{employee.position_name}</td>
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
              <button type="button" onClick={handleEditClick}>
                Edit
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EmployeeDetailPage;

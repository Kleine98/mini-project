import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import InterviewDetail from "./InterviewDetail";
import InterviewReportAVG from "./InterviewReportAVG";

function InterviewReportPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    fetchInterviews(); // Fetch all interviews
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost/mini-project/mini-project/Backend/api/interview/interview.php"
      );
      setInterviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const handleInterviewClick = (interviewId, managerId) => {
    setSelectedInterview(interviewId);
    setSelectedManager(managerId);
  };

  return (
    <div>
      <Navbar />
      <h2>All Interview</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Interview ID</th>
              <th>Date</th>
              <th>Candidate ID</th>
              <th>Manager ID</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Tel</th>
              <th>Address</th>
              <th>Register Date</th>
              <th>Request ID</th>
              <th>No</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr
                key={interview.no}
                onClick={() =>
                  handleInterviewClick(interview.id, interview.manager_id)
                }
                style={{ cursor: "pointer" }}
              >
                <td>{interview.id}</td>
                <td>{interview.date}</td>
                <td>{interview.candidate_id}</td>
                <td>{interview.manager_id}</td>
                <td>{interview.name}</td>
                <td>{interview.lname}</td>
                <td>{interview.email}</td>
                <td>{interview.tel}</td>
                <td>{interview.address}</td>
                <td>{interview.register_date}</td>
                <td>{interview.request_id}</td>
                <td>{interview.no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedInterview && (
        <div>
          <InterviewDetail
            interviewId={selectedInterview}
            managerId={selectedManager}
          />
        </div>
      )}
      <InterviewReportAVG />
    </div>
  );
}

export default InterviewReportPage;

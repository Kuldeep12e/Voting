import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

const Sidebar = ({ role, contract }) => {
  const [candidateData, setCandidateData] = useState([]); 
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    console.log("hello");
  }, []);

  const getCandidates = async () => {
    if (contract) {
      setLoading(true);
      const count = await contract.methods.candidatesCount().call();
      const temp = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.getCandidateDetails(i).call();
        temp.push({ name: candidate[0], email: candidate[1], votes: candidate[2] });
      }
      setCandidateData(temp);
      setLoading(false);
      setOpenModal(true);
      setModalTitle("Candidate List");
      setModalData(temp);
    }
  };

  const getVoters = async () => {
    if (contract) {
      setLoading(true);
      const count = await contract.methods.votersCount().call();
      const temp = [];
      for (let i = 0; i < count; i++) {
        const voter = await contract.methods.getVoterDetails(i).call();
        temp.push({ name: voter[0], email: voter[1], address: voter[2] });
      }
      setVoters(temp);
      setLoading(false);
      setOpenModal(true);
      setModalTitle("Voter List");
      setModalData(temp);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickCandidate = () => {
    if (role === 1 && contract) {
      getCandidates();
    }
  };

  const handleClickVoter = () => {
    if (role === 1 && contract) {
      getVoters();
    }
  };

  return (
    <div style={{ backgroundColor: "#272727 ", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", height: "154vh", padding: "15px" , paddingTop :"40px" }}>
      <List>
        {role === 1 && (
          <ListItem button onClick={handleClickCandidate}>
            <PersonIcon />
            <ListItemText primary="Candidate List" />
          </ListItem>
        )}
        {role === 1 && (
          <ListItem button onClick={handleClickVoter}>
            <PersonIcon />
            <ListItemText primary="Voter List" />
          </ListItem>
        )}
      </List>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ backgroundColor: "#121212", padding: "20px", borderRadius: "5px", maxWidth: "500px", margin: "auto", marginTop: "100px" }}>
          <div style={{ color: "white", fontWeight: "bold", marginBottom: "10px" }}>{modalTitle}</div>
          {loading && <div>Loading...</div>}
          {!loading && modalData.map((item, index) => (
            <div key={index} style={{ color: "white", marginBottom: "10px", borderBottom: "1px solid #555" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <PersonIcon style={{ marginRight: "10px" }} />
                <div style={{ fontWeight: "bold" }}>Name:</div>
                <div style={{ marginLeft: "5px" }}>{item.name}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <EmailIcon style={{ marginRight: "10px" }} />
                <div style={{ fontWeight: "bold" }}>Email:</div>
                <div style={{ marginLeft: "5px" }}>{item.email}</div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;

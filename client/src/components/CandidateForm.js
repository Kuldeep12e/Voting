import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';


export default function CandidateForm({ contract, currentAccount }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();
    try {
      await contract.methods.addCandidate(name, email).send({ from: currentAccount });
      toast.success("Candidate Added Successfully");
     

      // Send email to the candidate
      await axios.post("http://localhost:5000/api/addCandidate", { name, email });
      console.log("Email sent to the candidate");

      setName("");
      setEmail(""); // Clear email field after submission
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
    <Toaster />
    
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        width: "60%",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleForm}
    >
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Candidate Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        />
        <Button variant="contained" type="submit">
          Add Candidate
        </Button>
      </Stack>
    </Box>
    </>
  );
}

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export default function VotersForm({ contract, web3, currentAccount }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();
    try {
      await contract.methods.addVoter(name, email, address).send({ from: currentAccount });
      console.log("voter added");
      toast.success("Voter added successfully"); // Use toast.success to display success message
      await axios.post('http://localhost:5000/api/addVoter', { name, email, address });
    } catch (error) {
      console.log(error);
      toast.error("Error adding voter"); // Use toast.error to display error message
    }
    setName("");
    setEmail("");
    setAddress("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <>
      <Toaster /> {/* Add Toaster component here */}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          width: "70%",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleForm}
      >
        <Stack spacing={2}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            value={address}
            onChange={handleAddressChange}
          />
          <Button variant="contained" type="submit">
            Add Voter
          </Button>
        </Stack>
      </Box>
    </>
  );
}

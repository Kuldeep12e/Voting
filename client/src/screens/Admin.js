// Admin.js

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Sidebar from '../components/Sidebar';
import Candidate from '../components/CandidateCard';
import CandidateForm from '../components/CandidateForm';
import VotersForm from '../components/VotersForm';
import CandidateBarChart from '../components/PlotlyChart'; // Import PlotlyChart component

export default function Admin({ role, contract, web3, currentAccount }) {
  const [electionState, setElectionState] = useState(0);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);

  const [open, setOpen] = useState(false);
  const [showVoterForm, setShowVoterForm] = useState(false);
  const [showCandidateForm, setShowCandidateForm] = useState(false);

  const getCandidates = async () => {
    if (contract) {
      console.log(contract);
      const count = await contract.methods.candidatesCount().call();
      const temp = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.getCandidateDetails(i).call();
        temp.push({ name: candidate[0], votes: candidate[2] });
      }
      setCandidates(temp);
      setLoading(false);
      console.log(temp);
    }
  };

  const getElectionState = async () => {
    if (contract) {
      const state = await contract.methods.electionState().call();
      setElectionState(parseInt(state));
    }
  };

  useEffect(() => {
    getElectionState();
    getCandidates();
  }, [contract]);

  const handleEnd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async () => {
    if (electionState === 0) {
      try {
        if (contract) {
          await contract.methods.startElection().send({ from: currentAccount });
          getElectionState();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else if (electionState === 1) {
      try {
        if (contract) {
          await contract.methods.endElection().send({ from: currentAccount });
          getElectionState();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setOpen(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        Loading...
      </Box>
    );
  }

  // Define data for the Plotly chart
  
  return (
    <Box>
      <Grid container>
        <Grid item xs={2}>
          <Sidebar role={role} contract={contract} web3={web3} currentAccount={currentAccount} />
        </Grid>
        <Grid item xs={10}>
          <Box>
            <Grid container sx={{ mt: 0 }} spacing={4}>
              <Grid item xs={12}>
                <Typography align="center" variant="h6" color="textSecondary">
                  ELECTION STATUS :{' '}
                  {electionState === 0 && 'Election has not started.'}
                  {electionState === 1 && 'Election is in progress.'}
                  {electionState === 2 && 'Election has ended.'}
                </Typography>
                <Divider />
              </Grid>
              {electionState !== 2 && (
                <Grid item xs={12} sx={{ display: 'flex' }}>
                  <Button
                    variant="contained"
                    sx={{ width: '40%', margin: 'auto' }}
                    onClick={handleEnd}
                  >
                    {electionState === 0 && 'Start Election'}
                    {electionState === 1 && 'End Election'}
                  </Button>
                </Grid>
              )}

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography align="center" variant="h6" textAlign="center">
                  {electionState === 0 && 'ADD VOTERS / CANDIDATES'}
                  {electionState === 1 && 'SEE LIVE RESULTS'}
                  {electionState === 2 && 'FINAL ELECTION RESULT'}
                </Typography>
              </Grid>

              <Grid container spacing={2}>
      {electionState === 0 && (
        <Grid container spacing={2} sx={{ justifyContent: 'center', marginTop: 2 }}>
          <Grid item xs={12} md={4} sx={{ marginLeft: -2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setShowVoterForm(true)}
            >
              Voter Form
            </Button>
          </Grid>
          <Grid item xs={10} md={4} sx={{ marginLeft: 0 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setShowCandidateForm(true)}
            >
              Candidate Form
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
             


              {electionState > 0 && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    overflowY: 'hidden',
                    overflowX: 'auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    
                    width: '98vw',
                    justifyContent: 'center',
                  }}
                >
                  {candidates &&
                    candidates.map((candidate, index) => (
                      <Box sx={{ mx: 2 }} key={index}>
                        <Candidate
                          id={index}
                          name={candidate.name}
                          voteCount={candidate.votes}
                        />
                      </Box>
                    ))}
                </Grid>
              )}
            </Grid>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {electionState === 0 && 'Do you want to start the election?'}
                  {electionState === 1 && 'Do you want to end the election?'}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleAgree} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>

            {/* Dialogs for Voter and Candidate Forms */}
            <Dialog
              open={showVoterForm}
              onClose={() => setShowVoterForm(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                <VotersForm
                  contract={contract}
                  web3={web3}
                  currentAccount={currentAccount}
                />
              </DialogContent>
            </Dialog>
            <Dialog
              open={showCandidateForm}
              onClose={() => setShowCandidateForm(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                <CandidateForm
                  contract={contract}
                  web3={web3}
                  currentAccount={currentAccount}
                />
              </DialogContent>
            </Dialog>
            {electionState > 0 && ( // Show the chart only if electionState > 0
        <Grid item xs={6} sx={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 5 }}> {/* Center align the content and add margins */}
          <CandidateBarChart candidates={candidates} />
        </Grid>
      )}

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

contract Election {
    enum State {
        NotStarted,
        InProgress,
        Ended
    }

    struct Candidate {
        uint256 id;
        string name;
        string email; // New field for email
        uint256 voteCount;
    }

    address public owner;
    State public electionState;

    struct Voter {
        uint256 id;
        string name;
        string email;
        address addr; // Include address field
    }

    mapping(uint256 => Candidate) candidates;
    mapping(uint256 => Voter) voter;
    mapping(address => bool) voted;
    mapping(address => Voter) voters; // Modify to store Voter struct
    mapping(address => bool) isVoter;

    uint256 public candidatesCount = 0;
    uint256 public votersCount = 0;

    constructor() {
        owner = msg.sender;
        electionState = State.NotStarted;
    }

    event Voted(uint256 indexed _candidateId);

    function startElection() public {
        require(msg.sender == owner);
        require(electionState == State.NotStarted);
        electionState = State.InProgress;
    }

    function endElection() public {
        require(msg.sender == owner);
        require(electionState == State.InProgress);
        electionState = State.Ended;
    }

    function addCandidate(string memory _name, string memory _email) public {
        require(owner == msg.sender, "Only owner can add candidates");
        require(electionState == State.NotStarted, "Election has already started");

        candidates[candidatesCount] = Candidate(candidatesCount, _name, _email, 0);
        candidatesCount++;
    }

    function addVoter(string memory _name, string memory _email, address _voter) public {
        require(owner == msg.sender, "Only owner can add voter");
        require(!isVoter[_voter], "Voter already added");
        require(electionState == State.NotStarted, "Voter can't be added after election started");

        voters[_voter] = Voter(votersCount, _name, _email, _voter);
        voter[votersCount]= Voter(votersCount, _name, _email, _voter);
        isVoter[_voter] = true;
        votersCount++;
    }

    function getRole(address _current) public view returns (uint256) {
        if (owner == _current) {
            return 1;
        } else if (isVoter[_current]) {
            return 2;
        } else {
            return 3;
        }
    }

    function vote(uint256 _candidateId) public {
        require(electionState == State.InProgress, "Election is not in progress");
        require(isVoter[msg.sender], "Non authorised user cannot vote");
        require(!voted[msg.sender], "You have already voted");
        require(_candidateId < candidatesCount, "Invalid candidate ID");

        candidates[_candidateId].voteCount++;
        voted[msg.sender] = true;

        emit Voted(_candidateId);
    }

    function getCandidateDetails(uint256 _candidateId) public view returns (string memory, string memory, uint256) {
        require(_candidateId < candidatesCount, "Invalid candidate ID");
        return (candidates[_candidateId].name, candidates[_candidateId].email, candidates[_candidateId].voteCount);
    }

     function getVoterDetails(uint256 _voterId) public view returns (string memory, string memory, address) {
        require(_voterId < votersCount, "Invalid voter ID");
        return (voter[_voterId].name, voter[_voterId].email, voter[_voterId].addr);
    }
    
}

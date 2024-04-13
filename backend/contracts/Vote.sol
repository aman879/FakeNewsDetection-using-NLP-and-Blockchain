//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract Vote{

    address public owner;
    uint256 public newsId = 0;
    uint256 public totalVoters = 0;
    address[] verifiers;

    struct News{
        uint256 newsId;
        uint64 real;
        uint64 fake;
        bool ans;
        bool draw;
        bool cal;
    }

    struct Votes{
        mapping(uint256 => bool) votes;
        mapping(uint256 => bool) vote;
        uint256 correctVotes;
        uint256 incorrectVotes;
    }

    mapping(uint256 => News) public newsData;
    mapping(uint256 => address) public voters;
    mapping(address => Votes) public userData;
    mapping(address => bool) public isVerifier;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyVerifiers() {
        require(isVerifier[msg.sender] || msg.sender == owner, "Only verifier can call this function");
        _;
    }

    event NewNewsAdded(
        uint256 indexed newsId
    );

    event NewsVerified(
        uint256 indexed newsId,
        bool ans,
        bool draw
    );

    constructor() {
        owner = msg.sender;
        verifiers.push(msg.sender);
    }

    function addNews() public onlyOwner onlyVerifiers {
        newsData[newsId] = News(
            newsId,
            0,
            0,
            false,
            false,
            false
        );
        newsId++;

        emit NewNewsAdded(newsId);
    }

    function vote(uint256 _newsId, bool check) external {
        require(!userData[msg.sender].votes[_newsId], "Already voted");
        
        News storage news = newsData[_newsId];
        if (check) {
            news.real++;
            userData[msg.sender].vote[_newsId] = true; 
        } else {
            news.fake++;
        }

        voters[totalVoters] = msg.sender;
        totalVoters++; 
        
        userData[msg.sender].votes[_newsId] = true;
    }

    function calculate(uint256 _newsId) external onlyOwner onlyVerifiers {
        News storage news = newsData[_newsId];

        require(!news.cal, "Already finalized");

        if(news.fake > news.real) {
            news.ans = false;
        } else if(news.real > news.fake) {
            news.ans = true;
        } else {
            news.draw = true;
        }
        news.cal = true;

        updateVotersDetails(_newsId, news.ans);

        emit NewsVerified(_newsId, news.ans, news.draw);
    }

    function updateVotersDetails(uint256 _newsId, bool ans) internal {
        for(uint256 i=0; i<totalVoters; i++) {
            Votes storage user = userData[voters[i]];
            if(user.votes[_newsId]) {
                if(ans == user.vote[_newsId]){
                    user.correctVotes++;
                } else {
                    user.incorrectVotes++;
                }
            }
        }
    }

    function addVerifier(address _verifier) external onlyOwner {
        isVerifier[_verifier] = true;
        verifiers.push(_verifier);
    }

    function removeVerifier(address _verifier) external onlyOwner {
        isVerifier[_verifier] = false;
        for (uint256 i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == _verifier) {
                delete verifiers[i];
                break;
            }
        }
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function checkVerifier(address _add) public view returns(bool) {
        return isVerifier[_add];
    }

    function getNewsData(uint256 _newsId) public view returns(uint64, uint64, bool, bool, bool) {
        News storage news = newsData[_newsId]
        returns{
            news.real,
            news.fake,
            news.ans,
            news.draw,
            news.cal
        }
    }

}
import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/NavBar/Navbar';
import { ethers } from "ethers";
import { contractAddress } from "./address"
import VoteArtifact from "./contracts/Vote.json"
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import News from './pages/News/News';

function App() {
  const [selectedAddress, setAddress] = useState(undefined)
  const [contract, setContract] = useState(undefined)
  const [owner, setOwner] = useState(undefined)

  async function connectWallet() {
    try {
      const [address] = await window.ethereum.request({method: "eth_requestAccounts"})
      
      initiliazeDaap(address)

      window.ethereum.on("accountsChanged",([newAddress]) => {
        if( newAddress === undefined) {
          setAddress([])
          setContract(undefined)
          return
        }
        initiliazeDaap(newAddress)
      })
    } catch(e) {
      console.log(e.message)
    }
  }

  async function initiliazeDaap(address) {
    setAddress(address)
    await initContract()


  }

  async function initContract() {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(
      contractAddress.Vote,
      VoteArtifact.abi,
      await provider.getSigner(0)
    )
    setOwner(await contract.getOwner())
    setContract(contract)
    return contract
  }

  async function addNews() {
    try {
      const tx = await contract.addNews()
        const receipt = await tx.wait()
  
        if (receipt.status === 0) {
          throw new Error("Transaction Failed!")
          
        }
        return "success"
    } catch(e) {
      console.log(e.message)
      return "failed"
    }
  }

  async function getNewsId() {
    try {
      const newsId = await contract.newsId()
      return newsId
    } catch(e) {
      console.log(e.message)
    }
  }
  
  async function getNewsData(newsId) {
    try{
      const result = await contract.getNewsData(newsId);
      console.log(result)
      return result
    }catch(e) {
      console.log(e.message)
    }
  }


  async function addVerifier(address) {
    try {
      const tx = await contract.addVerifier(address)
      const receipt = await tx.wait()

      if (receipt.status === 0) {
        throw new Error("Transaction Failed!")
        
      }
    }catch(e) {
      console.log(e.message)
    }
  }

  async function vote(newsId, check) {
    try {
      const tx = await contract.vote(newsId, check)
      const receipt = await tx.wait()

      if (receipt.status === 0) {
        throw new Error("Transaction Failed!")
        
      }
    } catch(e) {
      console.log(e.message)
    }
  }

  async function calculate(newsId) {
    try {
      const tx = await contract.calculate(newsId)
      const receipt = await tx.wait()

      if(receipt.status === 0) {
        throw new Error("Transaction Failed")
      }
    } catch(e) {
      console.log(e.message)
    }
  }

  async function checkVerifier(address) {
    if(address !== undefined) {
      try {
        console.log(address)
        const check = await contract.checkVerifier(address)
        return check
      } catch(e) {
        console.log(e.message)
      }
    } else {
      console.log("address is undefined",address)
    }
  }
  
  async function removeVerifiers(address){
    try {
      const tx = await contract.removeVerifier(address)
      const receipt = await tx.wait()
  
      if (receipt.status === 0) {
        throw new Error("Transaction Failed!")
        
      }
    }catch(e) {
      console.log(e.message)
    }
  }
  
  return (
    <>
      <Navbar connectWallet={connectWallet} address={selectedAddress}/>
      <BrowserRouter >
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/news" element={<News 
                                            address={selectedAddress} 
                                            owner={owner} 
                                            checkVerifier={checkVerifier}
                                            vote={vote}
                                            calculate={calculate}
                                            getNewsData={getNewsData}/>} 
          />
          <Route path="/profile" element={<Profile
                                            address={selectedAddress}
                                            owner={owner} 
                                            addVerifier={addVerifier} 
                                            removeVerifiers={removeVerifiers}
                                            checkVerifier={checkVerifier}
                                            addNews={addNews}
                                            getNewsId={getNewsId}
                                            getNewsData={getNewsData}/>
        }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

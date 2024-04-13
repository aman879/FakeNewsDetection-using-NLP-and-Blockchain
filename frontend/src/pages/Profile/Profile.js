import { useState, useEffect } from "react";
import axios from "axios";
export default function Profile({ address, owner, addVerifier, removeVerifiers, checkVerifier, addNews, getNewsId }) {
    const [isVerifier, setIsVerifier] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [prbFakeNews, setprbFakeNews] = useState(' ');
    const [prbTrueNews, setPrbTrueNews] = useState(' ');
    const [newsId, setNewsId] = useState(0)

    useEffect(() => {
        async function fetchVerifier() {
            const verifierStatus = await checkVerifier(address);
            setIsVerifier(verifierStatus);
        }
        
        if (address) {
            fetchVerifier();
        }
    }, [address, checkVerifier]);

    const predictNews = async () => {
        try {
            const response = await axios.post('http://localhost:3000/predict', {data: news})
            if(response.data[0] === 0) {
                setPrediction('False')
            } 
            if(response.data[0] === 1) {
                setPrediction("True")
            }
            setprbFakeNews(response.data[1][0][0])
            setPrbTrueNews(response.data[1][0][1])
        } catch(e) {
            console.error('error', e)
        }
      }

      const addingNews = async () => {
        try {
            await addNews();
            const newsId = parseInt(await getNewsId());
            setNewsId(newsId)
            await predictNews();
        } catch (error) {
            console.error('Error adding news:', error);
        }
    }
    
    useEffect(() => {
        const postNewsData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/news', {
                    newsId,
                    title,
                    news,
                    prediction,
                    prbFakeNews,
                    prbTrueNews
                });
                console.log(response.data);
                setTitle('');
                setNews('');
                setNewsId(0);
                setPrediction(null)
                setPrbTrueNews(' ')
                setprbFakeNews(' ')
            } catch (error) {
                console.error('Error posting news:', error);
            }
        };
    
        if (prediction !== null && prbFakeNews !== null && prbTrueNews !== null) {
            postNewsData();
        }
        //eslint-disable-next-line
    }, [prediction, prbFakeNews, prbTrueNews]);
    

    const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

    const [verAddress, setAddVarAddress] = useState("");
    const [remAddress, setRemoveVarAddress] = useState("");
    const [news, setNews] = useState("");
    const [title, setTitle] = useState("");

    return (
        <>
            <div>
                <div className="ml-5 mt-10 text-center">
                    <span className="font-semibold">User Address:</span> <span className="font-sans">{address}</span>
                    {
                        isOwner ?
                            <span className="bg-yellow-500 m-3 p-2 rounded-full">Owner</span>
                            : isVerifier &&
                            <span className="bg-red-500 m-3 p-2 rounded-full">Verifier</span>
                    }
                </div>
                {
                    isOwner &&
                    <div>
                        <div className="flex flex-row ml-10 mt-5 p-5">
                            <p className="pr-12">Add Verifier</p>
                            <input onChange={(e) => setAddVarAddress(e.target.value)} value={verAddress} className="rounded-sm text-black" type="text" />
                            <button onClick={() => addVerifier(verAddress)} className="ml-5 pl-2 pr-2 bg-[#a65d58] text-black rounded-xl">Add</button>
                        </div>
                        <div className="flex flex-row ml-10 p-5">
                            <p className="pr-5">Remove verifier</p>
                            <input onChange={(e) => setRemoveVarAddress(e.target.value)} value={remAddress} className="rounded-sm text-black" type="text" />
                            <button onClick={() => removeVerifiers(remAddress)} className="ml-5 pl-2 pr-2 bg-[#a65d58] text-black rounded-xl">Remove</button>
                        </div>
                    </div>
                }
                {   
                    (isOwner || isVerifier) &&
                    <div>
                        <div className="flex flex-col mt-10 items-center">
                            <p className="w-1/2 font-semibold">Title: </p>
                            <input 
                                className="mb-4 w-1/2 text-black" 
                                type="text" 
                                value={title} 
                                placeholder="Enter news title here..."
                                onChange={(e) => setTitle(e.target.value)}/>
                            <p className="w-1/2 font-semibold">Description: </p>
                            <textarea
                                className="w-1/2 h-40 text-black border rounded p-2 mb-4"
                                placeholder="Enter the news here..."
                                value={news}
                                onChange={(e) => setNews(e.target.value)}
                            ></textarea>
                            <button 
                                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-full"
                                onClick={addingNews}
                                >add
                            </button>
                        </div>
                        {prediction && (
                            <div className="mt-4 p-4 border rounded">
                            <p className="text-lg font-semibold">
                                Prediction: <span className="text-red-500">{prediction}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Probability News is Fake: <span className="text-red-500">{prbFakeNews}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Probability News is Real: <span className="text-red-500">{prbTrueNews}</span>
                            </p>
                            </div>
                        )}
                    </div>
                }
            </div>
        </>
    )
}

import SimpleCard from "../../components/Card/Card";
import datas from "../../contracts/news.json";
import React, {useState, useEffect} from "react";

export default function News({address, owner, checkVerifier, vote, calculate, getNewsData}) {
    const [isVerifier, setIsVerifier] = useState(false);
    const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

    useEffect(() => {
        async function fetchVerifier() {
            const verifierStatus = await checkVerifier(address);
            setIsVerifier(verifierStatus);
        }
        
        if (address) {
            fetchVerifier();
        }
    }, [address, checkVerifier]);



    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-3">
                {datas.map((data, i) => (
                    <SimpleCard 
                        key={i}
                        newsId={data.newsId}
                        title={data.title}
                        description={data.news}
                        prediction={data.prediction}
                        perFake={data.prbFakeNews}
                        perReal={data.prbTrueNews}
                        newsData={data.newsData}
                        isVerifier={isVerifier}
                        isOwner={isOwner}
                        vote={vote}
                        calculate={calculate}
                        getNewsData={getNewsData}
                    />
                ))}
            </div>
        </div>
    );
}

import {
    Card,
    CardBody,
    CardFooter,
    Typography
} from "@material-tailwind/react";

export default function SimpleCard({isOwner, isVerifier, newsId, title, description, prediction, perFake, perReal, vote,newsData, getNewsData}) {
    const probabReal = perReal*100
    const probabFake = perFake*100

    const userVote = async (newsId, check) => {
        console.log(newsId)
        await vote(newsId, check)
        const result = await updateNewsData(check)
        console.log(result)
    }

    const updateNewsData = async (check) => {
        try {
            const result = await getNewsData(newsId);
            const [real, fake, ans, draw, cal] = result;
            const cnReal = parseInt(real);
            const cnFake = parseInt(fake);
    
            const newsData = {
                cnReal,
                cnFake,
                ans,
                draw,
                cal
            };
    
            // Send the updated news data to the backend
            await fetch('http://localhost:3000/api/news-update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newsId,
                    newsData: newsData,
                    check
                })
            });
    
            return "success";
        } catch(e) {
            console.log(e.message);
        }
    }
    

    return (
        <Card className="m-6 p-4 w-96 group bg-gray-500 flex flex-col justify-between">
            <CardBody className="">
                <span className="text-xs bg-pink-400 p-1 rounded-full mr-2">{prediction}</span>
                <span className="text-xs bg-pink-400 p-1 rounded-full mr-2 font"><span className="font-sans">{probabFake.toPrecision(3)}</span>% fake</span>
                <span className="text-xs bg-pink-400 p-1 rounded-full mr-2"><span className="font-sans">{probabReal.toPrecision(3)}</span>%  real</span>
                <Typography variant="h5" color="blue-gray" className="mb-2 mt-2 underline hover:cursor-pointer">
                    {title}
                </Typography>
                <Typography>
                    {description}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 mt-4">
                <button onClick={() => userVote(newsId, 0)} className="bg-pink-600 hover:bg-pink-500 rounded-full p-2 mr-2 font-semibold hover:cursor-pointer">Vote Fake</button>
                <button onClick={() => userVote(newsId, 1)} className="bg-pink-600 hover:bg-pink-500  rounded-full p-2 font-semibold hover:cursor-pointer">Vote Real</button>
                {
                    (isOwner || isVerifier) && 
                        <button className="bg-pink-600 hover:bg-pink-500  rounded-full p-2 ml-2 font-semibold hover:cursor-pointer">Result</button>
                }
                <div className="mt-1">
                <span className="text-xs bg-pink-400 p-1 rounded-full ml-2 mr-8 font"><span className="font-sans">{newsData.cnFake}</span> Fake vote</span>
                    
                <span className="text-xs bg-pink-400 p-1 rounded-full mr-2 font"><span className="font-sans">{newsData.cnReal}</span> Real vote</span>
                </div>
            </CardFooter>
        </Card>
    );
}

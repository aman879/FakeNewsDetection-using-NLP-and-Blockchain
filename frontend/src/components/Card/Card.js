import {
    Card,
    CardBody,
    CardFooter,
    Typography
} from "@material-tailwind/react";

export default function SimpleCard({isOwner, isVerifier, newsId, title, description, prediction, perFake, perReal, vote}) {
    const probabReal = perReal*100
    const probabFake = perFake*100

    const userVote = async (newsId, check) => {
        await vote(newsId, check)
    }
    return (
        <Card className="m-6 pb-2 w-96 group bg-gray-500 flex flex-col justify-between">
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
            <CardFooter className="pt-0">
                <button onClick={() => userVote(newsId, 0)} className="bg-pink-600 hover:bg-pink-500 rounded-full p-2 mr-2 font-semibold hover:cursor-pointer">Vote Fake</button>
                <button onClick={() => userVote(newsId, 1)} className="bg-pink-600 hover:bg-pink-500  rounded-full p-2 font-semibold hover:cursor-pointer">Vote Real</button>
                {
                    (isOwner || isVerifier) && 
                        <button className="bg-pink-600 hover:bg-pink-500  rounded-full p-2 ml-2 font-semibold hover:cursor-pointer">Result</button>
                }
            </CardFooter>
        </Card>
    );
}

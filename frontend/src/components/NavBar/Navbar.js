

export default function Navbar({ connectWallet, address }) {
    return(
        <section>
            <div className="relative pt-4 px-8 ">
                <nav className="relative" aria-label="Global">
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-3xl pb-4 text-[#ccd6f6] italic font-extrabold">
                            <p style={{ fontFamily: 'Tilt Neon'}}>Fake <span className="text-pink-400"> News</span><span className="text-[#8892b0]"> Detection</span></p>
                        </div>
                        <div className="text-gray-300">
                            <a href="/home" className="mr-8">Home</a>
                            <a href="/news" className="mr-8">News</a>
                            <a href="/home" className="mr-8">About us</a>
                            { window.ethereum 
                                ?   address && address.length 
                                        ?
                                            <a href="/profile" className="mr-8">Profile</a>
                                        :
                                            <button
                                            onClick={() => connectWallet()}
                                            className='text-white border-2 px-6 py-3 my-2 rounded-lg hover:bg-pink-600 hover:border-pink-600'>Connect</button>
                                :
                                    <button
                                    onClick={() => window.open("https://metamask.io/download/", "_blank")}
                                    className='text-white border-2 px-6 py-3 my-2 rounded-lg hover:bg-orange-600 hover:border-orange-600'>Install Metamask</button>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    )
}
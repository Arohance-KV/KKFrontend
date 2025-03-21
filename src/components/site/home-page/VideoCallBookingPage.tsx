import { UIsideBar } from "./Solitare";

export const VideoCallBookingPage = () => {
    return (
        <div className='w-full relative pb-14'>
            <UIsideBar side="left"/>
            <UIsideBar side="right"/>
            <div id='solitare-main' className="bg-[#E1C6B3] px-8 opacity-0 mt-56 gap-4 flex flex-col items-center w-[80%] justify-self-center rounded-tr-[100px] aspect-video">
                <div className="w-full mt-14 text-center text-white ">
                    <p className="inria-serif-regular text-6xl">
                        Video call cart                    
                    </p>
                    <div className="bg-red-600 w-full h-full flex-1">

                    </div>
                </div>    
            </div>
        </div>
    );
};
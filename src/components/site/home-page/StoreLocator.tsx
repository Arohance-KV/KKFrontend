import { UIsideBar } from "./Solitare"

const CITIES = [
    "Bangalore",
    "Surat",
    "Lucknow",
    "Raipur",
    "Kolkata",
    "Mumbai",
    "Delhi",
];

export const StoreLocator = () => {
    return (
        <div className="min-h-screen relative pb-14 ">
                <UIsideBar side="left"/>
                <UIsideBar side="right"/>
                <div className="bg-[#E1C6B3] mt-56 justify-self-center w-[80%] h-56 rounded-lg">
                    
                </div>
                <div className="flex w-[80%] justify-self-center h-auto gap-8">
                    
                    <div className="bg-[#E1C6B3] text-white inria-serif-regular mt-28 gap-4 flex flex-col items-center py-8 flex-[0.25] justify-self-center rounded-tr-[100px] aspect-video">
                        {CITIES.map(City => {
                            return (
                                <p className="p-2 hover:cursor-pointer">{City}</p>
                            );
                        })}
                    </div>
                    <div className="bg-[#E1C6B3] mt-28 gap-4 flex flex-col items-center flex-[0.75] justify-self-center rounded-tr-[100px] aspect-video">

                    </div>


                </div>
        </div>
    );
}
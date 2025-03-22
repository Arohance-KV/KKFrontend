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
        <div className="min-h-screen relative pb-14">
                <UIsideBar side="left"/>
                <UIsideBar side="right"/>
                <div className="bg-[#E1C6B3] sm:mt-56 mt-14  justify-self-center w-[80%] h-56 rounded-lg">
                    
                </div>
                <div className="flex w-[80%] justify-self-center sm:flex-row flex-col h-auto gap-8">
                    
                    <div className="bg-[#E1C6B3] sm:flex hidden text-white inria-serif-regular mt-28 gap-4 flex-col items-center py-8 flex-[0.25] justify-self-center rounded-tr-[100px] aspect-video">
                        {CITIES.map(City => {
                            return (
                                <p className="p-2 hover:cursor-pointer">{City}</p>
                            );
                        })}
                    </div>
                    <div className="bg-[#E1C6B3] mt-28 gap-4 flex flex-col items-center flex-[0.75] justify-self-center sm:rounded-tr-[100px] rounded-md aspect-video">

                    </div>


                </div>
        </div>
    );
}
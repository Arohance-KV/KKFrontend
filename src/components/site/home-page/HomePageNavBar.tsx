import { CircleUser, Heart, ShoppingCart, Store, Video } from "lucide-react";
// import { Input } from "../../ui/input";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/utils/interfaces";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Squash as Hamburger } from 'hamburger-react';

export const HomePageNavBar = () => {

    const customerData: IUser = useSelector((state: any) => state.website.customerData);

    const [ wishListLength, setWishListLength ] = useState(0);
    const [ cartLength, setCartLength ] = useState(0);
    const [ videoCartLength, setVideoCartLength ] = useState(0);

    useEffect(() => {
        setWishListLength(customerData?.wishList?.length);
        setVideoCartLength(customerData?.videoCallCart?.length);
        setCartLength(customerData?.cart?.length);
    }, [ customerData ]);

    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <div className="sm:flex hidden w-full flex-col gap-4 bg-transparent absolute top-0 left-0 right-0 z-10">
                <div className="min-h-[100px] flex relative px-10">
                    <img src="../../../../public/logo.svg" className="absolute left-1/2 -translate-x-1/2" />
                    <div className="flex-1"></div>
                    <div className="flex-[0.4] gap-[3%] flex justify-center items-center">
                        {/* <div className="relative w-full">
                            <Input type="text" placeholder="Search" className="pl-6 h-8 border-[#A68A7E] border-2 bg-transparent text-[#A68A7E] placeholder:text-[#A68A7E]" />
                            <Search className="absolute top-1/2 left-2 -translate-y-1/2 w-3 h-3 stroke-[#A68A7E] stroke-2"/>
                        </div> */}
                        <Link to={"/video-cart"}>
                            <Button className="rounded-full m-0 px-3 py-4 relative" variant={"ghost"}>
                                <Video className="fill-[#A68A7E] stroke-[#A68A7E] w-10 h-10"/>
                                <Badge className="absolute text-[10px] h-0 w-0 px-2 py-2 text-[#A68A7E] bg-transparent border border-[#A68A7E] rounded-full top-0 right-0">{videoCartLength}</Badge>
                            </Button>
                        </Link>
                        <Link to={"/wishlist"}>
                            <Button className="rounded-full m-0 px-3 relative  py-4" variant={"ghost"}>
                                <Heart className="fill-[#A68A7E] stroke-[#A68A7E] relative w-10 h-10"/>
                                <Badge className="absolute text-[10px] h-0 w-0 px-2 py-2 text-[#A68A7E] bg-transparent border border-[#A68A7E] rounded-full top-0 right-0">{wishListLength}</Badge>
                            </Button>
                        </Link>
                        <Link to={"/cart"}>
                            <Button className="rounded-full m-0 px-3 relative py-4" variant={"ghost"}>
                                <ShoppingCart className="fill-[#A68A7E] stroke-[#A68A7E] w-10 h-10" />
                                <Badge className="absolute text-[10px] h-0 w-0 px-2 py-2 text-[#A68A7E] bg-transparent border border-[#A68A7E] rounded-full top-0 right-0">{cartLength}</Badge>
                            </Button>
                        </Link>
                        <Link to={"/account-details"}>
                            <Button className="rounded-full m-0 px-3 py-4" variant={"ghost"}>
                                <CircleUser className="stroke-[#A68A7E] w-10 h-10"/>
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex self-center items-center justify-evenly text-[#A68A7E] w-[80%]">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/collections"}>Collections</Link>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/solitare"}>Solitare</Link>
                    <Link to={"/store-locator"}>
                        Store Locator
                    </Link>
                    <Link to={"/giftcards"}>Giftcards</Link>
                </div>
            </div>
            <div id="phone-navbar" className="sm:hidden justify-between items-center flex w-full h-14">
                <img src="./logo.svg" alt="" className="" />
                <Link to={"/store-locator"}>
                    <Store className="fill-[#E1C6B3] w-4 h-4 stroke-[#E1C6B3]"/>
                </Link>
                <Link to={"/wishlist"}>
                    <Heart className="fill-[#E1C6B3] w-4 h-4 stroke-[#E1C6B3]" />
                </Link>
                <Link to={"/cart"}>
                    <ShoppingCart className="fill-[#E1C6B3] w-4 h-4 stroke-[#E1C6B3]" />
                </Link>
                <Hamburger color="#E1C6B3" toggled={isOpen} toggle={setOpen} size={14} />
            </div>
        </>
    );
};
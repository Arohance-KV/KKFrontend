import { useNavigate, useParams } from "react-router-dom"
import { UIsideBar } from "../home-page/Solitare";
import { useEffect, useState } from "react";
import { ICartItem, IProduct, IUser, IWishListItem } from "../../../utils/interfaces";
import EmblaCarousel from "./carousel-components/EmblaCarousel";
import "./../../../index.css";
import { Button } from "../../ui/button";
import { updateCart, updateVideoCallCart, updateWishList } from "../../../utils/utilityFunctions";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Trash2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import { toast } from "sonner";
import { ToastSuccess } from "../../../utils/UtilityComponents";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ProductPage = () => {
    const { productId }= useParams();

    // const [ product, setProduct ] = useState<IProduct>();
    const [ productData, setProductData ] = useState<IProduct>(useSelector((state: any) => state.website.productData));
    const dispatch = useDispatch();
    const userData: IUser = useSelector((state: any) => state.website.customerData);
    const currentWishlist = userData?._id ? userData?.wishList : JSON.parse(localStorage.getItem("wishList")!) ;
    const currentCart: ICartItem[] = userData?._id ? userData?.cart : JSON.parse(localStorage.getItem("cart")!);
    const currentVideoCallCart: ICartItem[] = userData?._id ? userData?.videoCallCart : JSON.parse(localStorage.getItem("videoCallCart")!);
    const [ isInWishList, setIsInWishList ] = useState<boolean>(false);
    const [ isInCart, setIsInCart ] = useState<boolean>(false);
    const [ isInVideoCallCart, setIsInVideoCallCart ] = useState(false);
    const [ isWishListAddedButtonLoading, setIsWishListAddedButtonLoading ] = useState<boolean>(false);
    const [ isCartAddedButtonLoading, setIsCartAddedButtonLoading ] = useState<boolean>(false);
    const [ isInVideoCallCartButtonLoading, setIsInVideoCallCartButtonLoading ] = useState(false);

    useEffect(() => {
        (async function () {
            await getProductFromId();
        })()
    }, []);    
    
    useEffect(() => {
        setIsInWishList(currentWishlist?.find((item: IWishListItem) => item?.product?._id === productData?._id) == undefined ? false : true);
        setIsInCart(currentCart?.find((item: ICartItem) => item?.product._id === productData?._id) == undefined ? false : true);
        console.log(currentWishlist?.find((item: IProduct) => item?._id === productData?._id), isInWishList, currentCart, currentWishlist);
        console.log(currentWishlist, isInWishList, isInCart, currentCart, productData, productData);
        console.log(currentWishlist, productData);
    }, [ productData ]);

    const getProductFromId = async () => {
        try {
            // @ts-ignore
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}products/get-product/${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            // console.log(response);

            if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
            
            const data = await response.json();
            console.log(data.data);
            setProductData(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    // const [ isInCart, setIsInCart ] = useState(false);
    // const [ isInWishList, setIsInWishList ] = useState(false);
    
    const navigate = useNavigate();

    return (
        <section id="product-section" className="w-full relative mt-56 pb-14 min-h-screen">
            <UIsideBar side="left"/>
            <UIsideBar side="right"/>
            <div id='solitare-main' className="border-[#E1C6B3] border flex flex-col opacity-0 bg-blue-600/50 w-[90%] justify-self-center rounded-lg aspect-video">
                <div className="bg-red-300/50 px-[5%] flex h-full">
                    <div className="bg-pink-900/50 relative min-h-80 flex-[0.55]">
                        {/* <EmblaCarousel product={productData!} /> */}
                        <Button className="absolute top-0 left-0" variant={"ghost"} onClick={(e) => {
                            e.preventDefault();
                            navigate("/collections");
                        }}><ArrowLeft className="stroke-[#E1C6B3]" /></Button>
                        <img src={productData?.imageUrl?.[0]?.url} alt="" className="w-[70%] aspect-square rounded-md border border-[#E1C6B3]" />
                    </div>
                    <div className="bg-purple-100/50 border-l-2 text-[#A68A7E] inria-serif-regular border-l-[#E1C6B3]  flex-[0.45]">
                        <p>{productData?.name}</p>
                        <p className="text-xl">{productData?.name}</p>
                        <p>Our promises</p>
                        <div className="bg-green-300 w-[80%] gap-2 justify-self-center flex-col flex">
                            <div className="flex w-full gap-2 bg-pink-600">
                                <Button 
                                    className={cn("flex col-span-5 bg-[#A68A7E] flex-1 row-span-1 justify-center items-center gap-2 text-lg", isCartAddedButtonLoading && `bg-gray-100`)}
                                    onClick={async (e) => {
                                    setIsCartAddedButtonLoading(true);
                                    e.preventDefault();
                                    if( isInCart )
                                    {
                                        await updateCart({ product: productData!, quantity: 1, color: "white", karat: 14, totalPrice: 5000 }, false, false, currentCart, dispatch, userData?._id ? true : false, currentWishlist, currentVideoCallCart);
                                        setIsCartAddedButtonLoading(false);
                                        setIsInCart(false);
                                        return toast.success("Product deleted from cart successfully!", { className: "font-[quicksand]", icon: <Trash2 className="w-4 h-4 stroke-red-500" /> });
                                    }
                                    await updateCart({ product: productData!, quantity: 1, color: "white", karat: 14, totalPrice: 50000 }, true, false, currentCart, dispatch, userData?._id ? true : false, currentWishlist, currentVideoCallCart);
                                    setIsCartAddedButtonLoading(false);
                                    setIsInCart(true);
                                    return toast.success("Product added to cart successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> });
                                }}>Add to cart+</Button>
                                <Button className="flex-1 bg-[#A68A7E]" onClick={ async (e) => {
                                    setIsWishListAddedButtonLoading(true);
                                    e.preventDefault();
                                    if( isInWishList )
                                    {
                                        await updateWishList({product: productData!, color: "white", karat: 14}, false, currentWishlist, dispatch, userData?._id ? true : false, currentCart, currentVideoCallCart);
                                        setIsWishListAddedButtonLoading(false);
                                        setIsInWishList(false);
                                        return toast.success("Product deleted from wishlist successfully!", { className: "font-[quicksand]", icon: <Trash2 className="w-4 h-4 stroke-red-500" /> });
                                    }
                                    await updateWishList({ product: productData!, color: "white", karat: 14 }, true, currentWishlist, dispatch, userData?._id ? true : false, currentCart, currentVideoCallCart);
                                    setIsWishListAddedButtonLoading(false);
                                    setIsInWishList(true);
                                    return toast.success("Product added to wishlist successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> });
                                }}>{isInWishList ? "Remove from wishlist" : "Save to wishlist"}</Button>
                            </div>
                            <Button className="border-[#A68A7E] text-[#A68A7E] bg-white" onClick={async (e) => {
                                setIsInVideoCallCartButtonLoading(true);
                                e.preventDefault();
                                if( isInVideoCallCart )
                                {
                                    await updateVideoCallCart({ product: productData!, quantity: 1, color: "white", karat: 14, totalPrice: 50000 }, false, false, currentCart, dispatch, userData?._id ? true : false, currentWishlist, currentVideoCallCart);
                                    setIsInVideoCallCartButtonLoading(false);
                                    setIsInVideoCallCart(false);
                                    return toast.success("Product deleted from cart successfully!", { className: "font-[quicksand]", icon: <Trash2 className="w-4 h-4 stroke-red-500" /> });
                                }
                                await updateVideoCallCart({ product: productData!, quantity: 1, color: "white", karat: 14, totalPrice: 60000 }, true, false, currentCart, dispatch, userData?._id ? true : false, currentWishlist, currentVideoCallCart);
                                setIsInVideoCallCartButtonLoading(false);
                                setIsInVideoCallCart(true);
                                return toast.success("Product added to cart successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> });
                            }}>Add to video call cart</Button>
                        </div>
                        <div className="flex">
                            <div className="bg-red-300 flex-1 flex w flex-col gap-4">
                                <p className="">
                                    Colours:
                                </p>
                                <RadioGroup defaultValue={Array.isArray(productData?.goldColor) ? productData?.goldColor[0] : productData?.goldColor}>
                                    {Array.isArray(productData?.goldColor) ? productData?.goldColor?.map(color => {
                                        return (
                                            <Label className={cn("flex items-center space-x-2 w-44 px-6 text-white py-4 rounded-md", color == "white" && `bg-gradient-to-r from-[#8A8A8A] to-[#A8A8A8]`)}>
                                                <RadioGroupItem value={color} id="r3" className="" />
                                                <Label className="captalize" htmlFor="r3">{color}</Label>
                                            </Label>
                                        );
                                    }) : <div className="flex  items-center space-x-2">
                                            <RadioGroupItem value={productData?.goldColor} className="" id="r3" />
                                            <Label htmlFor="r3">{productData?.goldColor}</Label>
                                    </div>}
                                </RadioGroup>
                            </div>
                            <div className="bg-blue-300 flex-1">
                                <div className="bg-yellow-300 flex-1 flex w flex-col gap-4">
                                    <p className="">
                                        Gold karats:
                                    </p>
                                    {/* <RadioGroup defaultValue={ productData?.totalKarats[0] + "" }>
                                        {productData?.totalKarats?.map(karat => {
                                            return (
                                                <Label className={cn("flex items-center space-x-2 w-44 px-6 text-white py-4 rounded-md")}>
                                                    <RadioGroupItem value={karat+""} id="r3" className="" />
                                                    <Label className="captalize" htmlFor="r3">{karat}k</Label>
                                                </Label>
                                            );
                                        })}
                                    </RadioGroup> */}
                                    <RadioGroup defaultValue={ `14k` }>
                                        <Label className={cn("flex items-center space-x-2 w-44 px-6 text-[#E1C6B3] border border-[#E1C6B3] bg-white py-4 rounded-md")}>
                                            <RadioGroupItem value={`14k`} id="r3" className="" />
                                            <Label className="captalize" htmlFor="r3">{`14k`}</Label>
                                        </Label>
                                        <Label className={cn("flex items-center space-x-2 w-44 px-6 text-[#E1C6B3] border border-[#E1C6B3] bg-white py-4 rounded-md")}>
                                            <RadioGroupItem value={`18k`} id="r3" className="" />
                                            <Label className="captalize" htmlFor="r3">{`18k`}</Label>
                                        </Label>
                                    </RadioGroup>
                                    <Input className="w-14 custom-spinner" type="number" defaultValue={1} min={0}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </section>
    );
}
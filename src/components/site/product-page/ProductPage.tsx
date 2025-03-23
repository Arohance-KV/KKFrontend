import { useNavigate, useParams } from "react-router-dom"
import { UIsideBar } from "../home-page/Solitare";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ICartItem, IProduct, IUser, IWishListItem } from "../../../utils/interfaces";
// import EmblaCarousel from "./carousel-components/EmblaCarousel";
import "./../../../index.css";
import { Button } from "../../ui/button";
import { updateCart, updateVideoCallCart, updateWishList } from "../../../utils/utilityFunctions";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, ChevronLeft, ChevronRight, ListMinus, ListPlus, Loader2, Trash2, Triangle, Video, VideoOff } from "lucide-react";
import { cn } from "../../../lib/utils";
import { toast } from "sonner";
import { ToastSuccess } from "../../../utils/UtilityComponents";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getDiamondPrice } from "@/utils/CalculateTotal";

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
    // @ts-ignore
    const [ isWishListAddedButtonLoading, setIsWishListAddedButtonLoading ] = useState<boolean>(false);
    const [ isCartAddedButtonLoading, setIsCartAddedButtonLoading ] = useState<boolean>(false);
    // @ts-ignore
    const [ isInVideoCallCartButtonLoading, setIsInVideoCallCartButtonLoading ] = useState(false);

    const [ price, setPrice ] = useState<number>(0);

    const quantityRef = useRef(1);
    const karatRef = useRef(14);
    const colourRef = useRef("White");

    useEffect(() => {
        (async function () {
            await getProductFromId();
            // console.log(quantityRef.current, karatRef.current, colourRef.current);
        })()
        // console.log(document.getElementById("colour-input").value, document.getElementById("karat-input"), document.getElementById("quantity-input").value)
    }, []);    
    
    useEffect(() => {
        setIsInWishList(currentWishlist?.find((item: IWishListItem) => item?.product?._id === productData?._id) == undefined ? false : true);
        setIsInCart(currentCart?.find((item: ICartItem) => item?.product?._id === productData?._id) == undefined ? false : true);
        console.log(currentWishlist?.find((item: IProduct) => item?._id === productData?._id), isInWishList, currentCart, currentWishlist);
        console.log(currentWishlist, isInWishList, isInCart, currentCart, productData, productData);
        console.log(currentWishlist, productData);
        setPrice(getDiamondPrice({karat: 14, netWeight: productData?.netWeight, solitareWeight: productData?.solitareWeight, multiDiaWeight: productData?.multiDiamondWeight}))
    }, [ productData ]);

    const getProductFromId = async () => {
        try {
            // @ts-ignore
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}products/get-product/${productId}`, {
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

    // console.log(productData?.goldColor[0]?.charAt(0).toUpperCase() + productData?.goldColor[0]?.slice(1) == "White");

    return (
        <section id="product-section" className="w-full relative mt-56 pb-14 min-h-screen">
            <UIsideBar side="left"/>
            <UIsideBar side="right"/>
            <div id='solitare-main' className="border-[#E1C6B3] border flex flex-col opacity-0 w-[90%] justify-self-center rounded-lg aspect-video">
                <div className="px-[5%] flex h-full">
                    <div className="relative min-h-80 flex flex-col justify-between flex-[0.55]">
                        {/* <EmblaCarousel product={productData!} /> */}
                        <Button className="absolute top-5 left-0" variant={"ghost"} onClick={(e) => {
                            e.preventDefault();
                            navigate("/collections");
                        }}><ArrowLeft className="stroke-[#E1C6B3]" /></Button>
                        <div className="flex-1 flex justify-center items-center">
                            {/* <img src={productData?.imageUrl?.[0]?.url} alt="" className="w-[70%] aspect-square rounded-md border border-[#E1C6B3]" /> */}
                            <JewelryCarousel imageUrl={ productData?.imageUrl } />
                        </div>
                        <div className="bg-[#BFA6A1] self-end justify-self-end justify-center items-center gap-4 p-4 w-[80%] inria-serif-regular flex flex-col text-white" id="certificate-of-authenticity">
                            <p className="text-bold text-lg">
                                CERTIFICATE OF AUTHENTICITY
                            </p>
                            <p className="text-center">
                                Every Piece of Jewellery that we make is Certified for Authencity by third-party international laboratories like SGL and IGI
                            </p>
                        </div>
                    </div>
                    <div className="border-l-2 flex flex-col justify-evenly pl-8 text-[#A68A7E] inria-serif-regular border-l-[#E1C6B3]  flex-[0.45]">
                        <p>{productData?.name}</p>
                        <p className="text-xl flex flex-col">
                            <p>
                                {productData?.name}
                            </p>
                            <p>
                                ₹{Math.round(price)} <span className="text-xs">(excluding GST)</span>
                            </p>
                        </p>
                        <div className="flex">
                            <div className="flex-1 flex w flex-col gap-4">
                                <p className="">
                                    Colours:
                                </p>
                                {/* <RadioGroup defaultValue={Array.isArray(productData?.goldColor) ? productData?.goldColor[0] + "" : productData?.goldColor + ""}> */}
                                <RadioGroup id="colour-input" defaultValue={colourRef.current} onValueChange={(value) => {
                                    console.log(value);
                                    colourRef.current = value;
                                }}>
                                    <Label className={cn("flex items-center space-x-2 w-44 px-6 text-white py-4 rounded-md bg-gradient-to-r from-[#8A8A8A] to-[#A8A8A8]")}>
                                        <RadioGroupItem value={"White"} id="White" className="" />
                                        <Label className="captalize" htmlFor="White">{`White`}</Label>
                                    </Label>
                                    <Label className={cn("flex items-center space-x-2 w-44 px-6 text-white py-4 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#D8B74C]")}>
                                        <RadioGroupItem value={"Yellow"} id="Yellow" className="" />
                                        <Label className="captalize" htmlFor="Yellow">{`Yellow`}</Label>
                                    </Label>
                                    <Label className={cn("flex items-center space-x-2 w-44 px-6 text-white py-4 rounded-md bg-gradient-to-r from-[#B76E79A8] to-[#D2A7AE]")}>
                                        <RadioGroupItem value={"Rose"} id="Rose" className="" />
                                        <Label className="captalize" htmlFor="Rose">{`Rose`}</Label>
                                    </Label>
                                </RadioGroup>
                            </div>
                            <div className="flex-1">
                                <div className="flex-1 flex w-full h-full flex-col gap-4">
                                    <p className="">
                                        Gold karats:
                                    </p>
                                    <RadioGroup id="karat-input" onValueChange={(value) => {
                                            setPrice(getDiamondPrice({karat: Number(value), netWeight: productData?.netWeight, solitareWeight: productData?.solitareWeight, multiDiaWeight: productData?.multiDiamondWeight}))
                                            karatRef.current = Number(value);
                                    }} defaultValue={ "14" }>
                                        {/* {productData?.totalKarats?.map(karat => { */}
                                            {/* return ( */}
                                        <Label className={cn("items-center flex justify-between w-44 px-6 text-[#A68A7E] border border-[#A68A7E] py-4 rounded-md")}>
                                            <Label className="captalize" htmlFor="r3">{14}k</Label>
                                            <RadioGroupItem value={"14"} id="14karat" className="" />
                                        </Label>
                                        <Label className={cn("flex items-center justify-between w-44 px-6 text-[#A68A7E] border border-[#A68A7E] py-4 rounded-md")}>
                                            <Label className="captalize" htmlFor="r3">{18}k</Label>
                                            <RadioGroupItem value={"18"} id="18karat" className="" />
                                        </Label>
                                            {/* ); */}
                                        {/* })} */}
                                    </RadioGroup>
                                    <div className="flex flex-col relative gap-4">
                                        <p>Quantity :</p>
                                        <NumberInput quantityRef={quantityRef} />
                                        {/* <Input type="number" /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[80%] gap-2 justify-self-center flex-col flex">
                            <div className="flex w-full gap-2">
                                <Button 
                                    className={cn("flex hover:bg-transparent hover:text-[#A68A7E] hover:border-[#A68A7E] hover:border col-span-5 bg-[#A68A7E] flex-1 row-span-1 justify-center items-center gap-2", isCartAddedButtonLoading && `bg-gray-100`)}
                                    onClick={async (e) => {
                                    setIsCartAddedButtonLoading(true);
                                    e.preventDefault();
                                    if( isInCart )
                                    {
                                        await updateCart({ product: productData!, quantity: quantityRef.current, color: colourRef.current, karat: karatRef.current, totalPrice: Math.round(price) }, false, false, currentCart, dispatch, userData?._id ? true : false, currentWishlist, currentVideoCallCart);
                                        setIsCartAddedButtonLoading(false);
                                        setIsInCart(false);
                                        return toast.success("Product deleted from cart successfully!", { className: "font-[quicksand]", icon: <Trash2 className="w-4 h-4 stroke-red-500" /> });
                                    }
                                    await updateCart({ product: productData!, quantity: quantityRef.current, color: colourRef.current, karat: karatRef.current, totalPrice: Math.round(price) }, true, false, currentCart, dispatch, userData?._id ? true : false, currentWishlist, currentVideoCallCart);
                                    setIsCartAddedButtonLoading(false);
                                    setIsInCart(true);
                                    return toast.success("Product added to cart successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> });
                                }}>{isCartAddedButtonLoading ? <Loader2 className="animate-spin"/> : isInCart ? "Remove from cart -" : "Add to cart +"}</Button>
                                <Button className="flex-1 hover:bg-transparent hover:text-[#A68A7E] hover:border-[#A68A7E] hover:border bg-[#A68A7E]" onClick={ async (e) => {
                                    setIsWishListAddedButtonLoading(true);
                                    e.preventDefault();
                                    if( isInWishList )
                                    {
                                        await updateWishList({ product: productData!, color: colourRef.current, karat: karatRef.current }, false, currentWishlist, dispatch, userData?._id ? true : false, currentCart, currentVideoCallCart);
                                        setIsWishListAddedButtonLoading(false);
                                        setIsInWishList(false);
                                        return toast.success("Product deleted from wishlist successfully!", { className: "font-[quicksand]", icon: <Trash2 className="w-4 h-4 stroke-red-500" /> });
                                    }
                                    await updateWishList({ product: productData!, color: colourRef.current, karat: karatRef.current}, true, currentWishlist, dispatch, userData?._id ? true : false, currentCart, currentVideoCallCart);
                                    setIsWishListAddedButtonLoading(false);
                                    setIsInWishList(true);
                                    return toast.success("Product added to wishlist successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> });
                                }}>{isWishListAddedButtonLoading ? <Loader2 className="animate-spin"/> : isInWishList ? <>Remove from wishlist <ListMinus /></> : <>Add to wishlist <ListPlus /></>}</Button>
                            </div>
                            <Button className="border-[#A68A7E] border text-[#A68A7E] bg-white hover:bg-[#A68A7E] hover:text-white" onClick={async (e) => {
                                setIsInVideoCallCartButtonLoading(true);
                                e.preventDefault();
                                if( isInVideoCallCart )
                                {
                                    await updateVideoCallCart({ product: productData!, quantity: quantityRef.current, color: colourRef.current, karat: karatRef.current, totalPrice: Math.round(price) }, false, false, currentCart, dispatch, userData?._id ? true : false, currentWishlist, currentVideoCallCart);
                                    setIsInVideoCallCartButtonLoading(false);
                                    setIsInVideoCallCart(false);
                                    return toast.success("Product deleted from cart successfully!", { className: "font-[quicksand]", icon: <Trash2 className="w-4 h-4 stroke-red-500" /> });
                                }
                                await updateVideoCallCart({ product: productData!, quantity: quantityRef.current, color: colourRef.current, karat: karatRef.current, totalPrice: Math.round(price) }, true, false, currentCart, dispatch, userData?._id ? true : false, currentWishlist, currentVideoCallCart);
                                setIsInVideoCallCartButtonLoading(false);
                                setIsInVideoCallCart(true);
                                return toast.success("Product added to cart successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> });
                            }}>{isInVideoCallCartButtonLoading ? <Loader2 className="animate-spin"/> : isInVideoCallCart ? <>Remove from video call cart <VideoOff /></> : <>Add to video call cart <Video /></>}</Button>
                        </div>
                        {/* <p>Our promises</p> */}
                    </div>
                </div>
                <div></div>
            </div>
        </section>
    );
}

const JewelryCarousel = ({ imageUrl }: { imageUrl: { url: string; publicId: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Sample product images - replace with your actual images
  
  // Thumbnail images - replace with your actual thumbnails
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrl.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imageUrl.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main image container */}
      <div className="border border-[#A68A7E] rounded-lg mb-4 relative aspect-square">
        <img 
          src={imageUrl?.[currentIndex]?.url}
          alt="Gold earrings with diamonds"
          className="w-full h-full object-contain rounded-[inherit]"
        />
      </div>
      
      {/* Thumbnails column - positioned to the right */}
      <div className="absolute right-4 top-1/4 flex flex-col space-y-2">
        {imageUrl?.map((thumb, index) => (
          <div 
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-16 border border-[#A68A7E] rounded-lg p-2 cursor-pointer flex items-center justify-center ${currentIndex === index ? 'ring-2 ring-[#A68A7E]' : ''}`}
          >
            <img 
              src={thumb?.url}
              alt={`Product view ${index + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation arrows - centered at bottom */}
      <div className="flex justify-center space-x-4 text-gray-400">
        <button 
          onClick={goToPrevious}
          className="hover:text-gray-600 focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={goToNext}
          className="hover:text-gray-600 focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const NumberInput = ({ quantityRef } : { quantityRef: MutableRefObject<number>}) => {

    const [ quantity, setQuantity ] = useState(1);

    return <div className="flex gap-2 h-full">
    <Input id="quantity-input" className="w-8 relative" type="number" defaultValue={1} value={quantity} min={1}/>
    <div className="flex flex-col max-h-full w-fit">
        {/* <Button className="p-0" variant={"ghost"}> */}
            <Triangle onClick={(e) => {
                e.preventDefault();
                setQuantity(quantity + 1); 
                quantityRef.current = quantity;        
                console.log(quantity, quantityRef.current)
            }} className="fill-[#A68A7E] w-3 flex-1/2 stroke-[#A68A7E]" />
        {/* </Button> */}
            <Triangle className="fill-[#A68A7E] w-3 rotate-180 stroke-[#A68A7E] flex-1/2" onClick={(e) => {
                e.preventDefault();
                setQuantity(quantity <= 1 ? quantity : quantity - 1);
                quantityRef.current = quantity;        
                console.log(quantity, quantityRef.current)
            }}/>
    </div>
</div>
}
import { ICartItem, IUser } from "@/utils/interfaces";
import { UIsideBar } from "./Solitare";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { clearCart, updateCart } from "@/utils/utilityFunctions";
import { Loader2, Minus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";


export const CartPage = () => {

    const navigate = useNavigate();

    const [ isPlaceOrderButtonLoading, setIsPlaceOrderButtonLoading ] = useState(false);

    const [ cartItems, setCartItems ] = useState<ICartItem[]>();
    const customerData: IUser = useSelector((state: any) => state.website.customerData);
    
    const [ totalPrice, setTotalPrice ] = useState(0);
    
    useEffect(() => {
        setCartItems(customerData?.cart);
        const cartTotal = cartItems?.reduce((total, item) => {
            return total + (item?.totalPrice * item?.quantity);
        }, 0);
        console.log(`Cart Total : ${cartTotal}`);
        console.log(cartItems);
        setTotalPrice(cartTotal!);
        console.log(totalPrice)
        // const cartTotal = cartItems?.reduce((total, item) => {
        //     return total + item?.totalPrice;
        // }, 0);
        const GST = (Math.round(cartTotal!) * (3 / 100));
        setCartFinalPrice(Math.round(cartTotal!)! + GST);
        console.log(GST, cartFinalPrice);
        setTotalPrice(Math.round(cartTotal!)!);
    }, [ customerData ]);


    const [ cartFinalPrice, setCartFinalPrice ]= useState(0);


    // const [ isOrderPlacing, setIsOrderPlacing ] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay script loaded");
        document.body.appendChild(script);
    }, []);

    const copuonRef = useRef(null);
    const voucherOrGiftCardRef = useRef(null);

    return (
        <div className='w-full playfair-display! relative pb-14'>
            <UIsideBar side="left"/>
            <UIsideBar side="right"/>
            <div id='solitare-main' className="sm:bg-[#E1C6B3] opacity-0 sm:mt-56 gap-4 flex flex-col items-center sm:w-[80%] w-full justify-self-center rounded-tr-[100px]  overflow-y-scroll no-scrollbar h-screen">
                <div className="w-full mt-14 text-center  flex flex-col gap-8 h-full text-white ">
                    <p className="inria-serif-regular text-6xl">
                        Cart                    
                    </p>
                    <div className="w-[90%] max-h-full gap-4 h-full mx-[5%] pb-8 flex sm:flex-row flex-col">
                        <div className="flex-[0.6]  flex gap-4 overflow-y-scroll no-scrollbar flex-col">
                            {cartItems?.map((cartItem: ICartItem) => <CartItem customerData={customerData} dispatch={dispatch} cartItem={cartItem} cartItems={cartItems} />)}
                        </div>
                        <div className="text inria-serif-regular text-[#A68A7E] flex flex-col border-2 bg-white border-[#BFA6A1] rounded-md h-full flex-[0.4]">
                            <p className="p-4 flex justify-start text-xl">Order summary</p>
                            <div className="flex justify-between p-4 flex-1 ">
                                <p>Total items : {cartItems?.reduce((total, item) => {
                                    return total + item?.quantity;
                                }, 0)}</p>
                                <p>Price : {Math.round(totalPrice)}</p>
                            </div>
                            <div className="w-[90%] mb-4 flex justify-between justify-self-center self-center bg-blue-600">
                                <p>+ 3% GST</p>
                                <p>{(Math.round((totalPrice!) * (3 / 100)))}</p>
                            </div>
                            <div className="w-[90%] mb-4 self-center flex justify-between bg-blue-600">
                                <p>Cart total</p>
                                <p>{Math.round(cartFinalPrice)}</p>
                            </div>
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <div className="relative w-[80%]">
                                    <Input ref={copuonRef} className="justify-self-center w-full border border-dashed" placeholder="Enter coupon code" />
                                    <Button onClick={ async (e) => {
                                        e.preventDefault();
                                        // @ts-ignore
                                        const code = copuonRef?.current?.value!;
                                        if ( code ) {
                                            try {
                                                // @ts-ignore
                                                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}coupons/verify-coupon`, {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    credentials: "include",
                                                    body: JSON.stringify({
                                                        code: code
                                                    }),
                                                });
                                                // console.log(response);
                                    
                                                if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
                                                
                                                const data = await response.json();
                                                console.log(data.data);

                                                // setProductData(data.data)
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }
                                    
                                        }
                                    } className="border absolute border-dashed top-0 right-0" variant={"ghost"}>Apply</Button>
                                </div>
                                <div className="relative w-[80%]">
                                    <Input ref={voucherOrGiftCardRef} className="justify-self-center w-full border border-dashed" placeholder="Enter Voucher code/Giftcard code" />
                                    <Button className="border absolute border-dashed top-0 right-0" onClick={(e) => {
                                        e.preventDefault();
                                        
                                    }} variant={"ghost"}>Apply</Button>
                                </div>
                                <Button disabled={cartItems?.length! <= 0 || isPlaceOrderButtonLoading} className="text-white bg-[#E1C6B3] w-[80%] self-center my-4 hover:bg-[#A68A7E] hover:text-white" onClick={ async (e) => {
                                    e.preventDefault();
                                    console.log(totalPrice);
                                    setIsPlaceOrderButtonLoading(true);
                                    try {
                                        // @ts-ignore
                                        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}payment/create-an-order/`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({ options: {
                                                amount: (Math.round(cartFinalPrice) * 100),
                                                currency: "INR",
                                            }}),
                                            credentials: "include"
                                        });
                                        // console.log(response);
                            
                                        if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
                                        
                                        const data = await response.json();
                                        // console.log(data, window.Razorpay);

                                        var options = {
                                            "key_id": import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                                            // "key_id": "rzp_test_2KRjU8skvbLEYt", // Enter the Key ID generated from the Dashboard
                                            "amount": (Math.round(cartItems?.reduce((total, item) => {
                                                return total + item?.totalPrice * item?.quantity;
                                            }, 0)!) * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                                            "currency": "INR",
                                            "name": "Kultivated karats", //your business name
                                            "description": "Test Transaction",
                                            "image": "https://example.com/your_logo",
                                            "order_id": data?.data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                                            "handler": async function (res : any){
                                                try {
                                                    console.log(res);
                                                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}payment/order/validate`, {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({ 
                                                            razorpay_order_id: res.razorpay_order_id,
                                                            razorpay_payment_id: res.razorpay_payment_id, 
                                                            razorpay_signature: res.razorpay_signature,
                                                        }),
                                                        credentials: "include"
                                                    });
                                                    // console.log(response);
                                                    
                                                    if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
                                                    
                                                    console.log(res);

                                                    const data = await response.json();
                                                    console.log(data, response);

                                                    console.log(response);
                                                    const orderResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}orders/create-an-order`, {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({ 
                                                            order: {
                                                                orderId: Math.random() * 1000000 + 1,
                                                                customerId: customerData?._id,
                                                                total: totalPrice || 0,
                                                                deliveryAddress: customerData?.address,
                                                                orderStatus: "Pending",
                                                                cart: customerData?.cart,
                                                            }
                                                        }),
                                                        credentials: "include"
                                                    });
                                                    // console.log(response);
                                                    
                                                    if (!orderResponse.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
                                                    
                                                    console.log(orderResponse);
                                                    
                                                    const orderData = await orderResponse.json();
                                                    console.log(orderData, orderResponse);
                                                    
                                                    await clearCart(dispatch, customerData?._id ? true : false);
                                                    navigate("/payment-success");
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            },
                                            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                                                "name": `${customerData?.firstName} ${customerData?.lastName}`, //your customer's name
                                                "email": `${customerData?.email}`, 
                                                "contact": `${customerData?.phoneNumber || "0000000000"}`  //Provide the customer's phone number for better conversion rates 
                                            },
                                            // "notes": {
                                            //     "address": "Razorpay Corporate Office"
                                            // },
                                            "theme": {
                                                "color": "#BFA6A1"
                                            }
                                        };
                                        // var rzp1 = new Razorpay(options);
                                        const rzp = new (window as any).Razorpay(options);
                                        rzp.open();
                                        rzp.on("payment.failed", function (response: any) {
                                            console.log("payment failed")
                                            console.log(response)
                                        });
                                        // rzp.on("payment.success", async function (response: any) {

                                        // });

                                        e.preventDefault();
                                    } catch (error) {
                                        console.log(error);
                                    } finally {
                                        setIsPlaceOrderButtonLoading(false);
                                    }
                                }}>{isPlaceOrderButtonLoading ? <Loader2 className="animate-spin"/> : "Place order"}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartItem = ({ cartItem, cartItems, dispatch, customerData } : { cartItem: ICartItem, cartItems: ICartItem[], dispatch: Dispatch, customerData: IUser }) => {

    const [ isRemoveItemLoadingButton, setIsRemoveItemLoadingButton ] = useState(false);

    return (    
        <div className="w-full relative flex gap-4">
            <img src={cartItem?.product?.imageUrl[0]?.url} className="sm:h-32 h-20 border-2 border-[#BFA6A1] aspect-square sm:aspect-video object-cover rounded-md" alt="" />
            <div className=" flex-1 bg-white border-2 border-[#BFA6A1] px-8 flex rounded-md text-[#A68A7E] inria-serif-regular">
                <div className="flex-1 flex flex-col justify-around items-start">
                    <p>Name: {cartItem?.product?.name}</p>
                    <p>code: {cartItem?.product?.code}</p>
                </div>
                <div className="flex-1 flex flex-col justify-around items-end">
                    <p>Price for 1: {Math.round(cartItem?.totalPrice)}</p>
                    <p>Quantity: {cartItem?.quantity}</p>
                </div>
                <Button disabled={isRemoveItemLoadingButton} variant={"ghost"} className="rounded-full py-3 px-1 w-0 h-0 ml-4 mt-4 bg-white text-[#A68A7E] border border-[#A68A7E] hover:text-white hover:bg-gray-800/20" onClick={async (e) => {
                    e.preventDefault();
                    setIsRemoveItemLoadingButton(true);
                    await updateCart({ product: cartItem.product!, quantity: 1, color: "white", karat: 14, totalPrice: 0 }, false, false, cartItems, dispatch, customerData?._id ? true : false, customerData?.wishList, customerData?.videoCallCart);
                    setIsRemoveItemLoadingButton(false);
                    // setIsInVideoCallCart(false);
                    return toast.success("Product deleted from cart successfully!", { className: "font-[quicksand]", icon: <Trash2 className="w-4 h-4 stroke-red-500" /> });            
                }}><Minus className="w-2 h-2" /></Button>
            </div>
        </div>
    );
}
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { ICartItem, IProduct, IWishListItem } from "./interfaces";
import { setCustomerData } from "../redux/slices/websiteSlice";

export const updateWishList = async ( wishListItem: IWishListItem, isAdd: boolean, currentWishlist: IWishListItem[], dispatch: Dispatch<UnknownAction>, isUserPresent: boolean, cart?: ICartItem[], videoCallCart?: ICartItem[] ) => {
    
    // const dispatch = useDispatch();
    // const currentWishlist = useSelector((state:any) => state?.website?.customerData?.wishList);
    let newWishList = [ ...currentWishlist, wishListItem ];
    
    if ( !isAdd ) {
        newWishList = currentWishlist?.filter((item: IWishListItem) => item?.product?._id !== wishListItem?.product?._id);
    } 

    if ( !isUserPresent ) {
        console.log(newWishList);
        localStorage.setItem("wishList", JSON.stringify(newWishList));
        dispatch(setCustomerData({cart : cart, wishList: newWishList}));
        return true;
    }

    try {
        // @ts-ignore
        const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/update-user-wishlist`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ updatedWishList: newWishList }),
            credentials: "include"
        });
        console.log(response);

        if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
        
        const data = await response.json();

        // if (data.data.role !== "Customer") throw new Error(`Error: ${401}, Unauthorised user`);
        dispatch(setCustomerData(data.data));
        return true;
    } catch (error) {
        console.error("Error: ", error);
        // console.log(userData);
        return false;
    }
};

export const updateCart = async ( cartItem: ICartItem, isAdd: boolean, sameItem: boolean,  currentCart: ICartItem[], dispatch: Dispatch<UnknownAction>, isUserPresent: boolean, wishList?: IWishListItem[], videoCallCart?: ICartItem[] ) => {

    let newCart;

    if ( isAdd )
        if ( sameItem ) 
            newCart = [ currentCart.map((item: ICartItem) => item?.product?._id == cartItem?.product?._id ? { product: item.product, quantity: item.quantity + 1 } : item) ];
        else 
            newCart = [ ...currentCart, cartItem ];
    else
        if ( sameItem ) 
            newCart = [ currentCart.map((item: ICartItem) => item?.product?._id == cartItem?.product?._id ? { product: item.product, quantity: item.quantity - 1 } : item) ];
        else 
            newCart = currentCart?.filter((item: ICartItem) => item?.product?._id !== cartItem?.product?._id);
        
    if ( !isUserPresent ) {
        console.log(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        dispatch(setCustomerData({cart : newCart, wishList: wishList, videoCallCart: videoCallCart}));
        return true;
    }

    try {
        // @ts-ignore
        const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/update-user-cart`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ updatedCart: newCart }),
            credentials: "include"
        });
        console.log(response);

        if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
        
        const data = await response.json();

        // if (data.data.role !== "Customer") throw new Error(`Error: ${401}, Unauthorised user`);
        dispatch(setCustomerData(data.data));
        return true;
    } catch (error) {
        console.error("Error: ", error);
        // console.log(userData);
        return false;
    }
};

export const updateVideoCallCart = async ( cartItem: ICartItem, isAdd: boolean, sameItem: boolean,  currentCart: ICartItem[], dispatch: Dispatch<UnknownAction>, isUserPresent: boolean, videoCallCart: ICartItem[], wishList?: IWishListItem[],  ) => {

    let newCart;

    if ( isAdd )
        if ( sameItem ) 
            newCart = [ videoCallCart.map((item: ICartItem) => item?.product?._id == cartItem?.product?._id ? { product: item.product, quantity: item.quantity + 1 } : item) ];
        else 
            newCart = [ ...videoCallCart, cartItem ];
    else
        if ( sameItem ) 
            newCart = [ videoCallCart.map((item: ICartItem) => item?.product?._id == cartItem?.product?._id ? { product: item.product, quantity: item.quantity - 1 } : item) ];
        else 
            newCart = videoCallCart?.filter((item: ICartItem) => item?.product?._id !== cartItem?.product?._id);
        
    if ( !isUserPresent ) {
        console.log(newCart);
        localStorage.setItem("videoCallCart", JSON.stringify(newCart));
        dispatch(setCustomerData({cart : currentCart, wishList: wishList, videoCallCart: newCart}));
        return true;
    }

    // console.log(updateCart);

    try {
        // @ts-ignore
        const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/update-user-video-call-cart`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ updatedCart: newCart }),
            credentials: "include"
        });
        console.log(response);

        if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
        
        const data = await response.json();

        // if (data.data.role !== "Customer") throw new Error(`Error: ${401}, Unauthorised user`);
        dispatch(setCustomerData(data.data));
        return true;
    } catch (error) {
        console.error("Error: ", error);
        // console.log(userData);
        return false;
    }
};

export const clearCart = async ( dispatch: Dispatch<UnknownAction>, isUserPresent: boolean) => {

    let newCart;

    if ( !isUserPresent ) {
        console.log(newCart);
        localStorage.setItem("videoCallCart", JSON.stringify([]));
        dispatch(setCustomerData({cart : []}));
        return true;
    }

    // console.log(updateCart);

    try {
        // @ts-ignore
        const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/update-user-video-call-cart`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ updatedCart: [] }),
            credentials: "include"
        });
        console.log(response);

        if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
        
        const data = await response.json();

        // if (data.data.role !== "Customer") throw new Error(`Error: ${401}, Unauthorised user`);
        dispatch(setCustomerData(data.data));
        return true;
    } catch (error) {
        console.error("Error: ", error);
        // console.log(userData);
        return false;
    }
};
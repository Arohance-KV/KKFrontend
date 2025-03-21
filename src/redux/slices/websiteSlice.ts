import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: [],
    categories: [],
    collections: [],
    reels: [],
    testimonials: [],
    blogs: [],
    customerData: {
        id: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        phoneNumberVerified: null,
        email: null,
        emailVerified: null,
        wishList: [],
        address: null,
        cart: [],
        orders: [],
        totalOrderAmount: null,
        luckyPoints: null,
    },
    heroBanners: [],
};

export const websiteSlice = createSlice({
    name: "website",
    initialState,
    reducers: {
        setProductData: (state, action) => {
            console.log("inside setProductData()");
            console.log(action.payload);
            state.productData = action.payload;
        },
        setCollections: (state, action) => {
            console.log("inside setCollections()");
            console.log(action.payload);
            state.collections = action.payload;
        },
        setCategories: (state, action) => {
            console.log("inside setCategoies()");
            console.log(action.payload);
            state.categories = action.payload;
        },
        // setPartnerBanners: (state, action) => {
        //     console.log("inside setBanners()");
        //     console.log(action.payload);
        //     state.partnerBanners = action.payload;
        // },
        setHeroBanners: (state, action) => {
            console.log("inside setHeroBanners()");
            console.log(action.payload);
            state.heroBanners = action.payload;
        },
        // setTopProducts: (state, action) => {
        //     console.log("inside setTopProducts()");
        //     console.log(action.payload);
        //     state.topProducts = action.payload;
        // },
        setCustomerData: (state, action) => {
            console.log("inside setCustomerData()");
            console.log(action.payload);
            state.customerData = action.payload;
        },
        resetCustomerData: (state) => {
            state.customerData = {
                id: null,
                firstName: null,
                lastName: null,
                phoneNumber: null,
                phoneNumberVerified: null,
                email: null,
                emailVerified: null,
                wishList: [],
                address: null,
                cart: [],
                orders: [],
                totalOrderAmount: null,
                luckyPoints: null,
            };
        }
    },
});

export const { setProductData, setCategories, setCustomerData, setHeroBanners, resetCustomerData, setCollections } = websiteSlice.actions;

export default websiteSlice.reducer;
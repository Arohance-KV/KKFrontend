import './index.css';
import { HomePageNavBar } from './components/site/home-page/HomePageNavBar';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/site/Footer';
// import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react';
import { setCategories, setCollections, setCustomerData, setProductData } from './redux/slices/websiteSlice';
import { useDispatch } from 'react-redux';
// import { useDispatch } from "react-redux";
import AnimatedCursor from "react-animated-cursor";

function App() {

  // const lenis = useLenis(({ scroll }) => {
    // called every scroll
  // });

  const dispatch = useDispatch();

  useEffect(() => {
    (async function verify() {
      try {
          // @ts-ignore
          const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/current-user`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
              credentials: "include"
          });
          console.log(response);

          if (!response.ok) {
            if ( response.statusText == "Unauthorized" || response.status == 401 ) {
              // console.log(await createGuestUser());
            }
            throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
          }
          const data = await response.json();

          console.log(data);

          // if (data.data.role !== "Customer") throw new Error(`Error: ${401}, Unauthorised user`);
          dispatch(setCustomerData(data.data));
      } catch (error) {
          console.error("Error: ", error);
          // console.log(userData);
          if(!(localStorage.getItem("cart")))
            localStorage.setItem("cart", JSON.stringify([]));
          if(!(localStorage.getItem("wishList")))
            localStorage.setItem("wishList", JSON.stringify([]));
      }
    })();
    (async function () {
      try {
        
      } catch (error) {
        
      }
    })();
    (async function() {
        try {
            // @ts-ignore
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}products/get-all-products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            // console.log(response);

            if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
            
            const data = await response.json();
            dispatch(setProductData(data.data));
            console.log(data.data);
            
        } catch (error) {
            console.log(error);
        }
    })();
    (async function () {
        try {
            // @ts-ignore
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}categories/get-all-categories`);
        
            const data = await response.json();
        
            if ( !response.ok )
              throw new Error("Error : "+ response);
        
            console.log(data.data);
            // toast.success("Categories fetched successfully!", { className: "font-[quicksand]", icon: <ToastSuccess />})
            dispatch(setCategories(data.data));

          } catch (error) {
            console.log(error);
            // toast.error("Failed to fetch categories!", { className: "font-[quicksand]", icon: <ToastWarning /> });
          }
    })();
    (async function () {
        try {
            // @ts-ignore
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}collections/get-all-collections`);
        
            const data = await response.json();
        
            if ( !response.ok )
              throw new Error("Error : "+ response);
        
            console.log(data.data);
            // toast.success("Categories fetched successfully!", { className: "font-[quicksand]", icon: <ToastSuccess />})
            dispatch(setCollections(data.data));

          } catch (error) {
            console.log(error);
            // toast.error("Failed to fetch categories!", { className: "font-[quicksand]", icon: <ToastWarning /> });
          }
    })();
    // console.log(`state: ${useSelector((state: any) => state)}`);
    (async function () {
        try {
            // @ts-ignore
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}banners/get-all-banners-from-a-type/partner-banner`);
        
            const data = await response.json();
        
            if ( !response.ok )
              throw new Error("Error : "+ response);

            // dispatch(setPartnerBanners(data.data));
            console.log(data.data);
            // toast.success("Categories fetched successfully!", { className: "font-[quicksand]", icon: <ToastSuccess />})
          } catch (error) {
            console.log(error);
            // toast.error("Failed to fetch categories!", { className: "font-[quicksand]", icon: <ToastWarning /> });
          }
    })();
    (async function () {
        try {
            // @ts-ignore
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}banners/get-all-banners-from-a-type/hero-section-banner`);
        
            const data = await response.json();
        
            if ( !response.ok )
              throw new Error("Error : "+ response);

            console.log(data.data);
            // dispatch(setHeroBanners(data.data));
            // toast.success("Categories fetched successfully!", { className: "font-[quicksand]", icon: <ToastSuccess />})
          } catch (error) {
            console.log(error);
            // toast.error("Failed to fetch categories!", { className: "font-[quicksand]", icon: <ToastWarning /> });
          }
    })();
  }, []);

  return (
    <div className=''>
      {/* <ReactLenis root> */}
        <HomePageNavBar />
          <Outlet />
          <AnimatedCursor
      innerSize={8}
      outerSize={8}
      // color='#E1C6B3'
      // color='225, 198, 179'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]}
    />
        <Footer />
      {/* </ReactLenis> */}
    </div>
  );
}

export default App;
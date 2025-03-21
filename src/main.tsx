import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HomePage } from './components/site/home-page/HomePage.tsx';
import { About } from './components/site/home-page/About.tsx';
import { Solitare } from './components/site/home-page/Solitare.tsx';
import { GiftCards } from './components/site/home-page/GiftCards.tsx';
import { StoreLocator } from './components/site/home-page/StoreLocator.tsx';
import { Provider } from "react-redux";
import { Collections } from './components/site/home-page/Collections.tsx';
import Test from "./components/site/home-page/Text.tsx";
import { DashboardMain } from './components/adminPanel/DashboardMain.tsx';
import { DashboardHomePage } from './components/adminPanel/DashboardHomePage.tsx';
import { VideoCartPage } from './components/site/home-page/VideoCartPage.tsx';
import { VideoCallBookingPage } from './components/site/home-page/VideoCallBookingPage.tsx';
import { Auth } from './components/site/Auth.tsx';
import { store } from './redux/store.ts';
import { ProductPage } from './components/site/product-page/ProductPage.tsx';
import { WishListPage } from './components/site/home-page/WishlistPage.tsx';
import { CartPage } from './components/site/home-page/CartPage.tsx';
import { AccountSettings } from './components/site/home-page/AccountSettings.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/">
          {/* <Route path="admin" element={<DashboardMain />}> */}
            <Route path="admin" element={<DashboardMain />}>
                <Route path="dashboard" element={<DashboardHomePage />} />
            {/* </Route> */}
          </Route>
          <Route path="" element={<App />}>
              <Route path='auth' element={<Auth />} />
              <Route path="" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/solitare" element={<Solitare />} />
              <Route path="/store-locator" element={<StoreLocator />} />
              <Route path="/giftcards" element={<GiftCards />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/test" element={<Test />} />
              <Route path="/video-cart" element={<VideoCartPage />} />
              <Route path="/store-locator" element={<StoreLocator />} />
              <Route path="/wishlist" element={<WishListPage />} />
              <Route path="/video-cart/book" element={<VideoCallBookingPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/account-details/" element={<AccountSettings />} />
          </Route>
      </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
          {/* <AnimatedCursor /> */}
      </Provider>
  </StrictMode>
);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
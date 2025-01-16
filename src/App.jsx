// src/App.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import CarListing from "./page/CarListing";
import CarDetail from "./page/CarDetails";
import AdminLayout from "./components/AdminLayout";
import Profile from "./page/Profile";
import AboutUs from "./page/AboutUs";
import ContactUs from "./page/ContactUs";
import AdminProfile from "./page/admin/AdminProfile";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "car-list",
    element: <CarListing />,
  },
  {
    path: "car-detail/:id",
    element: <CarDetail />,
  },
  {
    path: "admin",
    element: <AdminLayout />,
  },
  {
    path: "profile/:id",
    element: <Profile/>,
  },
  {
    path: "about-us",
    element: <AboutUs/>
  },
  {
    path: "contact-us",
    element: <ContactUs/>
  },
  {
    path: "admin/profile/:id",
    element: <AdminProfile/>,
  },
  // {
  //   path: "admin/cars",
  //   element: <CarList/>,
  // },
  // {
  //   path: "admin/bid",
  //   element: <Bid/>,
  // },
  // {
  //   path: "admin/transactions",
  //   element: <Transaction/>,
  // },
  // {
  //   path: "admin/users",
  //   element: <Users/>,
  // }
  {
    path: "*",
    element: <div>Page not found</div>,
  }
]);

const queryClient = new QueryClient();

function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

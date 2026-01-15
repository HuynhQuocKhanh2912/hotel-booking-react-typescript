import LoadingPage from "@/pages/_Component/LoadingPage";
import RoomListingApp from "@/pages/HomeTemplate/RoomsLocation";
import { lazy, Suspense, type FC, type LazyExoticComponent } from "react";
import { type RouteObject } from "react-router-dom";

const HomeTemplate = lazy(() => import("@/pages/HomeTemplate"));
const AuthTemplate = lazy(() => import("@/pages/AuthTemplate"));
const LoginPage = lazy(() => import("@/pages/AuthTemplate/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/AuthTemplate/RegisterPage"));

const AdminLayout = lazy(() => import("@/pages/AdminTemplate/"));
const DashboardPage = lazy(() => import("@/pages/AdminTemplate/DashboardPage"));
const ListRoom = lazy(() => import("@/pages/HomeTemplate/ListRoom"));
const HomePage = lazy(() => import("@/pages/HomeTemplate/HomePage"));
const AboutPage = lazy(() => import("@/pages/HomeTemplate/About"));
const ContactPage = lazy(() => import("@/pages/HomeTemplate/Contact"));
const DetailRoom = lazy(() => import("@/pages/HomeTemplate/DetailRoom"));
const LocationPage = lazy(() => import("@/pages/HomeTemplate/Location"));
// const RoomsLocation = lazy(() => import("@/pages/HomeTemplate/RoomsLocation"));
// const SalePage = lazy(() => import("@/pages/HomeTemplate/Sale"));
const UsersManagement = lazy(
  () => import("@/pages/AdminTemplate/UsersManagement")
);
const LocationsManagement = lazy(
  () => import("@/pages/AdminTemplate/LocationsManagement")
);
const RoomsManagement = lazy(
  () => import("@/pages/AdminTemplate/RoomsManagement")
);
const CommentsManagement = lazy(
  () => import("@/pages/AdminTemplate/CommentsManagement")
);
const BookingsManagement = lazy(
  () => import("@/pages/AdminTemplate/BookingsManagement")
);

const withSuspense = (Component: LazyExoticComponent<FC>) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Component />
    </Suspense>
  );
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: withSuspense(HomeTemplate),
    children: [
      {
        path: "",
        element: withSuspense(HomePage),
      },
      {
        path: "/about",
        element: withSuspense(AboutPage),
      },
      {
        path: "/contact",
        element: withSuspense(ContactPage),
      },
      {
        path: "/list-room",
        element: withSuspense(ListRoom),
      },
      {
        path: "/detail-room/:id",
        element: withSuspense(DetailRoom),
      },
      {
        path: "/location",
        element: withSuspense(LocationPage),
      },
      {
        path: "/rooms-location/",
        element: withSuspense(RoomListingApp),
      },
      // {
      //   path: "/sale",
      //   element: withSuspense(SalePage),
      // },
    ],
  },
  {
    path: "/dashboard",
    element: withSuspense(AdminLayout),
    children: [
      { path: "", element: withSuspense(DashboardPage) },
      { path: "user-management", element: withSuspense(UsersManagement) },
      {
        path: "location-management",
        element: withSuspense(LocationsManagement),
      },
      { path: "room-management", element: withSuspense(RoomsManagement) },
      { path: "comment-management", element: withSuspense(CommentsManagement) },
      { path: "booking-management", element: withSuspense(BookingsManagement) },
    ],
  },
  {
    path: "/auth",
    element: withSuspense(AuthTemplate),
    children: [
      { path: "login", element: withSuspense(LoginPage) },
      { path: "register", element: withSuspense(RegisterPage) },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
];

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Stuff from "./pages/Stuff/Index";
import StuffCreate from "./pages/Stuff/Create";
import StuffEdit from "./pages/Stuff/Edit";
import Dashboard from "./pages/Dashboard";
import TrashStuff from "./pages/TrashStuff";
import Inbound from "./pages/Inbound/Index";
import InboundCreate from "./pages/Inbound/Create";
import InboundShow from "./pages/Inbound/Show";
import Lending from "./pages/Lending/Index";
import LendingEdit from "./pages/Lending/Edit";
import User from "./pages/User/Index";
import UserShow from "./pages/User/Show";
import UserEdit from "./pages/User/Edit";
import UserCreate from "./pages/User/Create";
import TrashInbound from "./pages/TrashInbound";
import TrashUser from "./pages/TrashUser";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/profile", element: <Profile /> },
  // { path: '/stuff', element: <Stuff /> },
  { path: "/stuff/create", element: <StuffCreate /> },
  { path: "/stuff/edit/:id", element: <StuffEdit /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/stuff", element: <Stuff /> },
  { path: "/stuff/trash", element: <TrashStuff /> },
  { path: "/inbound", element: <Inbound /> },
  { path: "/inbound/create", element: <InboundCreate /> },
  { path: "/inbound/:id/show", element: <InboundShow /> },
  { path: "/lending", element: <Lending /> },
  { path: "lending/:id/edit", element: <LendingEdit /> },
  { path: "user", element: <User /> },
  { path: "user/:id/edit", element: <UserEdit /> },
  { path: "user/create", element: <UserCreate /> },
  { path: "user/:id/show", element: <UserShow /> },
  { path: "/inbound/trash", element: <TrashInbound /> },
  { path: "/user/trash", element: <TrashUser /> },
]);

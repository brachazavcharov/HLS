/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import ChatScreen from 'views/Chat/ChatScreen';
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import WelcomeScreen from "views/Chat/WelcomeScreen";
import LogOut from 'views/Login/LogOut'
import Guide from 'views/Guide/Guide'
import Competition from "views/Icons/competition";

const dashboardRoutes = [
  {
    path: "/chat",
    name: "",
    rtlName:"",
    icon: "",
    component: ChatScreen,
    layout: "/admin",
    auth:"ab"
  },
  {
    path: "/dashboard",
    name: "בית",
    rtlName: "لوحة القيادة",
    icon: HomeSharpIcon,
    component: DashboardPage,
    layout: "/admin",
    auth:"abc"
  },
  {
    path: "/welcome",
    // path: "/welcome/:email/:room",
    name: "צאט",
    rtlName: "لوحة القيادة",
    icon: WhatsAppIcon,
    component: WelcomeScreen,
    layout: "/admin",
    auth:"ab"
  },
  {
    path: "/user",
    name: "פרופיל",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    auth:"b"
  },
  {
    path: "/table",
    name: "מוצרים",
    rtlName: "قائمة الجدول",
    icon: AddShoppingCartSharpIcon,
    component: TableList,
    layout: "/admin",
    auth:"abc"
  },
  {
    path: "/typography",
    name: "הזמנות",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
    auth:"b"
  },
  {
    path: "/icons",
    name: "תחרויות",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Competition,
    layout: "/admin",
    auth:"ab"
  },
  {
    path: "/orders",
    name: "פרטי לקוחות",
    rtlName: "الرموز",
    icon: LibraryBooks,
    component: Guide,
    layout: "/admin",
    auth:"a"
  },
  // {
  //   path: "/logOut",
  //   name: "יציאה מהחשבון",
  //   rtlName: "الرموز",
  //   icon: Person,
  //   component: LogOut,
  //   layout: "/admin",
  //   auth:"b"
  // }
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin",
  // }

];

export default dashboardRoutes;
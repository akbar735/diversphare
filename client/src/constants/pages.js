import RoofingIcon from "@mui/icons-material/Roofing";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export const allPages = {
  HOME: "/",
  LOGIN: "/login",
};

export const pageList = [
  {
    label: "HOME",
    url: allPages.HOME,
    icon: <RoofingIcon />,
  },
  {
    label: "LOGIN",
    url: allPages.LOGIN,
    icon: <LockOpenIcon />,
  },
];

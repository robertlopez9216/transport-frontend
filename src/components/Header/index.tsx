import React, { useState, MouseEvent } from "react";
import {
  Button,
  IconButton,
  Box,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Profile from "../common/Profile";
import NotificationPopup from "../common/Popover";
import { ReactComponent as SearchIcon } from "./icons/search-icon.svg";
import { ReactComponent as BellIcon } from "./icons/bell-icon.svg";
import { ReactComponent as BellActiveIcon } from "./icons/bell-active-icon.svg";
import {
  HeaderContainer,
  Notifications,
  SingleNotification,
} from "./Header.styled";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { MobileMenu } from "../common/MobileMenu";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import logo2 from "./prevezi2.png";
import { useAppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/slices/user-slice";
import AddIcon from '@mui/icons-material/Add';
import { read } from "fs";

const navigation = [
  {
    name: "Home",
    mobileName: "Sve Objave",
    url: "/",
  },
  {
    name: "Vozila",
    url: "/vozila",
    role: "TRADING",
  },
  {
    name: "Vozači",
    url: "/vozaci",
    role: "TRADING",
  },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const notifications = useSelector(
    (store: RootState) => store?.user?.notifications
  );
  const userRole = useSelector(
    (state: RootState) => state?.user?.user?.companyRoles[0]
  );
  const userCompanyRole = useSelector((state: RootState) => state?.user?.user?.companyRoles);
  const userRoleMobile = useSelector((state: RootState) => state?.user?.user?.role)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setBellClick(!bellClick);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const [bellClick, setBellClick] = useState(false);
  const matches = useMediaQuery("(max-width:767px)");
  const mobileMenuHandler = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Box>
      {matches ? (
        <HeaderContainer
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "none",
            alignItems: "center",
            width: "100%",
            padding: 0,
            pt: "15px",
            pb: "15px",
            pr: "10px",
            pl: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "65%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
              <img src={logo2} alt="logo2" />
            </Box>
            <Box
              sx={{
                alignItems: "center",
                width: "20%",
                display: "flex",
                justifyItems: "space-between",
              }}
            >
              <IconButton aria-describedby={id} onClick={handleClick}>
              {notifications?.content?.every((el: { read: boolean; }) => el.read) ? <BellIcon /> : <BellActiveIcon /> }
              </IconButton>
              <NotificationPopup id={id} open={open} anchorEl={anchorEl}>
                <Box
                  sx={{
                    padding: { xs: "5px 20px 5px 20px" },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "700", fontSize: "18px", color: "#222" }}
                  >
                    Notifikacije
                  </Typography>
                  <Button
                    variant={"text"}
                    onClick={() => navigate("/notifikacije")}
                  >
                    Pregledaj sve
                  </Button>
                </Box>
                <Notifications>
                  {notifications?.content?.length > 0 ? (
                    notifications?.content?.map(
                      (notification: any, index: number) => (
                        <Box key={index + 1} sx={{ width: "100%" }}>
                          <SingleNotification active={!notification?.read}>
                            <Typography>{notification.text}</Typography>
                            <Typography>
                              {`pre ${moment(notification.timestamp).fromNow(
                                true
                              )}`}
                            </Typography>
                          </SingleNotification>
                          <Divider />
                        </Box>
                      )
                    )
                  ) : (
                    <Typography sx={{ fontWeight: "700", color: "#222" }}>
                      Nema novih notifikacija
                    </Typography>
                  )}
                </Notifications>
              </NotificationPopup>

              {bellClick ? (
                <IconButton onClick={handleClick}>
                  <ClearIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton onClick={() => mobileMenuHandler()}>
                    <MenuIcon />
                  </IconButton>
                  <MobileMenu
                    open={openMenu}
                    setOpen={() => mobileMenuHandler()}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        mb: "15px",
                      }}
                      onClick={() => navigate("/")}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <StickyNote2Icon />
                        <Typography sx={{ color: "white", pl: "10px" }}>
                          Sve Objave
                        </Typography>
                      </Box>
                      <KeyboardArrowRightIcon
                        sx={{ justifyContent: "flex-end" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        mb: "15px",
                      }}
                      onClick={() => navigate("/notifikacije")}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <MoveToInboxIcon />
                        <Typography sx={{ color: "white", pl: "10px" }}>
                          Sanduče
                        </Typography>
                      </Box>
                      <KeyboardArrowRightIcon
                        sx={{ justifyContent: "flex-end" }}
                      />
                    </Box>
                    {navigation.map((nav) => {
                      if (
                        (nav.role && nav.role === userRole) ||
                        nav.name === "Home"
                      )
                        return null;
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            mb: "15px",
                          }}
                          onClick={() => navigate(nav.url)}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {nav.name === "Vozila" ? (
                              <LocalShippingIcon />
                            ) : null}
                            {nav.name === "Vozači" ? (
                              <SwitchAccountIcon />
                            ) : null}
                            <Typography sx={{ color: "white", pl: "10px" }}>
                              {nav.name}
                            </Typography>
                          </Box>
                          <KeyboardArrowRightIcon
                            sx={{ justifyContent: "flex-end" }}
                          />
                        </Box>
                      );
                    })}
                    {userRoleMobile === "ADMINISTRATOR" && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          mb: "15px",
                        }}
                        onClick={() => navigate("/kompanije")}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <AccountBoxIcon />
                          <Typography sx={{ color: "white", pl: "10px" }}>
                            Kompanije
                          </Typography>
                        </Box>
                        <KeyboardArrowRightIcon
                          sx={{ justifyContent: "flex-end" }}
                        />
                      </Box>
                    )}
                    {userRoleMobile === "ADMINISTRATOR" && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          mb: "15px",
                        }}
                        onClick={() => navigate("/korisnici")}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <AccountBoxIcon />
                          <Typography sx={{ color: "white", pl: "10px" }}>
                            Korisnici
                          </Typography>
                        </Box>
                        <KeyboardArrowRightIcon
                          sx={{ justifyContent: "flex-end" }}
                        />
                      </Box>
                    )}
                    {userRoleMobile === "ADMINISTRATOR" && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          mb: "15px",
                        }}
                        onClick={() => navigate("/teret")}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <AccountBoxIcon />
                          <Typography sx={{ color: "white", pl: "10px" }}>
                            Vrste Tereta
                          </Typography>
                        </Box>
                        <KeyboardArrowRightIcon
                          sx={{ justifyContent: "flex-end" }}
                        />
                      </Box>
                    )}
                    {userRoleMobile === "ADMINISTRATOR" && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          mb: "15px",
                        }}
                        onClick={() => navigate("/cene")}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <AccountBoxIcon />
                          <Typography sx={{ color: "white", pl: "10px" }}>
                            Cene
                          </Typography>
                        </Box>
                        <KeyboardArrowRightIcon
                          sx={{ justifyContent: "flex-end" }}
                        />
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        mb: "15px",
                      }}
                      onClick={() => navigate("/profil")}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <AccountBoxIcon />
                        <Typography sx={{ color: "white", pl: "10px" }}>
                          Profil
                        </Typography>
                      </Box>
                      <KeyboardArrowRightIcon
                        sx={{ justifyContent: "flex-end" }}
                      />
                    </Box>
                    {(
                      userCompanyRole?.includes('TRADING') || userCompanyRole?.includes('OWNER')) && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            mb: "15px",
                          }}
                          onClick={() => navigate("/registracija-tereta")}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <AddIcon />
                            <Typography sx={{ color: "white", pl: "10px" }}>
                              Dodaj novi teret
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          mt: "50px",
                        }}
                        onClick={() => {
                          navigate("/");
                          dispatch(logoutUser());
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <LogoutIcon />
                          <Typography sx={{ color: "white", pl: "10px" }}>
                            Odjavi se
                          </Typography>
                        </Box>
                        <KeyboardArrowRightIcon
                          sx={{ justifyContent: "flex-end" }}
                        />
                      </Box>
                    </Box>
                  </MobileMenu>
                </>
              )}
            </Box>
          </Box>
        </HeaderContainer>
      ) : (
        <HeaderContainer>
          <Box sx={{ marginRight: "39px", display: "flex" }}>
            {navigation.map((nav) => {
              if (nav.role && nav.role === userRole) return null;
              return (
                <Button
                  variant={"text"}
                  onClick={() => navigate(nav.url)}
                  key={nav.name}
                  sx={{ color: "#222" }}
                >
                  <Typography sx={{ lineHeight: "1", fontSize: "14px" }}>
                    {nav.name}
                  </Typography>
                </Button>
              );
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "19px",
            }}
          >
            <IconButton sx={{ padding: "10px" }}>
              <SearchIcon />
            </IconButton>
            <IconButton
              aria-describedby={id}
              onClick={handleClick}
              sx={{ padding: "10px" }}
            >
              {notifications?.content?.every((el: { read: boolean; }) => el.read) ? <BellIcon /> : <BellActiveIcon /> }
      
            </IconButton>
            <NotificationPopup id={id} open={open} anchorEl={anchorEl}>
              <Box
                sx={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "700", color: "#222" }}>
                  Notifikacije
                </Typography>
                <Button
                  variant={"text"}
                  onClick={() => navigate("/notifikacije")}
                >
                  Pregledaj sve
                </Button>
              </Box>
              <Notifications>
                {notifications?.content?.length > 0 ? (
                  notifications?.content?.map(
                    (notification: any, index: number) => (
                      <Box key={index + 1} sx={{ width: "100%" }}>
                        <SingleNotification active={!notification?.read}>
                          <Typography>{notification.text}</Typography>
                          <Typography>
                            {`pre ${moment(notification.timestamp).fromNow(
                              true
                            )}`}
                          </Typography>
                        </SingleNotification>
                        <Divider />
                      </Box>
                    )
                  )
                ) : (
                  <Typography sx={{ fontWeight: "700", color: "#222" }}>
                    Nema novih notifikacija
                  </Typography>
                )}
              </Notifications>
            </NotificationPopup>
          </Box>
          <Profile />
        </HeaderContainer>
      )}
    </Box>
  );
};

export default Header;

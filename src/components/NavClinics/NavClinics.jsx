import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/Insta Order.svg";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./NavClinics.css";
import LanguageMenu from "../LanguageSwitch/LanguageMenu";
import ProfileMenuRestaurant from "../Profile/ProfileMenuClinic";
import HeaderWishlist from "../HeaderWishlist/HeaderWishlist";
import { useSelector } from "react-redux";

function NavClinics() {
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);
  const [countReservations, setCountReservations] = useState("0");
  const [countFav, setCountCountFav] = useState("0");
  const [dropdownOpen, setDropdownOpen] = useState({
    favorite: false,
    bag: false,
    language: false,
    profile: false,
  });
  const reservations = useSelector((state) => state.ShowReservation);
  const favClinic = useSelector((state) => state.favClinic);

  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");

  useEffect(() => {
    if (!reservations || !reservations.data || reservations.data.length === 0) {
      setCountReservations("0");
    } else {
      setCountReservations(reservations.data.length);
    }

    if (
      !favClinic ||
      !favClinic.favClinic ||
      favClinic.favClinic.length === 0
    ) {
      setCountCountFav("0");
    } else {
      setCountCountFav(favClinic.favClinic.length);
    }
  }, [reservations, favClinic]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen({
      ...dropdownOpen,
      [dropdown]: !dropdownOpen[dropdown],
    });
  };

  return (
    <div className="navBar">
      <div className="logo">
        <Link to="/">
          <img src={logoImg} alt="insta order" />
        </Link>
      </div>
      {token ? (
        <ul
          className={`nav-links ${lang === "ar" ? "ar" : ""} ${
            menuOpen ? "active" : ""
          }`}
        >
          <li>
            <NavLink to="/HomeMedical">{t("Home")}</NavLink>
          </li>
          <li>
            <NavLink to="/CLinics">{t("Clinics")}</NavLink>
          </li>
          <li>
            <NavLink to="/BecomeAPartner">{t("Become a Partner")}</NavLink>
          </li>
          <li>
            <NavLink to="/AboutUs"> {t("About Us")}</NavLink>
          </li>
        </ul>
      ) : null}

      <div className="icons">
        {token
          ? ["favorite", "calendar", "language", "profile"].map((icon) => (
              <div
                className="icon"
                key={icon}
                onClick={() => toggleDropdown(icon)}
              >
                {icon === "favorite" && (
                  <div className="iconContainer">
                    <span className="counter_Fav">{countFav}</span>
                    <HeaderWishlist />
                  </div>
                )}
                {icon === "calendar" && (
                  <Link to="/MyReservations">
                    <div className="iconContainer">
                      <EventOutlinedIcon />
                      <span className="counter_reservations">
                        {countReservations}
                      </span>
                    </div>
                  </Link>
                )}
                {icon === "language" && <LanguageOutlinedIcon />}
                {icon === "profile" && <AccountCircleOutlinedIcon />}
                <div className={`dropdown ${dropdownOpen[icon] ? "show" : ""}`}>
                  {icon === "language" && <LanguageMenu />}
                  {icon === "profile" && <ProfileMenuRestaurant />}
                </div>
              </div>
            ))
          : ["favorite", "language"].map((icon) => (
              <div
                className="icon"
                key={icon}
                onClick={() => toggleDropdown(icon)}
              >
                {icon === "favorite" && (
                  <div className="iconContainer">
                    <HeaderWishlist />
                  </div>
                )}
                {icon === "language" && <LanguageOutlinedIcon />}
                <div className={`dropdown ${dropdownOpen[icon] ? "show" : ""}`}>
                  {icon === "language" && <LanguageMenu />}
                </div>
              </div>
            ))}
        {!token && (
          <div className="icon">
            <Link to="/login">
              <button className="loginBtn">Login</button>
            </Link>
          </div>
        )}
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? "✖" : "☰"}
      </div>
    </div>
  );
}

export default NavClinics;

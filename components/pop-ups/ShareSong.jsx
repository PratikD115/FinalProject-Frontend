import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useEffect, useRef } from "react";

export default function Share({ shareOpen, onClose }) {
  const handleWhatsAppClick = () => {
    // Replace the URL with your sharing URL
    window.open(
      "whatsapp://send?text=Check%20out%20this%20link:%20https://example.com",
      "_blank"
    );
  };

  const handleFacebookClick = () => {
    // Replace the URL with your sharing URL
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=https://example.com",
      "_blank"
    );
  };

  const handleLinkedInClick = () => {
    // Replace the URL with your sharing URL
    window.open(
      "https://www.linkedin.com/shareArticle?url=https://example.com",
      "_blank"
    );
  };

  const handleInstagramClick = () => {
    // Replace the URL with your Instagram profile URL
    window.open("https://www.instagram.com/", "_blank");
  };

  return (
    <Menu open={shareOpen} onClose={onClose}>
      <MenuItem onClick={handleWhatsAppClick}>
        <WhatsAppIcon />
        WhatsApp
      </MenuItem>
      <MenuItem onClick={handleFacebookClick}>
        <FacebookIcon />
        Facebook
      </MenuItem>
      <MenuItem onClick={handleLinkedInClick}>
        <LinkedInIcon />
        LinkedIn
      </MenuItem>
      <MenuItem onClick={handleInstagramClick}>
        <InstagramIcon />
        Instagram
      </MenuItem>
    </Menu>
  );
}

import React from "react";
import { Box, Typography } from "@material-ui/core";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <ConfirmationNumberIcon />
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          All rights reserved!
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" to="/">
            Ticketify
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </div>
  );
}

export default Footer;

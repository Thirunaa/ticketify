import { Typography } from "@mui/material";

const ErrorComponent = () => {
  return (
    <div>
      <br />
      <br />
      <Typography variant="h1">404</Typography>
      <Typography component="h2" variant="overline">
        {"Page not found!"}
      </Typography>
      <Typography component="h2" variant="overline">
        {"Hold! while we take you back to safety."}
      </Typography>
    </div>
  );
};

export default ErrorComponent;

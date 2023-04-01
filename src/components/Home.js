import React from "react";
import { Container, Typography } from "@material-ui/core";

import "../App.css";
function Home() {
  return (
    <div>
      <Container>
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          Ticketify 🎫
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Introducing the Ultimate Ticket Destination: Your One-Stop Shop for Events, Attractions, and Venues! Are you
          tired of scouring the internet for the best events, attractions, and venues in town? Look no further than our
          Ticketmaster API-powered web application!
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          We've gathered all the top-notch entertainment options in one place, so you can easily find and book tickets
          for the experiences that matter to you. Whether you're into live music, sports, theater, comedy, or
          family-friendly activities, our platform has something for everyone. With just a few clicks, you can browse
          through our extensive catalog of events, attractions, and venues, filter by category, date, location, and
          price range, and get instant access to the hottest tickets in town. Plus, we make it easy to plan your outing
          with friends or family, with the ability to purchase multiple tickets at once and share them with your group.
          And if you ever have any questions or concerns, our friendly customer support team is always available to
          assist you.
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          So why wait? Start exploring our Ticketmaster API-powered web application today and discover your next
          unforgettable experience!
        </Typography>
      </Container>
    </div>
  );
}

export default Home;

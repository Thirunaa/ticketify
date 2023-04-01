import React, { createContext, useState } from "react";
import logo from "./images/logo.png";
import "./App.css";
import EventList from "./components/EventList";
import AttractionList from "./components/AttractionList";
import VenueList from "./components/VenueList";
import Event from "./components/Event";
import Attraction from "./components/Attraction";
import Venue from "./components/Venue";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Stack from "@mui/material/Stack";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import RouteNotFound from "./components/RouteNotFound";
export const errContext = createContext();

function App() {
  const [err, setErr] = useState(false);
  return (
    <errContext.Provider value={[err, setErr]}>
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to the Ticketify. The fun starts here, get a ticket!</h1>

            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <Button variant="contained">
                <Link className="link" to="/ticketify/">
                  Home
                </Link>
              </Button>
              <Button variant="contained">
                <Link className="link" to="/ticketify/events/page/1">
                  Events
                </Link>
              </Button>
              <Button variant="contained">
                <Link className="link" to="/ticketify/attractions/page/1">
                  Attractions
                </Link>
              </Button>
              <Button variant="contained">
                <Link className="link" to="/ticketify/venues/page/1">
                  Venues
                </Link>
              </Button>
            </Stack>
          </header>
          <br />
          <br />
          <div className="App-body">
            <Routes>
              <Route path="/ticketify" element={<Home />} />
              <Route path="/ticketify/venues/page/:pageId" element={<VenueList />} />
              <Route path="/ticketify/venues/:id" element={<Venue />} />
              <Route path="/ticketify/events/page/:pageId" element={<EventList />} />
              <Route path="/ticketify/events/:id" element={<Event />} />
              <Route path="/ticketify/attractions/page/:pageId" element={<AttractionList />} />
              <Route path="/ticketify/attractions/:id" element={<Attraction />} />
              <Route path="*" element={<RouteNotFound />} />
            </Routes>
          </div>
          <br />
          <br />
          <div>
            <Footer />
          </div>
        </div>
      </Router>
    </errContext.Provider>
  );
}

export default App;

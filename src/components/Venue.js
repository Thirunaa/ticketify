import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStyles } from "../styles/singleElementStyles.js";
import { Card, CardContent, CircularProgress, Typography, CardHeader, Button } from "@material-ui/core";
import { errContext } from "../App";
import "../App.css";

const Venue = (props) => {
  const navigate = useNavigate(); /*eslint-disable no-unused-vars*/
  const [err, setErr] = useContext(errContext); /*eslint-disable no-unused-vars*/
  const [showData, setShowData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  let { id } = useParams();
  const attractionUrl = "https://app.ticketmaster.com/discovery/v2/venues/";
  const API_KEY = "H77XEJSZzH82DAtgZLUhFSXr1yiyASYX";

  useEffect(() => {
    console.log("SHOW useEffect fired");
    async function fetchData() {
      try {
        const { data: show } = await axios.get(attractionUrl + id + ".json?apikey=" + API_KEY);
        if (show.errors) {
          console.log(show.errors);
          if (show.errors[0].status === "404") {
            setLoading(false);
            navigate("/venues/page/1");
          }
        }
        setShowData(show);
        setLoading(false);
        console.log(show);
      } catch (e) {
        setErr(true);
        navigate("/venues/page/1");
        console.log(e);
      }
    }
    fetchData();
  }, [id, navigate, setErr]);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <Card className={classes.card} variant="outlined">
        <CardHeader className={classes.titleHead} title={showData.name} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="span">
            <dl>
              <p>
                <dt className="title">Type:</dt>
                {showData && showData.type ? <dd>{showData.type}</dd> : <dd>N/A</dd>}
              </p>

              <p>
                <dt className="title">Number of Upcoming Events:</dt>
                {showData && showData.upcomingEvents && showData.upcomingEvents._total ? (
                  <dd>{showData.upcomingEvents._total}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>

              <p>
                <dt className="title">Postal Code:</dt>
                {showData && showData.postalCode ? <dd>{showData.postalCode}</dd> : <dd>N/A</dd>}
              </p>

              <p>
                <dt className="title">Timezone:</dt>
                {showData && showData.timezone ? <dd>{showData.timezone}</dd> : <dd>N/A</dd>}
              </p>
              <p>
                <dt className="title">City:</dt>
                {showData && showData.city && showData.city.name ? <dd>{showData.city.name}</dd> : <dd>N/A</dd>}
              </p>
              <p>
                <dt className="title">State:</dt>
                {showData && showData.state && showData.state.name ? <dd>{showData.state.name}</dd> : <dd>N/A</dd>}
              </p>
              <p>
                <dt className="title">Country:</dt>
                {showData && showData.country && showData.country.name ? (
                  <dd>{showData.country.name}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>

              <p>
                <dt className="title">Address:</dt>
                {showData && showData.address ? (
                  <dd>{Object.values(showData.address).join(",").toString()}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>

              <p>
                <Button variant="contained">
                  <Link to={showData.url}>Book Tickets</Link>
                </Button>
              </p>
            </dl>
            <Button
              to="/attractions/page/1"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
            >
              Back
            </Button>
          </Typography>
        </CardContent>
      </Card>
    );
  }
};

export default Venue;

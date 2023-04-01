import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import noImage from "../images/No_Image.png";
import { errContext } from "../App";
import { useStyles } from "../styles/singleElementStyles.js";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  CardHeader,
  Button,
  Grid,
} from "@material-ui/core";
import "../App.css";

const Event = (props) => {
  const navigate = useNavigate(); /*eslint-disable no-unused-vars*/
  const [err, setErr] = useContext(errContext); /*eslint-disable no-unused-vars*/
  const [showData, setShowData] = useState(undefined);
  const [bigImage, setBigImage] = useState("");
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  let { id } = useParams();
  const attractionUrl = "https://app.ticketmaster.com/discovery/v2/events/";
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
            navigate("/events/page/1");
          }
        }
        setShowData(show);
        setLoading(false);

        // find the biggest Image
        let maxImageUrl = show.images[0].url;
        let maxSize = 0;
        for (const image of show.images) {
          if (image.width + image.height > maxSize) {
            maxSize = image.width + image.height;
            maxImageUrl = image.url;
          }
        }
        setBigImage(maxImageUrl);
        console.log(show);
      } catch (e) {
        setErr(true);
        navigate("/events/page/1");
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
      <Box
        style={{
          backgroundImage: `url(${bigImage})`,
          backgroundSize: "cover",
          height: "auto",
          color: "#0f0101",
        }}
      >
        <Card className={classes.card} variant="outlined">
          <CardHeader className={classes.titleHead} title={showData.name} />
          <CardMedia className={classes.media} component="img" image={bigImage} title="show image" />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="span">
              <dl>
                <p>
                  <dt className="title">Seat Map</dt>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    image={
                      showData && showData.seatmap && showData.seatmap.staticUrl ? showData.seatmap.staticUrl : noImage
                    }
                    title="seat image"
                  />
                </p>

                <p>
                  <dt className="title">Info:</dt>
                  {showData && showData.info ? <dd>{showData.info}</dd> : <dd></dd>}
                  {showData && showData.pleaseNote ? <dd>{showData.pleaseNote}</dd> : <dd>N/A</dd>}
                </p>

                <p>
                  <dt className="title">Price Range: </dt>{" "}
                  {showData.priceRanges && showData.priceRanges[0] && showData.priceRanges[0].min
                    ? showData.priceRanges[0].min
                    : "$$"}{" "}
                  {showData.priceRanges && showData.priceRanges[0] && showData.priceRanges[0].currency
                    ? showData.priceRanges[0].currency
                    : "bucks"}{" "}
                  -{" "}
                  {showData.priceRanges && showData.priceRanges[0] && showData.priceRanges[0].max
                    ? showData.priceRanges[0].max
                    : "$$"}{" "}
                  {showData.priceRanges && showData.priceRanges[0] && showData.priceRanges[0].currency
                    ? showData.priceRanges[0].currency
                    : "bucks"}
                </p>

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
                  <dt className="title">Genre:</dt>
                  {showData &&
                  showData.classifications[0] &&
                  showData.classifications[0].segment &&
                  showData.classifications[0].segment.name ? (
                    <dd>{showData.classifications[0].segment.name}</dd>
                  ) : (
                    <dd>N/A</dd>
                  )}
                </p>
                <p>
                  <Button variant="contained" to={showData.url}>
                    <Link>Book Tickets</Link>
                  </Button>
                </p>

                <dt className="title">Attractions</dt>

                <Grid>
                  {showData._embedded.attractions.map((attraction) => {
                    return (
                      <Grid key={attraction.id}>
                        <Card className={classes.card} variant="outlined">
                          <CardActionArea>
                            <Link to={`/attractions/${attraction.id}`}>
                              <CardMedia
                                className={classes.media}
                                component="img"
                                image={
                                  attraction.images && attraction.images[attraction.images.length - 1].url
                                    ? attraction.images[attraction.images.length - 1].url
                                    : noImage
                                }
                                title="attraction image"
                              />

                              <CardContent>
                                <Typography className={classes.titleHead} gutterBottom variant="h6" component="h2">
                                  {attraction.name}
                                </Typography>

                                <Typography variant="body2" color="textSecondary" component="p">
                                  Genre :{" "}
                                  {attraction.classifications[0].segment.name
                                    ? attraction.classifications[0].segment.name
                                    : "Genre Unknown"}
                                </Typography>
                              </CardContent>
                            </Link>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
                <br />
                <br />
                <br />
                <dt className="title">Venues</dt>

                <Grid>
                  {showData._embedded.venues.map((venue) => {
                    return (
                      <Grid key={venue.id}>
                        <Card className={classes.card} variant="outlined">
                          <CardActionArea>
                            <Link to={`/venues/${venue.id}`}>
                              <CardMedia
                                className={classes.media}
                                component="img"
                                image={venue.images && venue.images[0].url ? venue.images[0].url : noImage}
                                title="venue image"
                              />

                              <CardContent>
                                <Typography className={classes.titleHead} gutterBottom variant="h6" component="h2">
                                  {venue.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  {venue.city && venue.city.name ? venue.city.name : ""}
                                  {", "}
                                  {venue.state && venue.state.name ? venue.state.name : "Place Unknown"}
                                </Typography>
                              </CardContent>
                            </Link>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </dl>
              <br />
              <br />
              <Button
                to="/events/page/1"
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
      </Box>
    );
  }
};

export default Event;

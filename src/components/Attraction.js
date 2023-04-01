import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import Stack from "@mui/material/Stack";
import { useStyles } from "../styles/singleElementStyles.js";
import { errContext } from "../App";
import { Box, Card, CardContent, CardMedia, CircularProgress, Typography, CardHeader, Button } from "@material-ui/core";
import "../App.css";

const Attraction = (props) => {
  const navigate = useNavigate();
  const [showData, setShowData] = useState(undefined);
  const [bigImage, setBigImage] = useState("");
  const [loading, setLoading] = useState(true); /*eslint-disable no-unused-vars*/
  const [errMessage, setErrMessage] = useState(""); /*eslint-disable no-unused-vars*/
  const [err, setErr] = useContext(errContext); /*eslint-disable no-unused-vars*/
  const classes = useStyles();
  let { id } = useParams();
  const attractionUrl = "https://app.ticketmaster.com/discovery/v2/attractions/";
  const API_KEY = "H77XEJSZzH82DAtgZLUhFSXr1yiyASYX";

  useEffect(() => {
    setTimeout(() => {
      setErr(false);
    }, 3000);
  }, [setErr]);

  useEffect(() => {
    console.log("SHOW useEffect fired");
    async function fetchData() {
      try {
        const { data: show } = await axios.get(attractionUrl + id + ".json?apikey=" + API_KEY);
        if (show.errors) {
          console.log(show.errors);
          if (show.errors[0].status === "404") {
            setLoading(false);
            navigate("/attractions/page/1");
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
        setErrMessage("No such attraction ID found - 404");
        navigate("/attractions/page/1");
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
            <Box>
              <Stack sx={{ pt: 1 }} direction="row" spacing={2} justifyContent="center">
                {showData &&
                  showData.externalLinks &&
                  showData.externalLinks.facebook &&
                  showData.externalLinks.facebook[0].url && (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`${showData.externalLinks.facebook[0].url}`, "_blank");
                      }}
                      to={showData.externalLinks.facebook[0].url}
                    >
                      <FacebookIcon sx={{ fontSize: 40 }} />
                      <br />
                      Facebook
                    </Link>
                  )}

                {showData &&
                  showData.externalLinks &&
                  showData.externalLinks.instagram &&
                  showData.externalLinks.instagram[0].url && (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`${showData.externalLinks.instagram[0].url}`, "_blank");
                      }}
                      to={showData.externalLinks.instagram[0].url}
                    >
                      <InstagramIcon sx={{ fontSize: 40 }} />
                      <br />
                      Instagram
                    </Link>
                  )}

                {showData &&
                  showData.externalLinks &&
                  showData.externalLinks.twitter &&
                  showData.externalLinks.twitter[0].url && (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`${showData.externalLinks.twitter[0].url}`, "_blank");
                      }}
                      to={showData.externalLinks.twitter[0].url}
                    >
                      <TwitterIcon sx={{ fontSize: 40 }} />
                      <br />
                      Twitter
                    </Link>
                  )}

                {showData &&
                  showData.externalLinks &&
                  showData.externalLinks.youtube &&
                  showData.externalLinks.youtube[0].url && (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`${showData.externalLinks.youtube[0].url}`, "_blank");
                      }}
                      to={showData.externalLinks.youtube[0].url}
                    >
                      <YouTubeIcon sx={{ fontSize: 40 }} />
                      <br />
                      YouTube
                    </Link>
                  )}

                {showData &&
                  showData.externalLinks &&
                  showData.externalLinks.homepage &&
                  showData.externalLinks.homepage[0].url && (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`${showData.externalLinks.homepage[0].url}`, "_blank");
                      }}
                      to={showData.externalLinks.homepage[0].url}
                    >
                      <LanguageIcon sx={{ fontSize: 40 }} />
                      <br />
                      Website
                    </Link>
                  )}

                {showData &&
                  showData.externalLinks &&
                  showData.externalLinks.itunes &&
                  showData.externalLinks.itunes[0].url && (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`${showData.externalLinks.itunes[0].url}`, "_blank");
                      }}
                      to={showData.externalLinks.itunes[0].url}
                    >
                      <MusicNoteIcon sx={{ fontSize: 40 }} />
                      <br />
                      iTunes
                    </Link>
                  )}

                {showData &&
                  showData.externalLinks &&
                  showData.externalLinks.spotify &&
                  showData.externalLinks.spotify[0].url && (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`${showData.externalLinks.spotify[0].url}`, "_blank");
                      }}
                      to={showData.externalLinks.spotify[0].url}
                    >
                      <SpatialAudioIcon sx={{ fontSize: 40 }} />
                      <br />
                      Spotify
                    </Link>
                  )}
              </Stack>
            </Box>

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
      </Box>
    );
  }
};

export default Attraction;

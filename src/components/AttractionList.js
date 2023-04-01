import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import SearchData from "./SearchData";
import noImage from "../images/No_Image.png";
import { useStyles } from "../styles/styles.js";
import { errContext } from "../App";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Button,
  ButtonGroup,
  Container,
  Typography,
} from "@material-ui/core";

import "../App.css";
import ErrorComponent from "./ErrorComponent";

const AttractionList = () => {
  const navigate = useNavigate();
  let { pageId } = useParams();
  pageId = parseInt(pageId);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [prevPageExists, setPrevPageFlag] = useState(false);
  const [nextPageExists, setNextPageFlag] = useState(false);
  const [err, setErr] = useContext(errContext);
  const [searchData, setSearchData] = useState(undefined);
  const [attractionsData, setattractionsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); /*eslint-disable no-unused-vars*/
  const [errMessage, setErrMessage] = useState("");
  const eventUrl = "https://app.ticketmaster.com/discovery/v2/attractions.json?size=100&page=";
  const API_KEY = "&countryCode=US&apikey=H77XEJSZzH82DAtgZLUhFSXr1yiyASYX";
  let card = null;

  useEffect(() => {
    setTimeout(() => {
      setErr(false);
    }, 5000);
  }, [setErr]);

  useEffect(() => {
    console.log("on load useeffect");
    async function fetchData() {
      try {
        let pageNo = pageId;
        if (isNaN(pageNo) || typeof pageNo !== "number" || pageNo <= 0) {
          throw new Error("400 - Invalid page parameter.");
        }
        if (pageNo !== 1) {
          setPrevPageFlag(true);
        } else {
          setPrevPageFlag(false);
        }
        let nextPageNo = pageNo + 1;
        try {
          await axios.get(eventUrl + (nextPageNo - 1) + API_KEY);
          setNextPageFlag(true);
        } catch (e) {
          setNextPageFlag(false);
        }

        try {
          const { data } = await axios.get(eventUrl + (pageNo - 1) + API_KEY);
          setattractionsData(data);
        } catch (e) {
          console.log(eventUrl + pageNo + API_KEY);
          console.log(e);
          //setLoading(false);
          setPrevPageFlag(false);
          setErr(true);
          navigate("/attractions/page/1");
          setErrMessage("404 - No data available for this page");
          throw new Error("404 - No data available for this page");
        }
      } catch (e) {
        if (e.message === "400 - Invalid page parameter.") {
          setErr(true);
          setErrMessage("400 - Invalid page parameter. Redirecting to the first page");
          setPrevPageFlag(false);
          navigate("/attractions/page/1");
        }
        console.log(e);
      }
    }
    fetchData();
    setLoading(false);
  }, [pageId, navigate, setErr]);

  useEffect(() => {
    console.log("search useEffect fired");
    async function fetchData() {
      let pageNo = pageId;
      try {
        console.log(`in fetch searchTerm: ${searchTerm}`);
        const { data } = await axios.get(eventUrl + pageNo + "&keyword=" + searchTerm + API_KEY);
        setSearchData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm) {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [searchTerm, pageId]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const buildCard = (attraction) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={attraction.id}>
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
  };

  if (searchTerm) {
    card =
      searchData &&
      searchData._embedded &&
      searchData._embedded.attractions &&
      searchData._embedded.attractions.map((event) => {
        return buildCard(event);
      });
  } else {
    card =
      attractionsData &&
      attractionsData._embedded &&
      attractionsData._embedded.attractions &&
      attractionsData._embedded.attractions.map((attraction) => {
        return buildCard(attraction);
      });
  }

  if (err) {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <ButtonGroup disableElevation variant="contained" color="secondary">
            {prevPageExists && (
              <Button>
                <Link to={`/attractions/page/${pageId - 1}`}>PREVIOUS</Link>
              </Button>
            )}
            {nextPageExists && (
              <Button>
                <Link to={`/attractions/page/${pageId + 1}`}>NEXT</Link>
              </Button>
            )}
          </ButtonGroup>
        </Container>
        <br />
        Attractions Keyword Search <SearchData searchValue={searchValue} />
        <br />
        <br />
        <Container>
          {err && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>404 - Page Not Found</strong>
            </Alert>
          )}
        </Container>
        <br />
        <br />
        <Grid container className={classes.grid} spacing={5}>
          {card}
        </Grid>
        <br />
        <br />
        <Container>
          <ButtonGroup disableElevation variant="contained" color="secondary">
            {prevPageExists && (
              <Button>
                <Link role="button" to={`/attractions/page/${pageId - 1}`}>
                  PREVIOUS
                </Link>
              </Button>
            )}
            {nextPageExists && (
              <Button>
                <Link role="button" to={`/attractions/page/${pageId + 1}`}>
                  NEXT
                </Link>
              </Button>
            )}
          </ButtonGroup>
        </Container>
      </div>
    );
  }
};

export default AttractionList;

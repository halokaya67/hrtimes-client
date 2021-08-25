import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { topStoriesTopics } from "../../data/data";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import GoogleButton from "../GoogleButton/GoogleButton";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Alert from "@material-ui/lab/Alert";
import Footer from "../Footer/Footer";
import "./SignUp.css";
import geoJson from "../../data/countriesCities.json";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const [countryList, updateCountryList] = useState([]);
  const [countryValue, updateCountryValue] = useState(null);
  const classes = useStyles();
  const {
    onSignUp,
    updateInterests,
    onGoogleSuccess,
    onGoogleFailure,
    error,
    updateError,
  } = props;

  useEffect(() => {
    updateCountryList(Object.keys(geoJson));
    updateError(null);
  }, []);

  return (
    <>
      <Container component="main" maxWidth="sm" className="signUpMainContainer">
        <CssBaseline />
        <div className={`${classes.paper} signUpFormContainer`}>
          <Typography className="signUpHeader" variant="h3" gutterBottom>
            Sign Up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event) => {
              onSignUp(event);
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="uname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  autoHighlight
                  options={countryList}
                  onChange={(event, value) => {
                    updateCountryValue(value);
                  }}
                  getOptionLabel={(option) => option}
                  renderOption={(option) => (
                    <React.Fragment>{option}</React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Choose Your Country"
                      variant="outlined"
                      autoComplete="country"
                      name="country"
                      fullWidth
                      id="country"
                      autoFocus
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>
              {!countryValue ? (
                ""
              ) : (
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    autoHighlight
                    options={geoJson[`${countryValue}`]}
                    getOptionLabel={(option) => option}
                    renderOption={(option) => (
                      <React.Fragment>{option}</React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Choose Your City"
                        variant="outlined"
                        autoComplete="city"
                        name="city"
                        fullWidth
                        id="city"
                        autoFocus
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordHash"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  limitTags={3}
                  options={topStoriesTopics}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) => {
                    updateInterests(value);
                  }}
                  closeMenuOnSelect={false}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Choose Your Interests"
                      placeholder="Interests"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormHelperText>Upload your photo</FormHelperText>
                <Input
                  type="file"
                  name="myImage"
                  accept="image/png, image/jpg"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={`${classes.submit} formSignUpButton`}
            >
              Sign Up
            </Button>
            {error && (
              <Alert variant="filled" severity="error" className="signUpAlert">
                {error}
              </Alert>
            )}
            <Grid container justifyContent="center">
              <GoogleButton
                onSuccess={onGoogleSuccess}
                onFailure={onGoogleFailure}
                className="googleSignUpButton"
              />
            </Grid>
            <Grid container className="signInLinkContainer">
              <Grid item>
                <p className="signInFormText">
                  Already have an account?
                  <Link className="signInFormLink" to="/signin">
                    Sign In!
                  </Link>
                </p>
              </Grid>
            </Grid>
          </form>
        </div>
        <Footer />
      </Container>
    </>
  );
}

export default SignUp;

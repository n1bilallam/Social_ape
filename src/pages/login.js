import React, { Component } from "react";
import PropTypes from 'prop-types';
import appIcon from "../images/icon.png";
import { Link } from "react-router-dom";
// Redux
import { connect } from 'react-redux';
import { loginUser } from "../redux/actions/userActions";
// Material UI
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Avatar, TextField, Button, Paper, CircularProgress } from "@material-ui/core";





const styles = (theme) => ({
  ...theme.thisStyle
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }
  componentWillReceiveProps(next) {
    if (next.UI.errors) {
      this.setState({ errors: next.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData, this.props.history);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;
    return (
      <Paper elevation={12} style={{ height: "450px" }} >
        <Grid container className={classes.form} >
          <Grid item xs={2} sm={3} />
          <Grid item xs={8} sm={6}>
            <Avatar src={appIcon} alt="tweet" className={classes.large} />
            <Typography variant="h2" gutterBottom className={classes.pageTitle}>
              login
          </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Your Email"
                className={classes.textField}
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Your Password"
                className={classes.textField}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
              >
                Login
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>Dont have an account ? sugn up <Link to="/signup">here !</Link></small>

            </form>
          </Grid>
          <Grid item xs={2} sm={3} />
        </Grid>
      </Paper>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});
const mapActionsToProps = {
  loginUser
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));

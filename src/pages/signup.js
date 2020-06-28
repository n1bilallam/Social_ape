import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import appIcon from "../images/icon.png";
import { Link } from "react-router-dom";
// Redux 
import { connect } from 'react-redux';
import { signupUser } from "../redux/actions/userActions";
// Material UI
import { Grid, Typography, Avatar, TextField, Button, Paper, CircularProgress } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.thisStyle
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      loading: false,
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
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }
    this.props.signupUser(newUserData, this.props.history);
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
      <Paper elevation={12} style={{ height: "550px" }}>
        <Grid container className={classes.form} >
          <Grid item xs={2} sm={3} />
          <Grid item xs={8} sm={6}>
            <Avatar src={appIcon} alt="tweet" className={classes.large} />
            <Typography variant="h2" gutterBottom className={classes.pageTitle}>
              SignUp
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
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Your Password"
                className={classes.textField}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="handle"
                name="handle"
                type="text"
                label="Your Handle"
                className={classes.textField}
                helperText={errors.handle}
                error={errors.handle ? true : false}
                value={this.state.handle}
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
                Signup
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>Already have an account ? Login <Link to="/login">here !</Link></small>
            </form>
          </Grid>
          <Grid item xs={2} sm={3} />
        </Grid>
      </Paper>
    );
  }
}
signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});
export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
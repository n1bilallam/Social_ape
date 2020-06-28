import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Buttons from "../../tools/Buttons";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications"
//Redux
import { connect } from "react-redux";
//Material UI
import { Toolbar, AppBar, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
// Icons MUI
import HomeIcon from '@material-ui/icons/Home';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minWidth: "100%"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logsign: {
    left: "80%",
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});
class Navbar extends Component {
  render() {
    const { authenticated, classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {authenticated ? (
              <Fragment >
                <PostScream />
                <Link to="/">
                  <Buttons tip="Home">
                    <HomeIcon />
                  </Buttons>
                </Link>
                <Notifications />
              </Fragment>
            ) : (
                <Fragment>
                  <Button edge="start" className={classes.menuButton} aria-label="menu" color="inherit" component={Link} to="/" >
                    Home
                    </Button>
                  <Button color="inherit" className={classes.logsign} component={Link} to="/login">
                    Login
                </Button>
                  <Button color="inherit" className={classes.logsign} component={Link} to="/signup">
                    Sign Up
                </Button>
                </Fragment>
              )
            }
          </Toolbar>
        </AppBar >
      </div>
    );
  }
}
Navbar.prototypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
const mapStateToProps = state => (
  { authenticated: state.user.authenticated }
)

export default connect(mapStateToProps)(withStyles(styles)(Navbar));

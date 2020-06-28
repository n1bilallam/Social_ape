import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import noImg from "../images/no-img.png";
//Material UI
import { Paper } from "@material-ui/core";

//Icons MUI
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from '@material-ui/icons/Link';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';


const styles = (theme) => ({
    ...theme.thisStyle,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin: '0 auto 7px auto'
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        marginBottom: 10
    }
});
const ProfileSkeleton = (props) => {
    const { classes } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={noImg} alt="Profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <LocationOn color="primary" /><span>
                        Location
                        </span>
                    <hr />
                    <LinkIcon color="primary" /> https://website.com
                        <hr />
                    <EventAvailableIcon color="primary" /> joined date
                    </div>
            </div>

        </Paper>
    );

};

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(ProfileSkeleton);
import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom"
//Materil UI
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link"
//Icons MUI
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from '@material-ui/icons/Link';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
const styles = (theme) => ({
    ...theme.thisStyle,
});

const StaticProfile = (props) => {
    const { classes,
        profile: { handle, createdAt, imageUrl, bio, website, location } } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink
                        component={Link}
                        to={`/users/${handle}`}
                        color="primary"
                        variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2" >{bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOn color="primary" /> <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}
                                {website}
                            </a>
                            <hr />
                        </Fragment>
                    )}
                    <EventAvailableIcon color="primary" />{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>

            </div >
        </Paper >
    )
}

StaticProfile.prpTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);
import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import Buttons from "../../tools/Buttons";
import ProfileSkeleton from "../../tools/ProfileSkeleton";

//Redux
import { connect } from "react-redux";
import { uploadImage, logOutUser } from "../../redux/actions/userActions";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import { Button, Typography, Paper } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";

//Icons MUI
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from '@material-ui/icons/Link';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';

const styles = (theme) => ({
    ...theme.thisStyle,
});

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }
    handleEditePicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    }
    handleLogout = () => {
        this.props.logOutUser();
    }
    render() {
        const { classes,
            user: {
                credentials: {
                    handle, createdAt, imageUrl, bio, website, location
                },
                loading,
                authenticated
            }
        } = this.props;
        let profileMarkUp = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img src={imageUrl} alt="profile" className="profile-image" />
                            <input type="file" hidden="hidden" id="imageInput" onChange={this.handleImageChange} />
                            <Buttons tip="Upload/Edit your Profile Picture" onClick={this.handleEditePicture} btnClassName="button">
                                <AddAPhotoIcon color="primary" />
                            </Buttons>
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
                        <EditDetails />
                        <Buttons tip="Logout" onClick={this.handleLogout} >
                            <SettingsPowerIcon color="secondary" />
                        </Buttons>
                    </div >
                </Paper >
            ) : (
                    <Paper className={classes.paper}>
                        <Typography variant="body2" align="center">
                            No Profile found, Please login again
                    </Typography>
                        <div className={classes.buttons}>
                            <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                            <Button variant="contained" color="secondary" component={Link} to="/signup">SignUp</Button>
                        </div>
                    </Paper>
                )) : (<ProfileSkeleton />)
        return profileMarkUp;
    }
}
const mapStateToProps = (state) => ({
    user: state.user
});
const mapActionsToProps = {
    logOutUser, uploadImage
}
Profile.prototypes = {
    logOutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classess: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));

import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import Buttons from "../../tools/Buttons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from './LikeButton';
import Comments from "./Comments"
import CommentForm from "./CommentForm"
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

//Material UI
import { withStyles } from "@material-ui/core/styles";
import { Grid, Dialog, Slide, DialogContent, CircularProgress, Typography } from '@material-ui/core';

//icons MUI
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

//Redux
import { connect } from 'react-redux';
import { getScream, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
    ...theme.thisStyle,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeBtn: {
        position: 'absolute',
        left: '90%'
    },
    expandBtn: {
        position: 'absolute',
        left: "58.8%"
    }, spinner: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }
    UNSAFE_componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;
        const { userHandle, screamId } = this.props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;
        if (oldPath === newPath) oldPath = `/users/${userHandle}`;
        window.history.pushState(null, null, newPath);
        this.setState({ open: true, oldPath, newPath });
        this.props.getScream(this.props.screamId);
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    }
    render() {
        const { classes, scream: {
            screamId,
            body,
            createdAt,
            commentCount,
            likeCount,
            userImage,
            userHandle,
            comments
        }, UI: { loading } } = this.props;
        const dialogMarkUp = loading ? (
            <div className={classes.spinner}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
                <Grid container spacing={10}>
                    <Grid item sm={5}>
                        <img src={userImage} alt="Profile" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography
                            component={Link}
                            color="primary"
                            variant="h5"
                            to={`/users/${userHandle}`}>
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invSep} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a,MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invSep} />
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        <LikeButton screamId={screamId} />
                        <span>{likeCount} likes</span>
                        <Buttons tip="comment">
                            <ChatBubbleIcon />
                        </Buttons>
                        <span>{commentCount} comments</span>
                    </Grid>
                    <hr className={classes.visibleSep} />
                    <CommentForm screamId={screamId} />
                    <Comments comments={comments} />
                </Grid>
            )
        return (
            <Fragment>
                <Buttons onClick={this.handleOpen} tip="Expan Scream" tipClassName={classes.expandBtn}>
                    <UnfoldMoreIcon color="primary" />
                </Buttons>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    fullWidth
                    maxWidth="sm">
                    <Buttons onClick={this.handleClose} tip="Close" tipClassName={classes.closeBtn}>
                        <CloseIcon color="secondary" />
                    </Buttons>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkUp}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream,
    clearErrors
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(ScreamDialog));
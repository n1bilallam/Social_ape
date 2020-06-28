import React, { Component } from 'react';
import { Link } from "react-router-dom"
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from "prop-types";
import Buttons from "../../tools/Buttons";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";

//Material UI
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardActions, Avatar, Typography } from '@material-ui/core';
// Icons MUI

import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

//Redux
import { connect } from "react-redux";
import LikeButton from './LikeButton';

const styles = {
    root: {
        displat: 'flex',
        marginBottom: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }


}
class Scream extends Component {

    render() {
        dayjs.extend(relativeTime)
        const { classes,
            scream: {
                body,
                createdAt,
                userImage,
                userHandle,
                screamId,
                likeCount,
                commentCount
            },
            user: {
                authenticated,
                credentials: { handle }
            }
        } = this.props;

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}></DeleteScream>
        ) : null;
        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar
                            className={classes.avatar}
                            src={userImage}
                            component={Link}
                            to={`/users/${userHandle}`} >
                        </Avatar>
                    }
                    action={
                        deleteButton
                    }
                    title={userHandle}
                    subheader={dayjs(createdAt).fromNow()}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" >
                        {body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} likes</span>
                    <Buttons tip="comment">
                        <ChatBubbleIcon />
                    </Buttons>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
                </CardActions>
            </Card >
        );
    }
}
Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}
const mapStateToProps = state => ({
    user: state.user
})



export default connect(mapStateToProps)(withStyles(styles)(Scream));
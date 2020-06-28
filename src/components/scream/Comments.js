import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
//Material UI
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.thisStyle,
    commentImage: {
        maxWidth: '100%',
        height: 50,
        objectFit: 'cover',
        borderRadius: '50%',
        marginLeft: 40
    },
    commentData: {
        marginLeft: 60
    }
})

class Comments extends Component {
    render() {
        const { comments, classes } = this.props;
        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={1}>
                                        <img
                                            src={userImage}
                                            alt="comment"
                                            className={classes.commentImage}
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant="h5"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color="primary"
                                            >
                                                {userHandle}
                                            </Typography>
                                            <br />
                                            <Typography variant="caption" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator} />
                                            <Typography variant="body1">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    );
                })}
            </Grid>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
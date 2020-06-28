import React, { Fragment } from "react";
import noImg from "../images/no-img.png";
import PropTypes from 'prop-types';

// Material UI
import { Card, CardMedia, CardContent } from "@material-ui/core";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => (
    {
        card: {
            display: 'flex',
            marginBottom: 20,
        },
        content: {
            width: '100%',
            flexDirection: 'column',
            padding: 25
        },
        cover: {
            minWidth: 50,
            height: 50,
            objectFit: 'cover',
            borderRadius: "50%",
            margin: 10
        },
        handle: {
            width: 60,
            height: 15,
            backgroundColor: '#5269ff',
            marginBottom: 8,
        },
        date: {
            height: 14,
            width: 100,
            backgroundColor: '#e0e0e0',
            marginBottom: 10
        },
        fullLine: {
            height: 15,
            width: '90%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            marginBottom: 10,
        },
        halfLine: {
            height: 15,
            width: '50%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            marginBttom: 10,
        },
    })

const ScreamSkeleton = (props) => {
    const { classes } = props;
    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={noImg} />
            <CardContent className={classes.content}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ))
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScreamSkeleton);
import React, { Component } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from "react-router-dom"
import Buttons from "../../tools/Buttons";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { likeScream, unLikeScream } from "../../redux/actions/dataActions";

class LikeButton extends Component {
    likedScream = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.screamId === this.props.screamId
            )
        )
            return true;
        else return false;
    };
    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    };
    unLikeScream = () => {
        this.props.unLikeScream(this.props.screamId)
    };
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <Buttons tip="Like">
                    <FavoriteBorderIcon />
                </Buttons>
            </Link >
        ) : (
                this.likedScream() ? (
                    <Buttons tip="Undo like" onClick={this.unLikeScream}>
                        <FavoriteIcon color="secondary" />
                    </Buttons>
                ) : (
                        <Buttons tip="Like" onClick={this.likeScream}>
                            <FavoriteBorderIcon />
                        </Buttons>
                    )
            );
        return likeButton;
    }
}
LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unLikeScream: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.user
})
const mapActionsToProps = {
    likeScream,
    unLikeScream
}
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
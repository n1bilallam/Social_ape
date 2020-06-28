import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import Buttons from "../../tools/Buttons";
// Redux
import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";
//Material UI
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogActions, Slide } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const styles = (theme) => ({
    ...theme.thisStyle
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class DeleteScream extends Component {

    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open: false });
    }
    render() {

        const { classes } = this.props;
        return (
            <Fragment>
                <Buttons
                    tip="Delete"
                    onClick={this.handleOpen}
                    btnClassName={classes.button}
                >
                    <DeleteForeverIcon color="secondary" />
                </Buttons>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    maxWidth="sm">
                    <DialogTitle>
                        Are you sure you want to delete it ?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.deleteScream} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}
DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream));
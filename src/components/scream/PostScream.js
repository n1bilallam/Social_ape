import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import Buttons from "../../tools/Buttons";

//Redux
import { connect } from 'react-redux';
import { postScream, clearErrors } from "../../redux/actions/dataActions";

//Material UI
import { withStyles } from "@material-ui/core/styles";
import { Dialog, Slide, DialogTitle, DialogContent, Button, TextField, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
//icons MUI
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    ...theme.thisStyle,
    submitButton: {
        position: "relative",
        float: "right",
        marginTop: 10
    },
    progressSpinner: {
        position: "absolute"
    },
    closeBtn: {
        position: "absolute",
        left: '91%',
        top: '6%'
    }
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} });

        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({ body: this.state.body });
    }
    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        return (
            <Fragment>
                <Buttons onClick={this.handleOpen} tip="Post a scream !">
                    <AddIcon />
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
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="SCREAM !"
                                multiline
                                rows="3"
                                placeholder="Scream at your fellow aps"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary"
                                className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (<CircularProgress size={30} className={classes.progressSpinner} ></CircularProgress>)}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment >
        )
    }

}
PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(
    mapStateToProps,
    { postScream, clearErrors }
)(withStyles(styles)(PostScream));
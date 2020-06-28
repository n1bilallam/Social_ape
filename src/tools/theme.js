export default {
    palette: {
        primary: {
            light: "#33c9dc",
            main: "#5269ff",
            dark: "#526fff",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff6333",
            main: "#ff3d00",
            dark: "#b22a00",
            contrastText: "#fff",
        },
    },
    thisStyle: {
        typography: {
            useNextVariants: true
        },
        form: {
            textAlign: "center"
        },

        large: {
            margin: "20px auto 15px auto",
            width: "60px",
            height: "60px"
        },
        button: {
            margin: "10px",
            position: "relative"
        },
        progress: {
            position: "absolute"
        },
        pageTitle: {
            margin: "10px auto 10px auto"
        },
        textField: {
            margin: "10px auto 10px auto"
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: "10px"
        }, paper: {
            padding: 20,

        },
        invSep: {
            border: 'none',
            margin: 4
        },
        visibleSep: {
            width: '100%',
            borderBottom: '1px  solid rgb(0,0,0,0.1)',
            marginBottom: 20

        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#00bcd4'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        },
        editUser: {
            float: 'right'
        },

    }
}
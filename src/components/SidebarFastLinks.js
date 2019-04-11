import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const styles = {   
    fastLink: {
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#fff !important',
        padding: '0 !important',
        minWidth: '0 !important',
        minHeight: '0 !important',
        marginTop: '20px !important'
    },
    fullBtn: {
        fontSize: '15px !important', marginTop: '40px !important',
        borderStyle: 'solid', borderRadius: '0px !important',
        width: '100px !important', padding: '6px !important',
        marginLeft: '20px !important',
    },
    btnblu: {
        backgroundColor: 'blue !important', color: '#fff !important', opacity: 0.9,
    },
}

const SidebarFastLinks = (props) => {  
    const { classes } = props; 

    return (
        <div>
            { 
            props.userLogged ?  null : (

                <div className="fastLink">   
                    <Link to="/signin">
                        <Button className={classes.fullBtn+' '+classes.btnblu}>Sign In</Button>
                    </Link>  
                </div>
            )}

        </div>
    )
}
SidebarFastLinks.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SidebarFastLinks) 

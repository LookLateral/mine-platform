import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    sidebarSingleLink: {
        height: 30,
        borderTop: '1px thin #555',
        textAlign: 'left',
        padding: '25px 2px 0px 0px', 
        marginLeft: 20,
    },
    singleLinkContainer: {
        marginTop: 20,
        textAlign: 'center',
    },
    singleLink: {
        textDecoration: 'none',
        color: '#cdcdcd',
        fontSize: 15,
        fontWeight: 'smaller',
    },
    singleLinkImage: { marginRight: 5, }
}

const SidebarSingleLink = (props) => {
    const { classes } = props; 

    return (
        <div className={classes.sidebarSingleLink}>

            <Link to={props.linkto} className={classes.singleLink}>
                {props.name}
            </Link>       
        </div>
    )
}
SidebarSingleLink.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SidebarSingleLink) 
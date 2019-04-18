import React/*, { Component }*/ from 'react'
import SidebarUserDetails from './SidebarUserDetails'
import SidebarFastLinks from './SidebarFastLinks'
import SidebarLinkList from './SidebarLinkList'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    sidebar: {
        width: 200,
        height: 'calc(100% - 150px)',
        position: 'absolute',
        right: 0,
        top: 150,
        bottom: 0,
        backgroundColor: '#171d17',
    }
}

const Sidebar = (props) => {      
    const { classes } = props; 

    return (
        props.isOpen ?
        <div className={classes.sidebar}> 
        
                <SidebarUserDetails userLogged={ props.userLogged} firstName={ props.firstName} handleLogout={props.handleLogout}/>

                <SidebarFastLinks userLogged={ props.userLogged} />

                <SidebarLinkList userLogged={ props.userLogged} userType={ props.userType} userId={ props.userId} email={ props.email} />

        </div> :
        null
    )
    
}
Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Sidebar) 
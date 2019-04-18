import React from 'react';
import SidebarSingleLink from './SidebarSingleLink';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    sidebarLinkList: { marginTop: 20, }
}

const SidebarLinkList = (props) => {
    
    const { classes } = props; 
    return (
        <div className={classes.sidebarLinkList}>
            { props.userLogged && props.email.indexOf('@looklateral.com') > 0 /*props.userType === 3*/ ?
                <SidebarSingleLink 
                        name="Admin Dashboard"
                        linkto="/admin"
                        icon="user-shield"
                    />
            :
                null
            }
            { props.userLogged && props.userType >= 0 ?
                <div>
                    {/*
                    <SidebarSingleLink 
                        name="Member Dashboard"
                        linkto="/"
                        icon="home" />*/}
                    <SidebarSingleLink 
                        name="Member Dashboard"
                        linkto={"/users/" + props.userId}
                        icon="address-card" />
                    <SidebarSingleLink 
                        name="Discover Art"
                        linkto="/provenance"
                        icon="palette" />           
                    
                </div>
            :
                null 
            }
            <SidebarSingleLink 
                    name="How it Works"
                    linkto="/how-it-works"
                    icon="cogs" />
            <SidebarSingleLink 
                    name="About us"
                    linkto="/provenance"
                    icon="fingerprint" />        
            <SidebarSingleLink 
                    name="Terms of service"
                    linkto="/terms-of-service"
                    icon="file-signature" />       
            <SidebarSingleLink 
                    name="Privacy Policy"
                    linkto="/privacy-policy"
                    icon="gavel" />
        </div>
    )
}
SidebarLinkList.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SidebarLinkList) 

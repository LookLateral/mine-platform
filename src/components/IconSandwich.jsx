import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Icon from '@material-ui/core/Icon';
//import ViewHeadline from '@material-ui/icons/ViewHeadline';

const styles = {
    iconSandwich: { color: '#fff',
        marginRight: 20,
        fontSize: '2em',
        position: 'absolute',
        right: 0,
        top:32 
    },/*
    icon: {
        color: '#fff', fontSize: 50, transform: 'rotate(90deg)', 
    },
    iconRotate: {
        color: '#fff', fontSize: 50,
    },
    hideBtn: {
        //border: 'none',
        //backgroundColor: 'transparent',
    },*/
}

const IconSandwich = (props) => {    
    
    const { classes } = props;       
    return (
        props.isOpen ?
        <div className={classes.iconSandwich}> 
            <FontAwesomeIcon icon='bars' rotation={90} onClick={ props.onClick } />
        </div> :
        <div className={classes.iconSandwich}> 
            <FontAwesomeIcon icon='bars' onClick={ props.onClick } />
        </div>               
    )
}
IconSandwich.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(IconSandwich) 

/*const IconSandwich = (props) => {    
    
    const { classes } = props;  
    return (
        props.isOpen ?
        <div className={classes.iconSandwich}>
            <Icon className={classes.icon} onClick={ props.handleSidebar }>
                    view_headline
                </Icon>
        </div> :
        <div className={classes.iconSandwich}> 
            
                <Icon className={classes.iconRotate} onClick={ props.handleSidebar }>
                    view_headline
                </Icon>
           
        </div>            
    )

}
IconSandwich.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(IconSandwich) */

/*const IconSandwich = (props) => {    
    
    const { classes } = props;  
    return (
        props.isOpen ?
            <div className={classes.iconSandwich}>
                <ViewHeadline className={classes.icon} onClick={ props.handleSidebar } />
            </div> 
        :
            <div className={classes.iconSandwich}> 
                <ViewHeadline className={classes.iconRotate} onClick={ props.handleSidebar } />
            </div>            
    )

}
IconSandwich.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(IconSandwich)*/
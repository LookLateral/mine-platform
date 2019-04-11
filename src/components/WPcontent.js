import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const styles = {
  spanColored: {
    fontSize: 80, padding: 20, opacity: 0.8,
    width: '100%', height: 200, bottom: 0, left: 0,
    position: 'absolute',
  },
  textSpanColored: { textDecoration: 'none', color: '#fff', },
}

const properties = {
  showArrows:false, showStatus:false, showIndicators:false, showThumbs:false,
  infiniteLoop:true, stopOnHover:false,emulateTouch:true,
  transitionTime: 250, interval:2000, autoPlay: true,
}

const WPContent = (props) => {
  
    const { classes } = props;
    const { userState } = props;   
    let categories = userState.categories.map ((category, index) => {       
      return <div key={index} style={{ height: userState.viewport.height-260 }}> 
                <img 
                    src={category._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} 
                    height={(userState.viewport.height -260)}
                    alt={category.acf.category_name} />
                <span className={classes.spanColored} style={{backgroundColor: category.acf.category_color}}>
                  <a 
                      href={category.acf.category_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={classes.textSpanColored}>
                  {category.acf.category_name}</a>
                </span> 
              </div> 
    });
    /* ZUNOTE: autoplay doesn't work (and error in console "Uncaught TypeError: Cannot read property '0' of undefined") because categories is empty on component did mount */
    return (  
        <Carousel autoPlay {...properties}>
            { categories }               
        </Carousel>        
    ) 
    
  }
  
  WPContent.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(WPContent);
  
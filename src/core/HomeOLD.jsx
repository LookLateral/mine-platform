import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import BackgroundLeft from '../../shared/images/image-home-sx.jpg';

//import { Slide } from 'react-slideshow-image';   DEPRECATED
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: -150
  },
  card: {
    marginTop: 150, //marginBottom: 40,
    //minWidth: 275, //minHeight: 650,
    //padding: theme.spacing.unit * 2,
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
  },
  cardContent1: {
    padding: 0, paddingBottom: '0px !important',
    backgroundImage: `url(${BackgroundLeft})`,
    backgroundSize: 'cover',
  },
  cardContent2: {
    padding: 0, paddingBottom: '0px !important',
  },
  spacer: {
    minHeight: 100,
  },

  subtitle: {
    fontSize: 40,
    marginBottom: 30,
    color: 'rgb(255,255,255,0.9)',   
  },
  pos: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 40,
    color: 'rgb(255,255,255,0.6)', 
  },
  registerButton: {
    textDecoration: 'none',
  }, 
  register: {
    color: '#fff',
    fontSize: 15,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 4,
    border: 2,
    marginTop:40,
  },
  spanColored: {
    fontSize: 80,
    width: '100%',
    position: 'absolute',
    bottom: 0, left: 0,
    height: 200,
    padding: 20,
    opacity: 0.8,

  },
  textSpanColored: {
    textDecoration: 'none',
    color: '#fff',
  },
});

const properties = {
  showArrows:false, showStatus:false, showIndicators:false, showThumbs:false,
  infiniteLoop:true, stopOnHover:false,emulateTouch:true,
  transitionTime: 250, interval:2000, autoPlay: true,
}


class Home extends Component {
  state = {
    email:'',
    firstName:'',
    middleName:'',
    surname:'',
    token:0,
    categories: [],
    viewport: { width: 0, height: 0, },
  };

  componentDidMount () { 
    
    Auth.currentAuthenticatedUser({
        bypassCache: false  
    }).then(user => {
      
      if(this.state.email !== user.attributes.email)
        this.setState({
          email: user.attributes.email
        });
      //this.getUser();
    })
    .catch(err => console.log(err));
    
    let dataURL = "http://blog.looklateral.com/wp-json/wp/v2/platformcategories?_embed"; 
    fetch (dataURL) 
      .then (res => res.json ()) 
      .then (res => { 
        this.setState ({ categories: res }) 
      }) 
    
    if(this.state.viewport.width !== document.documentElement.clientWidth){
      this.setState({
        viewport: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
      });
    }
      
  }

  /*getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
    console.log(response);
    if(response){
      if(response.step1 === true) {
        this.setState({
          url: '/dashboard',
          label: 'Dashboard',
        });

      } else {
        this.setState({
          url: '/register',
          label: 'Register',
        });
      }
    }
  } */
  

  render() {
    console.log('HOME this:\n' + JSON.stringify(JSON.decycle(this))); 
    const { classes } = this.props;
    //const { userstate } = this.state;
    //console.log('Home props.state:\n' + JSON.stringify(this.state));
    

    let categories = this.state.categories.map ((category, index) => {       
      return <div key={index} style={{ height: this.state.viewport.height-260 }}> 
                <img 
                    src={category._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} 
                    height={(this.state.viewport.height -260)}
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

    return (
      <div className={classes.root}>
      
      <Grid container spacing={0}>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent1} style={{ height: this.state.viewport.height-260 }}>

                  <div className={classes.spacer}></div>

                  <Typography className={classes.subtitle}>
                  WELCOME TO THE TOKEN HOLDERS DASHBOARD
                  </Typography>            
                  
                  <Typography className={classes.pos}>
                  TOKENs HOLD: 12569.457<br /><br />
                  LOOK SCORE: 125.69457
                  </Typography>                 
                  
                  <br />

                  <a 
                    href="https://www.looklateral.com/LLWhitePaper.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={classes.registerButton}
                  >
                    <Button className={classes.register}>WHITE PAPER</Button>
                  </a>

                  <div className={classes.spacer}></div>
                  
                </CardContent>
              </Card>
          </Grid>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent2}>
                    
                    <Carousel autoPlay {...properties}>
                      { categories }               
                    </Carousel>
                  
                </CardContent>
              </Card>
          </Grid>
      
      </Grid>
      </div>
    );
  }
}
  
  Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  /*JSON.decycle = function decycle(object, replacer) {
    "use strict";
    var objects = new WeakMap(); 
    return (function derez(value, path) {
        var old_path; var nu; 
        if (replacer !== undefined) { value = replacer(value); }
        if ( typeof value === "object" && value !== null && !(value instanceof Boolean) && !(value instanceof Date)
            && !(value instanceof Number) && !(value instanceof RegExp) && !(value instanceof String) ) {
            old_path = objects.get(value);
            if (old_path !== undefined) { return {$ref: old_path}; }
            objects.set(value, path);
            if (Array.isArray(value)) {
                nu = [];
                value.forEach(function (element, i) { nu[i] = derez(element, path + "[" + i + "]"); });
            } else {
                nu = {};
                Object.keys(value).forEach(function (name) {
                    nu[name] = derez( value[name], path + "[" + JSON.stringify(name) + "]" );
                });
            }
            return nu;
        }
        return value;
    }(object, "$"));
  };
  JSON.retrocycle = function retrocycle($) {
    "use strict";
    var px = /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\(?:[\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*")\])*$/;
    (function rez(value) {
        if (value && typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(function (element, i) {
                    if (typeof element === "object" && element !== null) {
                        var path = element.$ref;
                        if (typeof path === "string" && px.test(path)) value[i] = eval(path);
                        else rez(element);                      
                    }
                });
            } else {
                Object.keys(value).forEach(function (name) {
                    var item = value[name];
                    if (typeof item === "object" && item !== null) {
                        var path = item.$ref;
                        if (typeof path === "string" && px.test(path)) value[name] = eval(path);
                        else rez(item);                     
                    }
                });
            }
        }
    }($));
    return $;
  };*/
  
  export default withStyles(styles)(Home);
  
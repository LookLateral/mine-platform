import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import BackgroundLeft from '../assets/images/image-home-sx.jpg';
import WPContent from '../components/WPcontent';

const styles = {
  root: { flexGrow: 1, marginTop: -150 },
  card: {
    height: 'calc(100% - 150px)',
    overflow: '',
    marginTop: 150, 
    padding: 0,
    textAlign: 'center',
    boxShadow: 'none',
  },
  cardContent1: {
    padding: 0, paddingBottom: '0px !important',
    backgroundImage: `url(${BackgroundLeft})`, backgroundSize: 'cover',
    height: '100%',
  },
  cardContent2: { padding: 0, paddingBottom: '0px !important', height: '100%', },
  spacer: { minHeight: 80, },
  subtitle: {
    fontSize: '2.0em', marginBottom: 30, lineHeight: 1,
    color: 'rgb(255,255,255,0.9)',  
  },
  textNormal: {
    fontSize: '1.5em', marginBottom: 20, fontWeight: 600,
  },
  blu: {
    color: '#0000FF',   
  },
  pos: {
    fontSize: 20, color: 'rgb(255,255,255,0.6)', 
    marginBottom: 10, marginTop: 40, 
  },
  fullBtn: {
    fontSize: '0.8em', marginTop:20,
    borderStyle: 'solid', borderRadius: 4,
    width: 120, padding: 6,
  },
  btnpurple: {
    backgroundColor: 'purple', color: '#fff', opacity: 0.9,
  },
  btnblu: {
    backgroundColor: 'blue', color: '#fff', opacity: 0.9,
  },
  btngreen: {
    backgroundColor: 'green', color: '#fff', opacity: 0.9,
  },
  btnround: {
    borderRadius: 16, width: 150, 
  },
  linkTandC: {
    color: '#bbb5b5',
    textDecoration: 'underline',
    fontStyle: 'italic',
    fontSize: '1.0em',
  },
}

const Home = (props) => {
  
    const { classes } = props;
    const { userState } = props;
    
    //let llToken = userState.llToken ? userState.llToken : 0;
    //let holdingDays = userState.investDate !== false ? Math.floor( (Date.parse(Date('Y-m-d')) - Date.parse(userState.investDate)) / (1000 * 60 * 60 * 24)) : 0;
    //let llScore = llToken * holdingDays; 

    return (  
    
    <div className={classes.root}>
      
      <Grid container spacing={0}>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent1} >
                  
                  <div className={classes.spacer}></div>

                  
                    <Typography className={classes.subtitle}>
                      THE POWER OF ART<br/>FOR EVERYONE
                    </Typography>    

                    <Typography className={classes.textNormal+' '+classes.blu}>
                      Blockchain-Powered Art
                    </Typography>     
                    
                    <div>
                      <Link to="/how-it-works">
                        <Button 
                            className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround} 
                        >How it works</Button>
                      </Link>      
                    </div>
                      
                    {  
                      userState.userLogged === false ? (
                        <div>
                            <Link className={classes.linkAroundBtn} to='/signin'>
                              <Button className={classes.fullBtn+' '+classes.btnpurple}>SIGN IN</Button>
                            </Link>
                            <br />
                            <Link className={classes.linkAroundBtn} to='/signup'>
                              <Button className={classes.fullBtn+' '+classes.btnblu}>SIGN UP</Button>
                            </Link>
                        </div>
                      ) : null 
                    }

                    <div style={{ marginTop: 30}}>
                      <Link to="/terms-conditions" className={classes.linkTandC}>
                        Terms and conditions
                      </Link>
                    </div>
                  
                </CardContent>
              </Card>
          </Grid>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent2}>                  
                  <WPContent userState={userState} />       
                </CardContent>
              </Card>
          </Grid>
      
      </Grid>
      </div>
    )
  }
  
  Home.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(Home);
  
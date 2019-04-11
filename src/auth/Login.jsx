import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BackgroundLeft from '../assets/images/image-home-sx.jpg';
import WPContent from '../components/WPcontent';


const styles = () => ({
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

  cardLogin: {
    width: '70%', height: '70%',
    margin: 'auto',
  },
  spacer: { minHeight: 100, },
  titleLogin: { fontSize: 24, marginTop: 40, },
  textLogin: {fontSize: 20,},
  textSmLogin: {fontSize: 12,},
  linkAroundBtn: { textDecoration: 'none', }, 
  borderedBtn: {
    color: '#fff', fontSize: 15, marginTop:40,
    borderStyle: 'solid', borderColor: '#fff', borderRadius: 4, border: 2,
  },
  fullBtn: {
    color: '#fff', fontSize: 15, marginTop:40,
    borderStyle: 'solid', backgroundColor: 'purple', borderRadius: 4,
  },
  textField: {
    marginLeft: 'auto', marginRight: 'auto',
    width: '60%',
  },
})

const Login = (props) => {
  
    const { classes } = props;
    const { userState } = props;
    const { handleChangeTextField } = props;
    const { handleLoginSubmit } = props;
    const { handleLogout } = props;
    const { handleRenewPassword } = props;
    
    return (  
    
    <div className={classes.root}>
      
      <Grid container spacing={0}>        
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent1} >
                  
                  <div className={classes.spacer}></div>
                    
                  <Card className={classes.cardLogin}>                  

                    <Typography className={classes.titleLogin}>LOG IN</Typography>

                    {
                      userState.userLogged && !userState.needToRenewPsw ? (

                        <div>
                          <Typography className={classes.textLogin}>You're already logged.</Typography>
                          <Button className={classes.fullBtn} onClick={()=>handleLogout()}>LOGOUT</Button>
                        </div>

                      ) : userState.userLogged && userState.needToRenewPsw ? ( 

                        <div>
                          <form
                            className={classes.container}
                            noValidate autoComplete="on"
                          >                       
                            <Typography className={classes.textLogin}>You're still using the temporary password, please change it!</Typography>
                            <TextField
                              placeholder="Password"
                              id="password"
                              label="Password"
                              className={classes.textField}
                              value={userState.pswLogin || ''}
                              onChange={handleChangeTextField("pswToRenew")}
                              margin="normal"
                              type="password"
                            />
                          </form>                            
                          <br/><br/>
                          <Button className={classes.fullBtn} 
                            variant="contained" component="span"
                            onClick={(e)=>handleRenewPassword(e)}
                            >
                          EDIT
                          </Button>
                          
                        </div>           
                      
                      ) : (

                        <div>
                          <form
                            className={classes.container}
                            noValidate autoComplete="on"
                          >                       
                            <TextField
                              required
                              placeholder="Email"
                              id="email"
                              label="Email"
                              className={classes.textField}
                              value={userState.email || ""}
                              onChange={handleChangeTextField("email")}
                              margin="normal"
                            />
                            <TextField
                              placeholder="Password"
                              id="password"
                              label="Password"
                              className={classes.textField}
                              value={userState.pswLogin || ''}
                              onChange={handleChangeTextField("pswLogin")}
                              margin="normal"
                              type="password"
                            />
                          </form>                            
                          <br/><br/>
                          <Button className={classes.fullBtn} 
                            variant="contained" component="span"
                            onClick={(e)=>handleLoginSubmit(e)}
                            >
                          LOG IN
                          </Button>
                          <br /><br />
                          <Typography className={classes.textSmLogin}>Forgot your password?</Typography>
                        </div>                          
                      )
                    }

                  </Card>
                           
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
  
  Login.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(Login);
  
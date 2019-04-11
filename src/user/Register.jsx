import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
//import './FileUpload.css'
import BackgroundLeft from '../assets/images/image-home-sx.jpg';
import WPContent from '../components/WPcontent';


const styles = theme => ({
  root: { flexGrow: 1, marginTop: -150 },
  input: { display: 'none', },
  container: { display: "flex", flexWrap: "wrap" },
  card: {
    height: 'calc(100% - 150px)',
    overflow: '',
    marginTop: 150, 
    padding: 0,
    textAlign: 'center',
    boxShadow: 'none',
  },
  cardContent1: {
    padding: 50, /*paddingBottom: '0px !important',*/
    backgroundImage: `url(${BackgroundLeft})`, backgroundSize: 'cover',
    height: '100%',
  },
  cardContent2: { padding: 0, paddingBottom: '0px !important', height: '100%', },

  internalCard: { 
    backgroundColor: 'white', 
    width: '90%', margin: 'auto',
    paddingTop: 20, paddingBottom: 20, },

  spacer: { minHeight: 100, },
  subtitle: {
    fontSize: 36, marginBottom: 30,
    color: 'rgb(255,255,255,0.9)',   
  },
  pos: {
    fontSize: 20, color: 'rgb(255,255,255,0.6)', 
    marginBottom: 10, marginTop: 40, 
  },
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
    width: '70%',
  },
  Select: {
    marginLeft: 'auto', marginRight: 'auto',
    width: '70%',
  },
  selectOp: {
    marginLeft: 'auto', marginRight: 'auto',
    width: '70%',
    marginTop: theme.spacing.unit*2, marginBottom: theme.spacing.unit
  },
  dense: { marginTop: 19 },
  group:{
    margin: `${theme.spacing.unit}px 0`,
    display: 'flex',
  },
  /*

  container: { display: "flex", flexWrap: "wrap" },
  textField: {
    marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit,
    width: 'calc(100% - 32px)',
  },
  Select: {
    marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit,
    width: 'calc(100% - 32px)',
  },
  selectOp: {
    marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit,
    width: 'calc(100% - 32px)',
    marginTop: theme.spacing.unit*2, marginBottom: theme.spacing.unit
  },
  dense: { marginTop: 19 },
  group:{
    margin: `${theme.spacing.unit}px 0`,
    display: 'flex',
  },
*/
});


const TextFields = (props) => {
  
  const { classes } = props;
  const { userState } = props;
  const { handleChangeTextField } = props;
  const { handleRegistrationSubmit } = props;
  
  return (

    <div className={classes.root}>
      
      <Grid container spacing={0}>
         
          <Grid item xs={12} sm={12} md={6}>
              
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent1} >

                <Card className={classes.internalCard} >
                  
                <h2>Sign Up</h2>
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="on"
                  >
                    <TextField
                      required
                      placeholder="Given Name"
                      id="first-name"
                      label="Given Name"
                      className={classes.textField}
                      value={userState.firstName || ""}
                      onChange={handleChangeTextField("firstName")}
                      margin="normal"
                    />                   
                    <TextField
                      required
                      placeholder="Surname"
                      id="last-name"
                      label="Surname"
                      className={classes.textField}
                      value={userState.lastName || ""}
                      onChange={handleChangeTextField("lastName")}
                      margin="normal"
                    />                                          
                    <TextField
                      required
                      type="email"
                      placeholder="Email"
                      id="email"
                      label="Email"
                      className={classes.textField}
                      value={userState.email || ''}
                      onChange={handleChangeTextField("email")}                    
                      margin="normal"
                    />     
                    <TextField
                      type="password"
                      placeholder="Password"
                      id="pswLogin"
                      label="Password"
                      className={classes.textField}
                      value={userState.pswLogin || ''}
                      onChange={handleChangeTextField("pswLogin")}
                      margin="normal"
                    />                             
                  </form>
                  <Button className={classes.borderedBtn}
                    variant="contained" component="span"
                    onClick={(e)=>handleRegistrationSubmit(e)}
                  >
                    SUBMIT
                  </Button>                   
                
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

  );
}


TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
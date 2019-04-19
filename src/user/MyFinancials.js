import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Button from "@material-ui/core/Button";
//import auth from './../auth/auth-helper'
//import {read} from './api-user.js'
import {Redirect/*, Link*/} from 'react-router-dom'
//import config from './../../config/config'

//import {listByOwner} from '../shop/api-shop.js'
//import {listByShop} from '../product/api-product.js'
//import Fracts from './../fract/Fracts'

//import Wallet from './../lightwallet/src/components/Alert'
import Wallet from './../keys/Alert'

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: '90%',
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  }),
  spacer: { minHeight: 100, clear:'both', },
  smallSpacer: { minHeight: 50, clear:'both', },
  blu: {color: 'blue',},
  fullBtn: {
    fontSize: 12, marginTop:10,
    borderStyle: 'solid', borderRadius: 4,
    width: 120, padding: 5,
  },
  btnblu: {
    backgroundColor: 'blue', color: '#fff', opacity: 0.9,
  },
  btngreen: {
    backgroundColor: 'green', color: '#fff', opacity: 0.9,
  },
  btnFloat: {
    float: 'left', marginLeft: 20,
  },
  boxTopRight: {
    width:300, height:400,
    backgroundColor: 'pink', color: 'black', 
    margin: 'auto', fontSize: 20,
  },
  section: {  },
  sectionContainer: {  },
 
  sectionTitle: {
    color: 'blue', fontSize: 22, marginLeft: 20, marginBottom: 10, fontWeight: 800,  },
  sectionText: {
    fontSize: 20, width: '75%', float: 'left',
  }, 
  divFloat25: {
    float: 'left',
    width: '25%',
  },
  smTitleBlue: {
    color: 'blue',
    fontWeight: 'bold',
  },
  paymentType: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '2.2em',
  },
  inputWallet: {
      float: 'left',
      width: '60%',
      height: 30,
      border: 'none',
      backgroundColor: '#ddd',
      marginRight: '12%',
      paddingLeft: '3%',
      marginTop: 10,
  },
  resumeFinancial: {
      color: 'green',
      fontSize: '1.5em',
      marginLeft: '30px',
  },
  
  // tbl financials
  tdTitle: { color: 'blue',},
  tdRow0: {backgroundColor: '#ddd',},
  tdLeft: { width: '40%',  height:30, paddingLeft:'3%', fontSize: '1.2em', borderRight: '1px solid #bbb',},
  tdRight: { width: '60%',height:30, paddingLeft:'3%', fontSize: '1.2em',},

  // tbl transactions
  tdSmall: {width:10,},
  tdHeader: {fontWeight:'bold',textAlign:'center', border: '1px solid #ddd', padding: '12px 0', fontSize:'1.2em',},
  tdText: {textAlign:'center', border: '1px solid #ddd', padding: '12px 0', fontSize:'1.2em',},
  tdRed: {backgroundColor:'red'},
  tdGreen: {backgroundColor:'green'},
  tdGrey: {backgroundColor:'rgb(0,0,0,0.05)'},

})

class MyFinancials extends Component {
  
    componentDidMount() {
        if (!this.props.userState.userLogged) {
          return <Redirect to='/signin'/>
        }
    }

  render() {
    const {classes} = this.props
    
    return (

      <Paper className={classes.root} elevation={4}>
        
        <div className={classes.section}>         

          <div className={classes.section}>
            <div className={classes.sectionTitle}>FIMART</div>
            <div className={classes.sectionContainer}>
              <div className={classes.sectionText}>Activating Fimart, you will be able to sell and buy artwork's fracts and manage your financials in the <span className={classes.blu}>MY FINANCIALS</span></div>
              <Button className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnFloat}>ACTIVATE NOW</Button>
            </div>
          </div>

          <div className={classes.spacer}></div>
          
          <div className={classes.sectionTitle}>PAYMENT</div>
          
          <div className={classes.sectionContainer}>
            <div className={classes.paymentType +' '+ classes.divFloat25}>VISA</div>
            <div className={classes.code +' '+ classes.divFloat25}>
                <div className={classes.smTitleBlue}>CARD NUMBER</div>
                <div>xxxx xxxx xxxx 3456</div>
            </div>
            <div className={classes.expire +' '+ classes.divFloat25}>
                <div className={classes.smTitleBlue}>EXPIRE DATE</div>
                <div>12 / 18</div>
            </div>
            <div className={classes.btnEdit +' '+ classes.divFloat25}>
                <Button className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnFloat}>EDIT</Button>
            </div>
          </div>
        </div>
     
        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>WALLET</div>
          <div className={classes.sectionContainer}>
            <div className={classes.sectionText}>Add your personal wallet to begin to Buy Art</div>
            
            <Wallet />
            {/*
            <input type='text' id="wallet" className={classes.inputWallet} value="0x18w1BgMUnFQEZjydP52CnhwNGuPwQ7aYN4"/>
            <Button className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnFloat}>EDIT</Button>
            */}
          </div>
        </div>

        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>MY FINANCIALS <span className={classes.resumeFinancial}>+7.8%</span></div>
          <div style={{width:'75%', float:'left'}}>
            <table style={{width:'84%'}}>
            <tbody>
                <tr style={{width:'100%'}}>
                    <td className={classes.tdRow0+' '+classes.tdTitle+' '+classes.tdLeft}>N° Artworks</td>
                    <td className={classes.tdRow0+' '+classes.tdTitle+' '+classes.tdRight}>5</td>
                </tr>
                <tr style={{width:'100%'}}>
                    <td className={classes.tdRow1+' '+classes.tdLeft}>Total USD value</td>
                    <td className={classes.tdRow1+' '+classes.tdRight}>36784.65</td>
                </tr>
                <tr style={{width:'100%'}}>
                    <td className={classes.tdRow0+' '+classes.tdLeft}>Total Loyalty Points</td>
                    <td className={classes.tdRow0+' '+classes.tdRight}>19250.98256</td>
                </tr>
            </tbody>
            </table>
          </div>
          <div style={{width:'17%', float:'left'}}>
            <Button className={classes.fullBtn+' '+classes.btnblu} style={{marginLeft: 20}}>BUY LP</Button>
          </div>

        </div>

        <div className={classes.smallSpacer}></div>

        {/* SIMONOTES: 
        need to make this Fracts instead of products.
        Products are artworks listed in MyArt, i'm the owner and can add provenance etc etc
        in fract there will be 2 buttons: sell fracts you own, buy available fracts */}
        
        {/* <Fracts products={this.state.products} searched={false}/> */}

        fracts list here

        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>TRANSACTIONS HISTORY</div>
          
          <div style={{width:'100%', float:'left'}}>
            <table style={{width:'100%'}}>
            <tbody>
            <tr style={{width:'100%'}}>
                    <td className={classes.tdSmall}></td>
                    <td className={classes.tdHeader}>USD</td>
                    <td className={classes.tdHeader}>LOOKS</td>
                    <td className={classes.tdHeader}>Date</td>
                    <td className={classes.tdHeader}>Type</td>
                    <td className={classes.tdHeader}>Title Artwork</td>
                </tr>
                <tr style={{width:'100%'}}>
                    <td className={classes.tdSmall+' '+classes.tdRed}></td>
                    <td className={classes.tdText}>226.14</td>
                    <td className={classes.tdText}>2446.10801</td>
                    <td className={classes.tdText}>12 Mar</td>
                    <td className={classes.tdText}>2% Fraction</td>
                    <td className={classes.tdText}>
                      <div>Lewitt Sol</div>
                      <div>Complex forms</div>
                    </td>
                </tr>
                <tr style={{width:'100%'}}>
                    <td className={classes.tdSmall+' '+classes.tdGreen}></td>
                    <td className={classes.tdText+' '+classes.tdGrey}>558.44</td>
                    <td className={classes.tdText+' '+classes.tdGrey}>60941.38114</td>
                    <td className={classes.tdText+' '+classes.tdGrey}>12 Feb</td>
                    <td className={classes.tdText+' '+classes.tdGrey}>5% Fraction</td>
                    <td className={classes.tdText+' '+classes.tdGrey}>
                      <div>Lewitt Sol</div>
                      <div>Complex forms</div>
                    </td>
                </tr>
                <tr style={{width:'100%'}}>
                    <td className={classes.tdSmall+' '+classes.tdGreen}></td>
                    <td className={classes.tdText+' '+classes.tdGrey}>3764.25</td>
                    <td className={classes.tdText+' '+classes.tdGrey}>29159.36447</td>
                    <td className={classes.tdText+' '+classes.tdGrey}>3 Feb</td>
                    <td className={classes.tdText+' '+classes.tdGrey}>27% Fraction</td>
                    <td className={classes.tdText+' '+classes.tdGrey}>
                      <div>Lewitt Sol</div>
                      <div>Complex forms</div>
                    </td>
                </tr>
            </tbody>
            </table>
          </div>

        </div>

        <div className={classes.spacer}></div>

      </Paper>
      
    )
  }
}
MyFinancials.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MyFinancials)

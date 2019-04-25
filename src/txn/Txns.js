import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
//import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
//import {Link} from 'react-router-dom'
//import AddToCart from './../cart/AddToCart'
//import Grid from '@material-ui/core/Grid'
//import Button from '@material-ui/core/Button'
//import fractPic from '../assets/images/fractPic.png';
//import fractPic2 from '../assets/images/fractPic2.png';
//import fractIncrease from '../assets/images/increase.png';
//import fractDecrease from '../assets/images/decrease.png';
//import EmptyPic from '../assets/images/empty-pic.jpg';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    textAlign: 'left',
    padding: '0 8px'
  },
  container: {
    minWidth: '100%',
    paddingBottom: '14px'
  },
  subheading: {
    height: '100%',
    display: 'inline-block',
  },
  divider: {
    width: '80%',
    height: 1,
    borderBottom: '1px solid #fff',
    margin: '20px auto',
  },
  tdSmall: {width:10,},
  tdHeader: {fontWeight:'bold',textAlign:'center', border: '1px solid #ddd', padding: '12px 0', fontSize:'1.2em',},
  tdText: {textAlign:'center', border: '1px solid #ddd', padding: '12px 0', fontSize:'1.2em',},
  tdRed: {backgroundColor:'red'},
  tdGreen: {backgroundColor:'green'},
  tdYellow: {backgroundColor:'yellow'},
  tdPurple: {backgroundColor:'purple'},
  tdGrey: {backgroundColor:'rgb(0,0,0,0.05)'},
  
})

class Txns extends Component {
  render() {
    const {classes, userState} = this.props

      return (
        <div className={classes.root}>
        {this.props.txns.length > 0 ?
          (<div className={classes.container}>
            <div style={{width:'100%', float:'left'}}>
            <table style={{width:'100%'}}>
            <tbody>
            <tr style={{width:'100%'}}>
                    <td className={classes.tdSmall}></td>
                    <td className={classes.tdHeader}>Type</td>
                    <td className={classes.tdHeader}>Date</td>
                    <td className={classes.tdHeader}>Artwork</td>
                    <td className={classes.tdHeader}>%</td>
                    <td className={classes.tdHeader}>USD</td>
                    <td className={classes.tdHeader}>LOOKS</td>
                </tr>
                  {this.props.txns.map((txn, i) => (
                   
                   <tr style={{width:'100%'}}>
                        <td className={ 
                                txn.operation ===  'Uploaded' ? classes.tdSmall+' '+classes.tdYellow
                                : 
                                txn.operation ===  'Tokenization' ? classes.tdSmall+' '+classes.tdPurple
                                :
                                txn.giverUserId === userState.userId ? classes.tdSmall+' '+classes.tdGreen 
                                : 
                                txn.receiverUserId === userState.userId ? classes.tdSmall+' '+classes.tdRed 
                                : 
                                classes.tdSmall}></td>
                        
                        <td className={classes.tdText}>{txn.operation}</td>
                        <td className={classes.tdText}>{txn.date}</td>
                        <td className={classes.tdText}>
                            <div>{txn.name}</div>
                            <div>{txn.artist}</div>
                        </td>
                        <td className={classes.tdText}>{txn.percOwned}</td>
                        <td className={classes.tdText}></td>
                        <td className={classes.tdText}></td>
                    </tr> 

                  ))}
            </tbody>
            </table>
          </div>  
        </div>) : this.props.searched && (<Typography type="subheading" component="h4" className={classes.title}>No Transactions found! :(</Typography>)}
        </div>
      )
  }
}
Txns.propTypes = {
  classes: PropTypes.object.isRequired,
  txns: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired
}

export default withStyles(styles)(Txns)

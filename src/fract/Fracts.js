import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
//import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import {Link} from 'react-router-dom'
//import AddToCart from './../cart/AddToCart'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
//import fractPic from '../assets/images/fractPic.png';
import fractPic2 from '../assets/images/fractPic2.png';
import fractIncrease from '../assets/images/increase.png';
import fractDecrease from '../assets/images/decrease.png';
import EmptyPic from '../assets/images/empty-pic.jpg';

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
  boxDetail: {
    float: 'left',
    padding: '1px 0px',
    height: 200,
    //display:'flex',
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  boxCenter: {
    border: '1px solid #ddd',
    width: '100%',
    textAlign: 'center',
    padding: 24,
  },
  boxRight: {
    border: '1px solid #ddd',
    width: '100%',
    textAlign: 'left',
    padding: 24,
  },
  image: {
    minHeight: 200,
    display: 'inline-block',
    width: '300px',
    marginLeft: '24px'
  },
  imgCover: {
    color:'white', backgroundColor: 'rgb(128,0,128,0.5)', zIndex:100, position: 'absolute',
    height: 200,
    width: '50%',
    top: 0, left: 0,
  },
  percCover: {
    paddingTop: 50, paddingLeft: 20, fontSize: '2.0em', fontWeight: 'bold',
  },
  textCover: {padding: '0 20px', fontSize: '1.2em', textTransform:'uppercase', lineHeight:1, opacity:0.8},


  artworkRow: {
    clear: 'both',
  },
  boxInfoArtwork:{
    //height: 200,
  },
  subheading: {
    //color: theme.palette.openTitle,
    height: '100%',
    display: 'inline-block',
    //width: '50%',
    //textAlign: 'center',
    //color: 'white',
  },
  divider: {
    width: '80%',
    height: 1,
    borderBottom: '1px solid #fff',
    margin: '20px auto',
  },
  title: {
    fontWeight: 800,
    marginTop: 5,
    fontSize: '1.8em',
  },
  artist: {
    fontSize: '1.3em',
  },
  price: {
    fontSize: '1.3em',
    //marginTop: 5,
    color:'#cdcdcd'// !important',
  },
  fractValue: {
    color:'black',
    fontSize: '2.0em',
    marginBottom:5,
  },
  fractPic: {
    width: 32,
    height: 32,
    marginRight: 5,
    float: 'left',
  },
  fractPerc: {
    fontSize: '3.0em',
    color: 'blue',
    marginRight: 15,
    fontWeight: 'bold',
  },
  fractText: {
    fontSize: '1.0em',
  },
  fractIncrease: {
    color:'green', fontSize: '1.1em',
  },
  fractDecrease: {
    color:'red', fontSize: '1.1em',
  },
  fractGraph: {
    width:90,
    margin: '0 auto',
    marginTop: 10,
  },
  fullBtn: {
    fontSize: 12, marginRight:5,
    borderStyle: 'solid', borderRadius: 16,
    width: 90, padding: 0,
    float: 'left',
  },
  btnblu: {
    backgroundColor: 'blue', color: '#fff', opacity: 0.9,
  },
  btngreen: {
    backgroundColor: 'green', color: '#fff', opacity: 0.9,
  },
  /*gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px'
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    width: '100%'
  },
  tile: {
    textAlign: 'center'
  },
  image: {
    height: '100%'
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left'
  },
  tileTitle: {
    fontSize:'1.1em',
    marginBottom:'5px',
    color:'rgb(189, 222, 219)',
    display:'block'
  }*/
})

class Fracts extends Component {
  render() {
    const {classes, userState} = this.props
    /*return (
      <div className={classes.root}>
      {this.props.products.length > 0 ?
        (<div className={classes.container}>
          <GridList cellHeight={200} className={classes.gridList} cols={3}>
          {this.props.products.map((product, i) => (
            <GridListTile key={i} className={classes.tile}>
              <Link to={"/product/"+product._id}><img className={classes.image} src={'/api/product/image/'+product._id} alt={product.name} /></Link>
              <GridListTileBar className={classes.tileBar}
                title={<Link to={"/product/"+product._id} className={classes.tileTitle}>{product.name}</Link>}
                subtitle={<span>$ {product.price}</span>}
                //actionIcon={
                  //<AddToCart item={product}/>
                //}
              />
            </GridListTile>
          ))}
        </GridList></div>) : this.props.searched && (<Typography type="subheading" component="h4" className={classes.title}>No products found! :(</Typography>)}
      </div>)*/
      
      return (
        <div className={classes.root}>
        {this.props.fracts.length > 0 ?
          (<div className={classes.container}>
            <Grid container spacing={40}>
              <Grid item xs={12} sm={12}>
                  {this.props.fracts.map((fract, i) => (
                    <div className={classes.artworkRow} key={i}> 
                      <Grid item xs={4} sm={4} className={classes.boxDetail + ' ' + classes.boxLeft} style={{position: 'relative'}}>
                        {/* SIMONOTES: need to make the img verticalAlign:middle */}
                        <Link to={"/product/"+fract.artworkId}><img className={classes.image} src={/*'/api/product/image/'+product._id*/EmptyPic} alt={fract.artworkId} /></Link> 
                        { userState.userId === fract.ownerId ? (
                            <div className={classes.imgCover}>
                            <div className={classes.percCover}>{fract.percOwned}%</div>
                            <div className={classes.textCover}>fracts that you own</div>
                        </div>
                        ) : null }
                      </Grid>
                      
                      <Grid item xs={5} sm={5} className={classes.boxDetail + ' ' + classes.boxCenter}>
                        <div className={classes.boxInfoArtwork}>
                          <div className={classes.subheading}>
                            
                            {/* SIMONOTES: static html */}
                            <div className={classes.artist}>{fract.artist}</div>
                            <div className={classes.title}>{fract.name}</div>
                            
                            <div className={classes.divider}></div>

                            { fract.percOwned > 0 && fract.percToKeep < fract.percOwned ? (
                            
                                <div style={{marginBottom: '20px'}}>
                                <div>{(fract.percOwned-fract.percToKeep)+'% on sale'}</div>  
                                <div className={classes.fractPic}><img src={fractPic2} alt="Sell"/></div>
                                <Link to={"/"}>
                                    <Button className={classes.fullBtn+' '+classes.btnblu}>SELL</Button>
                                </Link>
                                </div>  
                            ) : parseInt(fract.percToKeep) === fract.percOwned ? (
                            
                                <div style={{marginBottom: '20px'}}>Not for sale!</div>  
                            
                            ) : fract.percOwned < 100 && 1 !== 2 /* need to check if fracts are for buy! */ ? (
                                
                                <div style={{marginBottom: '20px'}}>
                                    
                                    <div className={classes.fractPic}><img src={fractPic2} alt="Reserve or Sell"/></div>
                                    <Link to={"/"}>
                                        <Button className={classes.fullBtn+' '+classes.btngreen}>RESERVE</Button>
                                    </Link>
                                    <Link to={"/"}>
                                        <Button className={classes.fullBtn+' '+classes.btnblu}>SELL</Button>
                                    </Link>
                                </div>
                            ) : null }
                          </div>
                        </div>  
                      </Grid>
                      <Grid item xs={3} sm={3} className={classes.boxDetail + ' ' + classes.boxRight}>
                        <div className={classes.boxInfoArtwork}>
                          <div className={classes.subheading}>
                            <div className={classes.price}>Market value</div>
                            <div className={classes.fractValue}>${fract.value || ' #####'}</div> 
                            { i % 3 === 0 || i === 0 ? (
                              <div>
                                <div className={classes.fractIncrease}>+13.8%</div>
                                <div className={classes.fractGraph}><img src={fractIncrease} style={{width:'130%'}}  alt="Increased!!"/></div>
                              </div>
                            ) : (
                              <div>
                                <div className={classes.fractDecrease}>-24.3%</div>
                                <div className={classes.fractGraph}><img src={fractDecrease} style={{width:'130%'}}  alt="Decreased!!"/></div>
                              </div>
                            )}

                          </div>
                        </div>  
                      </Grid>
                    </div>
                  ))}
              </Grid>
            </Grid>
          </div>) : this.props.searched && (<Typography type="subheading" component="h4" className={classes.title}>No Fracts found! :(</Typography>)}
        </div>
      )
  }
}
Fracts.propTypes = {
  classes: PropTypes.object.isRequired,
  fracts: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired
}

export default withStyles(styles)(Fracts)

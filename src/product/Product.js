import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import {Link, Redirect} from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

//import {read, listRelated} from './api-product.js'
//import Suggestions from './../product/Suggestions'
//import AddToCart from './../cart/AddToCart'

import BackgroundLeft from '../assets/images/image-home-sx.jpg';
import fractPic from '../assets/images/fractPic.png';


const styles = theme => ({
  root: {
    flexGrow: 1,
    //margin: 30,
    margin: '20px 20px 0px 0px',
  },
  flex:{
    display:'flex'
  },
  noPaddingGrid: {
    padding: '0px !important',
  },
  card: {
    //padding:'24px 40px 40px'
    padding:'0px 0px 40px'
  },
  card2:{
    padding:'24px 40px 40px',
    backgroundColor: '#efefef',
    textAlign: 'center',
  },
  subheading: {
    backgroundImage: `url(${BackgroundLeft})`, backgroundSize: 'cover',
    height: 400,
    display: 'inline-block',
    width: '50%',
    textAlign: 'center',
    color: 'white',
  },
  divider: {
    width: '80%',
    height: 1,
    borderBottom: '1px solid #fff',
    margin: '20px auto',
  },
  dividerGrey: {
    width: '80%',
    height: 1,
    borderBottom: '1px solid #222',
    margin: '20px auto',
  },
  title: {
    fontWeight: 800,
    marginTop: 20,
    fontSize: '1.8em',
  },
  artist: {
    marginTop: 50,
    fontSize: '1.3em',
  },
  price: {
    fontSize: '1.3em',
    marginTop: 20,
  },
  fractPic: {
    width: 32,
    height: 32,
    marginRight: 5,
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
  fullBtn: {
    fontSize: 15,
    borderStyle: 'solid', borderRadius: 4,
    width: 150, padding: 10,
  },
  btnorange: {
    backgroundColor: 'orange', color: '#fff', opacity: 0.9,
  },
  btngreen: {
    backgroundColor: 'green', color: '#fff', opacity: 0.9,
  },
  btnblu: {
    backgroundColor: 'blue', color: '#fff', opacity: 0.9,
  },
  btnround: {
    borderRadius: 16,
  },
  boxDetail: {
    float: 'left',
    padding: 20,
  },
  boxLeft: {
    borderRight: '1px solid blue',
  },
  titleInfo: {
    fontSize: '1.8em',
    color: 'blue',
    marginBottom: 10,
  },
  textInfo: {
    fontSize: '1.3em',
  },
  linkTutorial: {
    color: 'black',
    marginTop: 20,
    fontSize: '1.3em',
  },
  media: {
    height: 400,
    display: 'inline-block',
    width: '50%',
    //marginLeft: '24px'
  },
/*icon: {
    verticalAlign: 'sub'
  },
link:{
    color: '#3e4c54b3',
    fontSize: '0.9em'
  },
  addCart: {
    width: '35px',
    height: '35px',
    padding: '10px 12px',
    borderRadius: '0.25em',
    backgroundColor: '#5f7c8b'
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  }*/
})

class Product extends Component {
  constructor({match}) {
    super()
    this.state = {
      product: {shop: {}},
      suggestions: [],
      suggestionTitle: 'Related Products'
    }
    this.match = match
  }
  /*loadProduct = (productId) => {
    read({productId: productId}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({product: data})
        listRelated({
          productId: data._id}).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            this.setState({suggestions: data})
          }
        })
     }
    })
  }*/
  componentDidMount = () => {
    if (!this.props.userState.userLogged) {
        return <Redirect to='/signin'/>
      }
    
    //this.loadProduct(this.match.params.productId)
  }
  componentWillReceiveProps = (props) => {
    //this.loadProduct(props.match.params.productId)
  }

  render() {
    /*const imageUrl = this.state.product._id
          ? `/api/product/image/${this.state.product._id}?${new Date().getTime()}`
          : '/api/product/defaultphoto'*/
    const imageUrl = ""
    const {classes} = this.props
    return (
        <div className={classes.root}>
          <Grid container spacing={40} className={classes.noPaddingGrid}>
            <Grid item xs={12} sm={12} className={classes.noPaddingGrid}>
              <Card className={classes.card}>
               
                <div className={classes.flex}>
                  <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title={this.state.product.name}
                  />
                  <Typography component="p" type="subheading" className={classes.subheading}>
                    <div className={classes.artist}>Artist Name</div><br/>
                    <div className={classes.title}>{/*this.state.product.name*/}Artwork name</div><br/>
                    <div className={classes.price}>Estimate: $ {/*this.state.product.price*/}428,000.00</div>
                    <div className={classes.divider}></div>
                    <div style={{marginBottom: '20px'}}>
                      <span className={classes.fractPic}><img src={fractPic} alt="0%" /></span>
                      <span className={classes.fractPerc}>0%</span>
                      <span className={classes.fractText}>FRACT ON SALE</span>
                    </div>

                    {/* SIMONOTE: this button only if user=owner*/}
                    <Link to={"/product/123456/edit"}>
                      <Button 
                          className={classes.fullBtn+' '+classes.btnorange+' '+classes.btnround} 
                      >Edit Artwork</Button>
                    </Link>
                    
                    {/* SIMONOTE: otherwise this button must be show
                    <Link to={?????}>
                      <Button 
                          className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround} 
                      >Reserve</Button>
                    </Link>*/}

                  </Typography>
                  

                </div>
                  <CardContent>
                    <Grid item xs={7} sm={7} className={classes.boxDetail +' '+ classes.boxLeft}>
                      <div className={classes.titleInfo}>Artwork details</div>
                      <div className={classes.textInfo}>
                        <span style={{fontWeight:'bold'}}>Size: </span> 192 by 83 by 33 cm.{/* SIMONOTE: html static */}
                      </div>
                      <div className={classes.textInfo}>
                        <span style={{fontWeight:'bold'}}>Markings: </span> signed and numbered by David Lachapelle on verso.{/* SIMONOTE: html static */}
                      </div>
                      <div className={classes.textInfo}>
                        <span style={{fontWeight:'bold'}}>Description: </span> {this.state.product.description}
                      </div>  
                    </Grid>

                    <Grid item xs={5} sm={5} className={classes.boxDetail}>
                      <div className={classes.titleInfo}>Bio</div>{/* SIMONOTE: missing */}
                    </Grid>
                  </CardContent>

                  {/* SIMONOTE: provenance, news and documents are missing*/}

              </Card>
            </Grid>
            {/* SIMONOTE: do we keep suggestions? not in owner view, what in simple user view? */}
            {/*this.state.suggestions.length > 0 &&
              (<Grid item xs={5} sm={5}>
                <Suggestions  products={this.state.suggestions} title='Related Products'/>
              </Grid>)*/}
          </Grid>

          <Grid container spacing={40} className={classes.noPaddingGrid}>
            <Grid item xs={12} sm={12} className={classes.noPaddingGrid}>
              <Card className={classes.card2}> 
              
                 {/* SIMONOTE: these buttons only if user=owner; also what path?? and they are visible if the owner didn't request that */}
                 <div style={{marginTop:20}}>
                   <Link to={"/"}>{/* SIMONOTE: missing link */}

                    <Button 
                        className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround}>Ask TAG</Button>
                    </Link>
                  </div>
                  <div style={{marginTop:10}}>
                   <Link to={"/"} className={classes.linkTutorial}>{/* SIMONOTE: missing link */}
                    <span style={{fontWeight:'bold'}}>Ask TAG:</span> click here for the how-to
                    </Link>
                  </div>
                  <div className={classes.dividerGrey}></div>
                  <div style={{marginTop:34}}>
                    <Link to={"/product/123456/tokenize" /* + this.state.product._id + "/tokenize" */ }>
                      <Button 
                        className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnround}>TOKENIZE</Button>
                    </Link>
                  </div>
                  <div style={{marginTop:10}}>
                   <Link to={"/"} className={classes.linkTutorial}>{/* SIMONOTE: missing link */}
                    <span style={{fontWeight:'bold'}}>TOKENIZE:</span> click here for the how-to
                    </Link>
                  </div>
              </Card>
            </Grid>
          </Grid>
        </div>)
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Product)

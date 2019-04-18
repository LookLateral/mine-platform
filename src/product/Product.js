import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import {Link, Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'
import { API } from 'aws-amplify';
//import {read, listRelated} from './api-product.js'
//import Suggestions from './../product/Suggestions'
//import AddToCart from './../cart/AddToCart'
import BackgroundLeft from '../assets/images/image-home-sx.jpg';
import fractPic from '../assets/images/fractPic.png';
import EmptyPic from '../assets/images/empty-pic.jpg';


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
    minWidth: '50%'
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
      id: null,
      userId: null,
      name: null,
      artist: null,
      description: null,
      images: [],
      category: null,
      price: 0,
      dimensions: null,
      year: null,
      location: null,

      creationDate: null,
      reqTokenizationDate: null,
      tokenizationDate: null,
      
      viewable: false,
      tagged: false,
      reqTokenization: false,
      tokenized: false,
      onSale: false,
      buyback: false,

      suggestions: [],
      suggestionTitle: 'Related Products'
    }
    this.match = match
    this.loadProduct = this.loadProduct.bind(this)
  }
  
  loadProduct = async (productId) => {
    const data = await API.get('artworksAPI', '/artworks/' + productId);
    if (data.error) {
      this.setState({ error: data.error })
      console.log('error loading artwork:\n' + JSON.stringify(data.error))
    } else {
      this.setState({ 
        id: data[0].id,
        userId: data[0].userId,
        name: data[0].name,
        artist: data[0].artist,
        description: data[0].description,
        images: [],
        category: data[0].category,
        price: data[0].price,
        dimensions: data[0].dimensions,
        year: data[0].year,
        location: data[0].location,

        creationDate: data[0].creationDate,
        reqTokenizationDate: data[0].reqTokenizationDate,
        tokenizationDate: data[0].tokenizationDate,
           
        viewable: data[0].viewable,
        tagged: data[0].tagged,
        reqTokenization: data[0].reqTokenization,
        tokenized: data[0].tokenized,
        onSale: data[0].onSale,
        buyback: data[0].buyback 
      })
    }
  }

  componentDidMount = () => {
    if (!this.props.userState.userLogged) {
        return <Redirect to='/signin'/>
    }
    //this.loadProduct(this.match.params.productId)
    //this.forceUpdate()
    this.props.handleForceReload()
  }

  componentWillReceiveProps = (props) => {
    this.loadProduct(props.match.params.productId)
  }

  render() {
    /*const imageUrl = this.state.product._id
          ? `/api/product/image/${this.state.product._id}?${new Date().getTime()}`
          : '/api/product/defaultphoto'*/
    const imageUrl = EmptyPic // ZUNOTE: need to fix
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
                    title={this.state.name}
                  />
                  <div type="subheading" className={classes.subheading}>
                    <div className={classes.artist}>{this.state.artist}</div><br/>
                    <div className={classes.title}>{this.state.name}</div><br/>
                    { this.state.price >0 && (
                      <div className={classes.price}>Estimate: $ {this.state.price}</div>
                    )}
                    <div className={classes.divider}></div>
                    <div style={{marginBottom: '20px'}}>
                      <span className={classes.fractPic}><img src={fractPic} alt="0%" /></span>
                      <span className={classes.fractPerc}>0%</span> { /* ZUNOTE: if tokenized and onSale -> check for get fracts by atrkorkId! */ }
                      <span className={classes.fractText}>FRACT ON SALE</span>
                    </div>

                    {  //ZUNOTE: only owner can see
                      this.state.userId === this.props.userState.userId ? (
                      <Link to={"/product/" + this.state.id + "/edit"}>
                        <Button 
                            className={classes.fullBtn+' '+classes.btnorange+' '+classes.btnround} 
                        >Edit Artwork</Button>
                      </Link>
                    ) : (  //ZUNOTE: not owner - missing link
                      <Link to={'?????'}>
                        <Button 
                          className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround} 
                        >Reserve</Button>
                      </Link>
                    )}
                                      
                  </div>                
                </div>

                  <CardContent>
                    <Grid item xs={7} sm={7} className={classes.boxDetail +' '+ classes.boxLeft}>
                      <div className={classes.titleInfo}>Artwork details</div>
                      { /*this.state.dimensions &&*/ (
                        <div className={classes.textInfo}>
                          <span style={{fontWeight:'bold'}}>Dimensions: </span> {this.state.dimensions}
                        </div>
                      )}
                      { /*this.state.year &&*/ (
                        <div className={classes.textInfo}>
                          <span style={{fontWeight:'bold'}}>Year: </span> {this.state.year}
                        </div>
                      )}
                      { /*this.state.location &&*/ (
                        <div className={classes.textInfo}>
                          <span style={{fontWeight:'bold'}}>Location: </span> {this.state.location}
                        </div>
                      )}
                      { /*this.state.description &&*/ (
                        <div className={classes.textInfo}>
                          <span style={{fontWeight:'bold'}}>Description: </span> {this.state.description}
                        </div>  
                      )}
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
          
          { this.state.userId === this.props.userState.userId ? (
              <Grid container spacing={40} className={classes.noPaddingGrid}>
                <Grid item xs={12} sm={12} className={classes.noPaddingGrid}>
                  <Card className={classes.card2}> 
                  
                    {/* SIMONOTE: these buttons only if user=owner; also what path?? and they are visible if the owner didn't request that */}
                    <div style={{marginTop:20}}>
                      <Link to={"/"}>{/* SIMONOTE: missing link, add popup: "Tag requested!" */}
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
                        <Link to={"/product/" + this.state.id + "/tokenize" }>
                          <Button 
                            className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnround}>TOKENIZE</Button>
                        </Link>
                      </div>
                      <div style={{marginTop:10}}>
                      <Link to={"/"} className={classes.linkTutorial}>{/* SIMONOTE: missing link, add popup: "Tokenization requested!" */}
                        <span style={{fontWeight:'bold'}}>TOKENIZE:</span> click here for the how-to
                        </Link>
                      </div>
                  </Card>
                </Grid>
              </Grid>
            ) : null          
          }     
        </div>)

      
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Product)

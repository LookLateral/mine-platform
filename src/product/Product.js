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
import { initTokanization } from './../bigchain/TokenizeArtwork'


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
  adminDivider: {
    width: '80%',
    margin: '80px auto',
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
      tokenizationId: null,
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
      viewable: false,

      reqTag: false,
      reqTagDate: null,
      tagSent: false,
      tagSentDate: false,
      reqVal: false,
      reqValDate: null,
      tagged: false,
      tagDate: null,

      reqTokenization: false,
      reqTokenizationDate: null,
      tokenqty: 1000000, //const
      tokenKept: 0, //% to keep
      tokenForSale: 0, //% to sell
      tokenName: null, //
      tokenSuggestedValue: null,
      tokenValue: null,
      tokenized: false, // = onSale
      tokenizationDate: null,
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
        tokenizationId: data[0].tokenizationId,
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
        viewable: data[0].viewable,

        reqTag: data[0].reqTag || false,
        reqTagDate: data[0].reqTagDate || null,
        tagSent: data[0].tagSent || false,
        tagSentDate: data[0].tagSentDate || null,
        reqVal: data[0].reqVal || false,
        reqValDate: data[0].reqValDate || null,
        tagged: data[0].tagged || false,
        tagDate: data[0].tagDate || null,

        reqTokenization: data[0].reqTokenization || false,
        reqTokenizationDate: data[0].reqTokenizationDate || null,
        tokenqty: data[0].tokenqty || 1000000,
        tokenKept: data[0].tokenKept || 0, 
        tokenForSale: data[0].tokenForSale || null,
        tokenName: data[0].tokenName || null, 
        tokenSuggestedValue: data[0].tokenSuggestedValue || null,
        tokenValue: data[0].tokenValue || null,
        tokenized: data[0].tokenized || false,
        tokenizationDate: data[0].tokenizationDate || null,
        buyback: data[0].buyback || false  
      })
    }
  }
  handleReqTag = (e) => {
    e.preventDefault()
    this.setState({ reqTag: true, reqTagDate: Date('Y-m-d') },  
    function() { this.updateProduct() })
  }
  handleTagSent = (e) => {
    e.preventDefault()
    this.setState({ tagSent: true, tagSentDate: Date('Y-m-d') },  
    function() { this.updateProduct() })
  }
  handleReqVal = (e) => {
    e.preventDefault()
    this.setState({ reqVal: true, reqValDate: Date('Y-m-d') },  
    function() { this.updateProduct() })
  }
  handleTagged = (e) => {
    e.preventDefault()
    this.setState({ tagged: true, taggedDate: Date('Y-m-d') },  
    function() { this.updateProduct() })
  }
  
  handleTokenized = (e) => {
    e.preventDefault()

    let tokenDetails = {
      artworkId: this.state.id,
      owner: this.state.userId,
      tokenqty: this.state.tokenqty,
      tokenKept: this.state.tokenKept,
      tokenName: this.state.tokenName,
      tokenSuggestedValue: this.state.tokenSuggestedValue,
      tokenValue: this.state.tokenValue,
      buyback: this.state.buyback,
      //name: this.state.name,
      //artist: this.state.artist,
      //year: this.state.year,    
      //location: this.state.location,
    }

    const txnTokenArtwork = initTokanization(tokenDetails/*, tokenMetadata*/)

    this.setState({ tokenizationId: txnTokenArtwork, tokenized: true, tokenizedDate: Date('Y-m-d') },  
    function() { 
      this.createTransaction();
    })
  }

  createTransaction = async () => {            
    const data = await API.post('txnAPI', '/txns/', {
      body: {
        id: this.state.tokenizationId, 
        artworkId: this.state.id,
        tokenizationId: this.state.tokenizationId,
        giverUserId: null,
        receiverUserId: this.state.userId,
        amount: this.state.tokenqty,
        operation: 'Tokenization',
        name: this.state.name,
        artist: this.state.artist,
        value_usd: null,
        value_look: null,
        percOwned: 100,
        percToKeep: parseInt(this.state.tokenKept),
        date: Date('Y-m-d')
      }
    });
    if (data.error) {
      this.setState({error: data.error})
      console.log("Error in Txn creation for tokenization:\n" + JSON.stringify(data.error));
    } else {
      console.log("Txn creation response for tokenization:\n" + JSON.stringify(data));
      this.createFract();
    }
  }

  createFract = async () => {          
    const data = await API.post('fractAPI', '/fracts/', {
      body: {
        id: this.state.tokenizationId, 
        artworkId: this.state.id,
        tokenizationId: this.state.tokenizationId,
        ownerId: this.state.userId,
        amount: this.state.tokenqty,
        percOwned: 100,
        percToKeep: this.state.tokenKept, //for future.. if tokeep > owned -> means it is in wishlist, he want to buy
        name: this.state.name,
        artist: this.state.artist,
        value_usd: null, //values?
        value_look: null,      
        date: Date('Y-m-d')
      }
    });
    if (data.error) {
      this.setState({error: data.error})
      console.log("Error in Txn creation for tokenization:\n" + JSON.stringify(data.error));
    } else {
      console.log("Txn creation response for tokenization:\n" + JSON.stringify(data));
      this.updateProduct();
    }
  }

  updateProduct = async () => {
      const data = await API.post('artworksAPI', '/artworks/', {
        body: {
          id: this.state.id,
          userId: this.state.userId,
          tokenizationId: this.state.tokenizationId,
          name: this.state.name,
          artist: this.state.artist,
          description: this.state.description,
          images: [],
          category: this.state.category,
          price: this.state.price,
          dimensions: this.state.dimensions,
          year: this.state.year,
          location: this.state.location,

          creationDate: this.state.creationDate,
          viewable: this.state.viewable,
          
          reqTag: this.state.reqTag,
          reqTagDate: this.state.reqTagDate,
          tagSent: this.state.tagSent,
          tagSentDate: this.state.tagSentDate,
          reqVal: this.state.reqVal,
          reqValDate: this.state.reqValDate,
          tagged: this.state.tagged,
          tagDate: this.state.tagDate,

          reqTokenization: this.state.reqTokenization,
          reqTokenizationDate: this.state.reqTokenizationDate,
          tokenqty: this.state.tokenqty,
          tokenKept: this.state.tokenKept, 
          tokenForSale: this.state.tokenForSale,
          tokenName: this.state.tokenName, 
          tokenSuggestedValue: this.state.tokenSuggestedValue,
          tokenValue: this.state.tokenValue,
          tokenized: this.state.tokenized,
          tokenizationDate: this.state.tokenizationDate,
          buyback: this.state.buyback            
        }
      });      
      if (data.error) {
        this.setState({error: data.error})
      } else {

        console.log("Artwork administration response:\n" + JSON.stringify(data));
        console.log("Artwork administration state:\n" + JSON.stringify(this.state));
        this.setState({error: '', redirect: true})
      } 
  }

  componentDidMount = () => {
    if (!this.props.userState.userLogged) {
        return <Redirect to='/signin'/>
    }
    //this.loadProduct(this.match.params.productId)
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
                    {/* this.state.tokenized ? (
                      <div style={{marginBottom: '20px'}}>
                        <span className={classes.fractPic}><img src={fractPic} alt="0%" /></span>
                        <span className={classes.fractPerc}>{100 - this.state.tokenKept}%</span> 
                        <span className={classes.fractText}>FRACTS ON SALE</span>
                      </div>
                    ) : (
                      <div style={{marginBottom: '20px'}}>
                        <span className={classes.fractPic}><img src={fractPic} alt="0%" /></span>
                        <span className={classes.fractPerc}>NOT</span>
                        <span className={classes.fractText}>For Sale</span>
                      </div>
                    )*/}

                    {  //ZUNOTE: only owner can see
                      this.state.userId === this.props.userState.userId ? (
                      <Link to={"/product/" + this.state.id + "/edit"}>
                        <Button 
                            className={classes.fullBtn+' '+classes.btnorange+' '+classes.btnround} 
                        >Edit Artwork</Button>
                      </Link>
                    ) : (  //ZUNOTE: not owner - view in fimart button not reserve
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
          
          { this.state.userId === this.props.userState.userId && this.props.userState.userType !== 3 ? (
              <Grid container spacing={40} className={classes.noPaddingGrid}>
                <Grid item xs={12} sm={12} className={classes.noPaddingGrid}>
                  <Card className={classes.card2}> 
                  
                    {/* SIMONOTE: these buttons only if user=owner; also what path?? and they are visible if the owner didn't request that */}
                    
                      
                      { this.state.reqTag === false ? (
                        <div style={{marginTop:20}}>
                            <Button onClick={this.handleReqTag}
                              className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround}>Ask TAG</Button>
                          <div style={{marginTop:10}}></div>
                          <Link to={"/"} className={classes.linkTutorial}>{/* SIMONOTE: missing link */}
                            <span style={{fontWeight:'bold'}}>Ask TAG:</span> click here for the how-to
                          </Link>
                        </div>
                      ) : this.state.reqTag === true && this.state.tagSent === false && this.state.reqVal === false ? (
                        <span style={{fontWeight:'bold'}}>TAG asked, waiting..</span>
                      
                      ) : this.state.reqTag === true && this.state.tagSent === true && this.state.reqVal === false ? (
                          <div style={{marginTop:20}}>
                            <div style={{fontWeight:'bold'}}>TAG sent, attach it and ask for validation</div>
                            <Button onClick={this.handleReqVal}
                              className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround}>Validate TAG</Button>
                          </div>
                      ) : this.state.reqTag === true && this.state.tagSent === true && this.state.reqVal === true && this.state.tagged === false ? (
                        <span style={{fontWeight:'bold'}}>Waiting for tag approvement</span>
                      ) : (
                        <span style={{fontWeight:'bold'}}>ARTWORK TAGGED</span>
                      )}
                                       
                      <div className={classes.dividerGrey}></div>
                      
                      { this.state.tagged === false ? (
                        <span style={{fontWeight:'bold'}}>In order to ask tokenization the artwork must be tagged.</span>
                      
                      ) : this.state.reqTokenization === false ? (
                        <div style={{marginTop:34}}>
                          <Link to={"/product/" + this.state.id + "/tokenize" }>
                            <Button 
                              className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnround}>TOKENIZE</Button>
                          </Link>                
                          <div style={{marginTop:10}}></div>
                          <Link to={"/"} className={classes.linkTutorial}>{/* SIMONOTE: missing link, add popup: "Tokenization requested!" */}
                            <span style={{fontWeight:'bold'}}>TOKENIZE:</span> click here for the how-to
                          </Link>
                        </div>
                      ) : this.state.reqTokenization === true && this.state.tokenized === false ? (

                        <span style={{fontWeight:'bold'}}>Tokenization asked, waiting..</span>
                      ) : (
                        <span style={{fontWeight:'bold'}}>ARTWORK TOKENIZED</span>
                      ) }
                                          
                  </Card>
                </Grid>
              </Grid>
            ) : ''
          }
            
          { this.props.userState.userType !== 3 ? null : ( <div className={classes.titleInfo + ' ' + classes.adminDivider}>ADMINISTRATION CONTROLS</div> ) }
          {
            this.props.userState.userType !== 3 ? null :

              this.state.reqTag === false ? 
              (
                <div className={classes.adminDivider} style={{fontWeight:'bold'}}>Tag not asked</div>              
              
              ) : this.state.reqTag === true && this.state.tagSent === false  && this.state.reqVal === false ? 
              (  
                <div className={classes.adminDivider}>
                  <div style={{fontWeight:'bold'}}>Tag requested, need to send</div>
                  <Button onClick={this.handleTagSent}
                      className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround}>Send Tag</Button>     
                </div>
            
              ) : this.state.reqTag === true && this.state.tagSent === true  && this.state.reqVal === false ?
              (
                <div className={classes.adminDivider} style={{fontWeight:'bold'}}>Tag sent, waiting for Validation request</div>                    
                  
              ) : this.state.reqTag === true && this.state.tagSent === true  && this.state.reqVal === true && this.state.tagged === false ?
              (
                <div className={classes.adminDivider}>
                  <div style={{fontWeight:'bold'}}>Validation requested, need to approve</div>
                  <Button onClick={this.handleTagged}
                      className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround}>Validate Tag</Button>     
                </div>         
              ) : 
              (  <div className={classes.adminDivider} style={{fontWeight:'bold'}}>Tag Confirmed</div> 
              )
          }
          
          { this.props.userState.userType !== 3 ? null : ( <div className={classes.dividerGrey}></div> ) }

          {
           this.props.userState.userType !== 3 ? null :

              !this.state.reqTokenization ? 
              (
                <div className={classes.adminDivider} style={{fontWeight:'bold'}}>Tokenization not asked</div>              
              ) :                
                this.state.reqTokenization && this.state.tokenized === false ? 
                (  
                  <div className={classes.adminDivider}>
                    <div style={{fontWeight:'bold'}}>Tokenization requested</div>
                    
                    <div className={classes.textInfo}><span style={{fontWeight:'bold'}}>Token Name: </span> {this.state.tokenName}</div>
                    <div className={classes.textInfo}><span style={{fontWeight:'bold'}}>Token Qty: </span> {this.state.tokenqty}</div>
                    <div className={classes.textInfo}><span style={{fontWeight:'bold'}}>% Token kept: </span> {this.state.tokenKept}</div>
                    <div className={classes.textInfo}><span style={{fontWeight:'bold'}}>Suggested Value: </span> {this.state.tokenSuggestedValue}</div>
                    <div className={classes.textInfo}><span style={{fontWeight:'bold'}}>Buyback: </span> {this.state.buyback ? 'Yes' : 'No'}</div>

                    <Button onClick={this.handleTokenized}
                        className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround}>Tokenize</Button>     
                  </div>
            
                ) : (                    
                  <div className={classes.adminDivider} style={{fontWeight:'bold'}}>Tokenization Confirmed</div>
                )
          }
              
          
                     
        </div>)

      
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Product)

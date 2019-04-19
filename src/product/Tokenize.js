import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {Link, Redirect} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Avatar from '@material-ui/core/Avatar'
//import auth from './../auth/auth-helper'
//import {read, update} from './api-product.js'
//import {initPaintingForUpload} from '../../server/bigchain/uploadPainting.js'
import { API } from 'aws-amplify';
import EmptyPic from '../assets/images/empty-pic.jpg';

const styles = theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    maxWidth: 500,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
})

class Tokenize extends Component {
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
      viewable: false,

      reqTag: false,
      reqTagDate: null,
      tagSent: false,
      tagSentDate: null,
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

      redirect: false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    this.productData = new FormData()
    if (!this.props.userState.userLogged) {
        return <Redirect to='/signin'/>
    }
    this.props.handleForceReload()
  }

  componentWillReceiveProps = (props) => {
    this.loadProduct(props.match.params.productId)
  }

  loadProduct = async (productId) => {
    const data = await API.get('artworksAPI', '/artworks/' + productId);
    if (data.error) {
      this.setState({ error: data.error })
      alert('error loading artwork:\n' + JSON.stringify(data.error))
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

  handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    this.productData.set(name, value) 
    this.setState({ [name]: value })
  }

  handleCheckbox = name => event => {
    if(name === 'buyback')  this.setState({ buyback: !this.state.buyback });
  }

  handleTokenizeArtworkSubmit = (e) => {
    e.preventDefault();

    // SIMONOTES: 
    //need to call here TokenLaunch to write to bigchain!!, ... then ... don't know

    console.log('tokenizing artwork');
    this.tokenizeArtwork();
  }

  tokenizeArtwork = async () => {
    if(this.state.tokenName===null || this.state.tokenqty===null){
      alert('Please complete all required fields'); 
      return false;
    } else {       
      const data = await API.post('artworksAPI', '/artworks/', {
        body: {
          id: this.state.id,
          userId: this.state.userId,
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

          reqTokenization: true,
          reqTokenizationDate: new Date('Y-m-d'),
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
        console.log("Artwork tokenization response:\n" + JSON.stringify(data));
        this.setState({error: '', redirect: true})
      }
      // popup: request sent

      this.setState({error: '', redirect: true})
    }
  }



  render() {
    /*const imageUrl = this.state.id
          ? `/api/product/image/${this.state.id}?${new Date().getTime()}`
          : '/api/product/defaultphoto'*/
    const imageUrl = EmptyPic // ZUNOTE: need to fix
    
          if (this.state.redirect) {
      return (<Redirect to={'/product/' + this.state.id }/>)
    }
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Tokenize Artwork
          </Typography><br/>
          <Avatar src={imageUrl} className={classes.bigAvatar}/><br/>
          
          <TextField 
                readOnly
                id="name" 
                label="Name" 
                className={classes.textField} 
                value={this.state.name || ""} 
                onChange={this.handleChange('name')} 
                margin="normal"/><br/>
          <TextField 
                readOnly
                id="artist" 
                label="Artist" 
                className={classes.textField} 
                value={this.state.artist || ""} 
                onChange={this.handleChange('artist')} 
                margin="normal"/><br/>
          <TextField 
                readOnly
                id="price" 
                label="Suggested Price" 
                className={classes.textField} 
                value={this.state.price !== 0 ? this.state.price : ""} 
                onChange={this.handleChange('price')} 
                type="number" 
                margin="normal"/><br/>
            <TextField 
                id="tokenName" 
                label="Token Name" 
                className={classes.textField} 
                value={this.state.tokenName || ""} 
                onChange={this.handleChange('tokenName')} 
                margin="normal"/><br/>
            <TextField 
                readOnly
                id="tokenqty" 
                label="Token Qty" 
                className={classes.textField} 
                value={this.state.tokenqty || ""} 
                onChange={this.handleChange('tokenqty')} 
                type="number" 
                margin="normal"/><br/>
            
            <TextField 
                id="tokenKept" 
                label="Percentage of tokens to Kept" 
                className={classes.textField} 
                value={this.state.tokenKept || ""} 
                onChange={this.handleChange('tokenKept')} 
                type="number" 
                margin="normal"/><br/>
            <FormControlLabel
                label="Want to activate the Buy-Back option?"
                control={
                    <Checkbox
                        checked={this.state.buyback}
                        onChange={this.handleCheckbox('buyback')}
                        color="primary"
                      /> }/><br/>
            
          {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={this.handleTokenizeArtworkSubmit} className={classes.submit}>Update</Button>
          <Link to={'/product/' + this.state.artworkId } className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>)
  }
}

Tokenize.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Tokenize)

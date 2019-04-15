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
      //id: null,
      userId: null,
      name: null,
      artist: null,
      description: null,
      images: [],
      category: null,
      //quantity: 0,
      price: 0,
      size: null,
      markings: null,
      
      creationDate: null,
      txnId: null,
      bucketId: null,
      
      viewable: false,
      tagged: false,
      tokenized: false,
      onSale: false,
      buyback: false,

      // new
      artworkId: null,
      ownerId: null,
      tokenqty: null,
      tokenName: null,
      tokenValue: null,
      tokenizationDate: null,
      //percToKeep: null,

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
        artworkId: data[0].id,
        userId: data[0].userId,
        name: data[0].name,
        artist: data[0].artist,
        description: data[0].description,
        images: [],
        category: data[0].category,
        //quantity: data[0].quantity,
        price: data[0].price,
        size: data[0].size,
        markings: data[0].markings,

        creationDate: data[0].creationDate,
        txnId: data[0].txnId,
        bucketId: data[0].bucketId || null,
           
        viewable: data[0].viewable,
        tagged: data[0].tagged,
        tokenized: data[0].tokenized,
        onSale: data[0].onSale,
        buyback: data[0].buyback
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
    //need to call here initPaintingForUpload() to write to bigchain!!
    //initPaintingForUpload(this.state.id, this.state.name, this.state.artist, jwt.user._id, this.state.tokenqty, this.state.price, (this.state.price/2000) );
    //also, need to get back txSigned.id and write it to db
    console.log('tokenizing artwork');
    this.tokenizeArtwork();
  }

  tokenizeArtwork = async () => {
    if(this.state.tokenName===null || this.state.tokenqty===null){
      alert('Please complete all required fields'); 
      return false;
    } else {       
      /*const data = await API.post('fractsAPI', '/fracts/', {
        body: {
          id: null, // id fract
          
          // new for fracts
          artworkId: this.state.artworkId,
          ownerId: this.state.userId,
          tokenqty: this.state.tokenqty,
          tokenName: this.state.tokenName,
          tokenValue: this.state.price/this.state.tokenqty,
          tokenizationDate: new Date('Y-m-d'),
          buyback: this.state.buyback,
          
          //old from artwork, ??
          //userId: this.state.userId, // swapping with ownerId
          creationDate: this.state.creationDate,       
          bucketId: this.state.bucketId,       
          
        }
      });   
      
      if (data.error) {
        this.setState({error: data.error})
      } else {
        console.log("Artwork tokenization response:\n" + JSON.stringify(data));
        this.setState({error: '', redirect: true})
      }*/
      alert('Need to implement!')
      this.setState({error: '', redirect: true})
    }
  }



  render() {
    /*const imageUrl = this.state.id
          ? `/api/product/image/${this.state.id}?${new Date().getTime()}`
          : '/api/product/defaultphoto'*/
    const imageUrl = EmptyPic // ZUNOTE: need to fix
    
          if (this.state.redirect) {
      return (<Redirect to={'/product/' + this.state.artworkId }/>)
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
                label="Price" 
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
                id="tokenqty" 
                label="Token Qty" 
                className={classes.textField} 
                value={this.state.tokenqty || ""} 
                onChange={this.handleChange('tokenqty')} 
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

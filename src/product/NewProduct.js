import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'
//import FileUpload from '@material-ui/icons/FileUpload'
//import auth from './../auth/auth-helper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
//import {create} from './api-product.js'
import {Link, Redirect} from 'react-router-dom'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle,
    fontSize: '1.2em'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
})

class NewProduct extends Component {
  constructor({match}) {
    super()
    this.state = {
      id: '',
      userId: '',
      name: '',
      artist: '',
      description: '',
      images: [],
      category: '',
      quantity: '',
      price: '',
      creationDate: '',

      viewable: false,
      tagged: false,
      tokenized: false,
      onSale: false,
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
  }

  handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    this.productData.set(name, value)
    this.setState({ [name]: value })
  }

  clickSubmit = () => {
    /*const jwt = auth.isAuthenticated()
    create({
      shopId: this.match.params.shopId
    }, {
      t: jwt.token
    }, this.productData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', redirect: true})
        const jwt = auth.isAuthenticated()
        
        // SIMONOTES: 
        //need to call here initPaintingForUpload() to write to bigchain!!
        //also, need to get back txSigned.id and write it to mongodb
        //how to write on mongo? do we need transaction.model and transaction.controller?
        
      }
    })*/
  }

  handleCreateArtworkSubmit = (e) => {
    e.preventDefault();
    this.createArtwork();
    console.log('posting artwork');
  }
  
  createArtwork = async () => {
    if(this.state.name===null || this.state.artist===null){
      alert('Please complete all required fields'); 
      return false;
    } else {              
      const response = await API.post('artworksAPI', '/artworks/', {
        body: {
          id: null,
          userId: this.props.userState.userId,
          name: this.state.name,
          artist: this.state.artist,
          description: this.state.description,
          images: [],
          category: this.state.category,
          quantity: this.state.quantity,
          price: this.state.price,
          creationDate: Date('Y-m-d'),
          
          viewable: false,
          tagged: false,
          tokenized: false,
          onSale: false,
          buyback: false,
          
        }
      });      

      this.setState({
        userRegistered: true, 
        userFullyRegistered: userFullyRegistered,
        registrationDate: userFullyRegistered ? this.state.registrationDate : Date('Y-m-d'), 
        registrationDateUpdate: Date('Y-m-d') ,
        userPublicKey: userPublicKey, 
        userPrivateKey: userPrivateKey,

      }, function () { 
        console.log("Registration response:\n" + JSON.stringify(response));
        if(userFullyRegistered && this.state.galleryId){ //gallery already created
          console.log("no need to load gallery, it's the fully registration");
          if(userFullyRegistered && this.state.userLogged) this.props.history.push('/profile'); 
          else this.props.history.push('/signin'); 
        } else {
          this.createGallery().then( response => {
            if(response) {} // console.log("Gallery created after registration");
            else console.log("error creating Gallery after registration");
            this.props.history.push('/signin');
          });       
        } 
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={"/users/" + this.props.userState.userId + "/" + this.props.userState.galleryId}/>)
    }
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            New Artwork
          </Typography><br/>
          <input accept="image/*" onChange={this.handleChange('image')} className={classes.input} id="icon-button-file" type="file"/>
          <label htmlFor="icon-button-file">
            <Button variant="raised" color="secondary" component="span">
              Upload Photo
              {/*<FileUpload/>*/}
            </Button>
          </label> <span className={classes.filename}>{this.state.image ? this.state.image.name : ''}</span><br/>
          <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField id="name" label="Artist" className={classes.textField} value={this.state.artist} onChange={this.handleChange('artist')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="Description" 
            multiline
            rows="2"
            value={this.state.description}
            onChange={this.handleChange('description')}
            className={classes.textField}
            margin="normal"
          /><br/>
          <TextField id="category" label="Category" className={classes.textField} value={this.state.category} onChange={this.handleChange('category')} margin="normal"/><br/>
          {/*<TextField id="quantity" label="Quantity (field to be removed)" className={classes.textField} value={this.state.quantity} onChange={this.handleChange('quantity')} type="number" margin="normal"/><br/>*/}
          <TextField id="price" label="Price" className={classes.textField} value={this.state.price} onChange={this.handleChange('price')} type="number" margin="normal"/><br/>
          {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.handleCreateArtworkSubmit} className={classes.submit}>Submit</Button>
          <Link to={"/users/" + this.props.userState.userId + "/" + this.props.userState.galleryId} className={classes.submit}><Button variant="raised">Cancel</Button></Link>
        </CardActions>
      </Card>
    </div>)
  }
}

NewProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewProduct)

import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './FileUpload.css'

const styles = {
  root: { flexGrow: 1, marginBottom: 50, },
  title: { fontSize: 40, textAlign: 'center',  marginTop: 40, }, 
  mainPictureContainer: { width: 300, height: 300, backgroundColor: '#dedede', margin: '50px auto', },
  mainPicture: { width: 300, height: 300, },
  
  registerButton: { textDecoration: 'none', }, 
  register: {
    color: '#000', fontSize: 15, marginTop:40,
    borderStyle: 'solid', borderColor: '#000', borderRadius: 4, border: 2,
  },
}

/*const UploadArtwork = (props) => {
  
    const { classes } = props;
    const { userState } = props;

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let $frontPreview = null;
    let $backPreview = null;
    let $facePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
      $frontPreview = (<img src={imagePreviewUrl} />);
      $backPreview = (<img src={imagePreviewUrl} />);
      $facePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an image</div>);
      $frontPreview = (<div className="previewText">Please select an image</div>);
      $backPreview = (<div className="previewText">Please select an image</div>);
      $facePreview = (<div className="previewText">Please select an image</div>);
    }


    return (  
    
        <div className={classes.root}>
      
              <div className={classes.title}>Upload Artwork</div>

  
  
  
              <div className={classes.mainPictureContainer}>
                <input type="file" name="mainPicture" className={classes.mainPicture} />
              </div>





              <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                  <input className="fileInput"
                    id="contained-button-uploadfront" 
                    type="file" 
                    onChange={(e)=>this._handleImageChange(e)} />
                  <label htmlFor="contained-button-uploadfront">
                  <Button className="submitButton" 
                    variant="contained"
                    component="span"
                    onChange={(e)=>this._handleImageChange(e)}>
                    Upload Front Artwork Image
                    </Button>
                    </label>
                </form>
                <div className="imgPreview">
                  {$frontPreview}
                </div>
              </div>
              <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                  <input className="fileInput"
                    id="contained-button-uploadback" 
                    type="file" 
                    onChange={(e)=>this._handleImageChange(e)} />
                  <label htmlFor="contained-button-uploadback">
                  <Button className="submitButton" 
                    variant="contained"
                    component="span"
                    onChange={(e)=>this._handleImageChange(e)}>
                    Upload Back Artwork Image
                    </Button>
                    </label>
                </form>
                <div className="imgPreview">
                  {$backPreview}
                </div>
              </div>
              <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                  <input className="fileInput"
                    id="contained-button-uploadface" 
                    type="file" 
                    onChange={(e)=>this._handleImageChange(e)} />
                  <label htmlFor="contained-button-uploadface">
                  <Button className="submitButton" 
                    variant="contained"
                    component="span"
                    onChange={(e)=>this._handleImageChange(e)}>
                    Upload Tag Image
                    </Button>
                    </label>
                </form>
                <div className="imgPreview">
                  {$facePreview}
                </div>
              </div>
         
        
        </div>
    )
  }*/

  class UploadArtwork extends Component {

    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log('handle uploading-', this.state.file);
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
  
    state = {
      
      file: '',
      imagePreviewUrl: ''
    };
  
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value
      });
    };

    render () {
  
      const { classes } = this.props;
      const { userState } = this.props;

      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      let $frontPreview = null;
      let $backPreview = null;
      let $tagPreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
        $frontPreview = (<img src={imagePreviewUrl} />);
        $backPreview = (<img src={imagePreviewUrl} />);
        $tagPreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText">Please select an image</div>);
        $frontPreview = (<div className="previewText">Please select an image</div>);
        $backPreview = (<div className="previewText">Please select an image</div>);
        $tagPreview = (<div className="previewText">Please select an image</div>);
      }


      return (  
    
        <div className={classes.root}>
      
              <div className={classes.title}>Upload Artwork</div>

              <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                  <input className="fileInput"
                    id="contained-button-uploadfront" 
                    type="file" 
                    onChange={(e)=>this._handleImageChange(e)} />
                  <label htmlFor="contained-button-uploadfront">
                  <Button className="submitButton" 
                    variant="contained"
                    component="span"
                    onChange={(e)=>this._handleImageChange(e)}>
                    Upload Front Artwork Image
                    </Button>
                    </label>
                </form>
                <div className="imgPreview">
                  {$frontPreview}
                </div>
              </div>
              <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                  <input className="fileInput"
                    id="contained-button-uploadback" 
                    type="file" 
                    onChange={(e)=>this._handleImageChange(e)} />
                  <label htmlFor="contained-button-uploadback">
                  <Button className="submitButton" 
                    variant="contained"
                    component="span"
                    onChange={(e)=>this._handleImageChange(e)}>
                    Upload Back Artwork Image
                    </Button>
                    </label>
                </form>
                <div className="imgPreview">
                  {$backPreview}
                </div>
              </div>
              <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                  <input className="fileInput"
                    id="contained-button-uploadtag" 
                    type="file" 
                    onChange={(e)=>this._handleImageChange(e)} />
                  <label htmlFor="contained-button-uploadtag">
                  <Button className="submitButton" 
                    variant="contained"
                    component="span"
                    onChange={(e)=>this._handleImageChange(e)}>
                    Upload Tag Image
                    </Button>
                    </label>
                </form>
                <div className="imgPreview">
                  {$tagPreview}
                </div>
              </div>
         
        
        </div>
      )
    }
  }
  
  UploadArtwork.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(UploadArtwork);
  
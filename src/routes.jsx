// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router'
//import PrivateRoute from './auth/PrivateRoute'

// Components
import App from './App';
import Home from './core/Home';
import Login from './auth/Login';
import Register from './user/Register';
//import UploadArtwork from './product/UploadArtwork';
import Sidebar from './components/Sidebar';
import Error404 from './Error/404';
import Provenance from './core/Provenance'
import Fimart from './core/Fimart'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import MyFinancials from './user/MyFinancials'
//import NewShop from './shop/NewShop'
//import MyShops from './shop/MyShops'
//import Shop from './shop/Shop'
import MyArt from './product/MyArt';
import NewProduct from './product/NewProduct'
import EditProduct from './product/EditProduct'
import Product from './product/Product'
import Tokenize from './product/Tokenize'
//import StripeConnect from './user/StripeConnect'

import aws_exports from './aws-exports';
import Amplify, { /*Auth,*/ API } from 'aws-amplify';

// ZUNOTE: need to remove!!
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fab, fas);

Amplify.configure(aws_exports);

class AppRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
      // User state flags
      userLogged: false, userLoaded: false,
      userLoginDatetime: null,
      needToRenewPsw: false, pswToRenew: null,

      // user model in db
      userId: null,
      email: null, pswLogin: null,           
          
      userRegistered: false, 
      userFullyRegistered: false,
      registrationDate: null, 
      registrationDateUpdate: null,
  
      userType: 0, 
      investorStatus: false, 
      userCanUpload: false,   
      userFimartActive: false,   
      llToken:0, llScore:0, investDate: null,
      userPublicKey: null, userPrivateKey: null,

      firstName:null, middleName:null, lastName:null, 
      dateBirth:null,
      address:null, city:null, zipCode:null, 
      regionState:null, countryCitizenship:null, countryResidence:null,
      occupation:null,    
      
      // useful stuff
      galleryId: false,
      artworks: [],
      categories: [],
      viewport: { width: 0, height: 0, },
      sidebarOpened: false,
    }

    this.handleSidebar = this.handleSidebar.bind(this);
    this.handleChangeTextField = this.handleChangeTextField.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRenewPassword = this.handleRenewPassword.bind(this);
  }

  handleChangeTextField = name => event => { this.setState({ [name]: event.target.value }); };

  handleLoginSubmit = (e) => {  // login process
    e.preventDefault();
    this.login().then( () => { 
      
        this.loadGallery().then( () => {
            
          sessionStorage.setItem("ll_user_email", this.state.email);
          /* ZUNOTE: if this.state.renew -> change password process */
          if(this.state.needToRenew) this.props.history.push('/signin'); 
          else this.props.history.push('/');       
        });
    });
  }

  login = async () => {

    if(this.state.email==='' || this.state.pswLogin===''){
          alert('Please complete all required fields'); 
          return false; 
    } else {    
      const response = await API.get('usersAPI', '/users/' + this.state.email);   
      if(!isEmpty(response)){       
        if(this.state.pswLogin === response[0].pswLogin){        
          if(this.state.userLoaded === false) { 
            //let holdingDays = Math.floor( (Date.parse(Date('Y-m-d')) - Date.parse(response[0].investDate)) / (1000 * 60 * 60 * 24));
            //let llScore = response[0].llToken * holdingDays; 
            if(response[0].user_email === '' || response[0].llToken === '' || response[0].investDate === '')
              console.log('Problems in login: psw correct but missing data\n' + JSON.stringify(response));

            this.setState({   
              userId: response[0].id || false,
              email: response[0].user_email, pswLogin: this.state.pswLogin,                     
              userLogged: true, 
              userLoginDatetime: Date('Y-m-d h:m:s'),
              userLoaded: true,
              userRegistered: response[0].userRegistered || false, 
              userFullyRegistered: response[0].userFullyRegistered || false,
              registrationDate: response[0].registrationDate || null, 
              registrationDateUpdate: response[0].registrationDateUpdate || null, 

              userType: response[0].userType || 0, 
              investorStatus: response[0].investorStatus || null, 
              userCanUpload: response[0].userCanUpload || false,   
              userFimartActive: response[0].userFimartActive || false,   
              llToken:response[0].llToken || 0, llScore:response[0].llScore || 0, 
              investDate: response[0].investDate || null,
              userPublicKey: response[0].userPublicKey || null, userPrivateKey: response[0].userPrivateKey || null,

              firstName:response[0].firstName || null, middleName:response[0].middleName || null, lastName:response[0].lastName || null,
              address:response[0].address || null, city:response[0].city || null, zipCode:response[0].zipCode || null, regionState:response[0].regionState || null,
              countryCitizenship:response[0].countryCitizenship || null, countryResidence:response[0].countryResidence || null,
              dateBirth:response[0].dateBirth || null, occupation:response[0].occupation || null   
            
            },  function () { return true; });         
          
          } else { alert('Already loaded'); return false; }  
        } else { alert('Wrong Password'); return false; }  
      } else { alert('Wrong Email'); return false; }  
    }   
  }

  loadGallery = async () => {      
    const response = await API.get('galleriesAPI', '/galleries/' + this.state.email);  
    if(!isEmpty(response)){       
      this.setState({   
        galleryId: response[0].id  
      },  function () {         
        //this.loadArtworks().then( response => { return response; });
        return true
      });         
    } else { alert('Gallery not found'); return false; }  
  }

  handleLogout = () => {
    sessionStorage.removeItem("ll_user_email");
    this.setState({   
      userLogged: false, 
      userId: null,
      email:null, pswLogin: null, 
      needToRenewPsw: false, pswToRenew: null,
      userLoginDatetime: false,
      userLoaded: false,    
      userRegistered: false, 
      userFullyRegistered: false,
      registrationDate: null, 
      registrationDateUpdate: null,

      userType: 0, 
      investorStatus: false, 
      userCanUpload: false,   
      userFimartActive: false,   
      llToken:0, llScore:0, investDate: null,
      userPublicKey: null, userPrivateKey: null,

      firstName:null, middleName:null, lastName:null, 
      dateBirth:null,
      address:null, city:null, zipCode:null, 
      regionState:null, countryCitizenship:null, countryResidence:null,
      occupation:null,   

      sidebarOpened: false, 
      galleryId: false,
      artworks: [],

    }, function () {
      this.props.history.push('/');
    });
  }

  getUser = async () => {
    console.log('getUser from email saved in sessionStorage');
    const response = await API.get('usersAPI', '/users/' + this.state.email);
    if(response){
      //let holdingDays = Math.floor( (Date.parse(Date('Y-m-d')) - Date.parse(response[0].investDate)) / (1000 * 60 * 60 * 24));
      //let llScore = response[0].llToken * holdingDays;    
      this.setState({   
        userId: response[0].id || null,
        //email:response[0].email, 
        pswLogin: response[0].pswLogin,          
        
        userLogged: true, 
        needToRenewPsw: false, pswToRenew: null,
        userLoginDatetime: Date('Y-m-d h:m:s'),
        userLoaded: true,
        userRegistered: response[0].userRegistered || false, 
        userFullyRegistered: response[0].userFullyRegistered || false,
        registrationDate: response[0].registrationDate || null, 
        registrationDateUpdate: response[0].registrationDateUpdate || null, 

        userType: response[0].userType || 0, 
        investorStatus: response[0].investorStatus || false, 
        userCanUpload: response[0].userCanUpload || false,   
        userFimartActive: response[0].userFimartActive || false,   
        llToken:response[0].llToken || 0, llScore:response[0].llScore || 0, 
        investDate: response[0].investDate || null,
        userPublicKey: response[0].userPublicKey || null, userPrivateKey: response[0].userPrivateKey || null,

        firstName:response[0].firstName || null, middleName:response[0].middleName || null, lastName:response[0].lastName || null,
        address:response[0].address || null, city:response[0].city || null, zipCode:response[0].zipCode || null, regionState:response[0].regionState || null,
        countryCitizenship:response[0].countryCitizenship || null, countryResidence:response[0].countryResidence || null,
        dateBirth:response[0].dateBirth || null, occupation:response[0].occupation || null
      },    
      function () { 
        //console.log('routes.js getUser:\n' + JSON.stringify(this.state)); 
        this.loadGallery().then( response => {
          if(response) {} //console.log("Gallery loaded on WillMount");
          else console.log("error loading Gallery on WillMount");
          let page = window.location.href.toString().split(window.location.host)[1];
          if( (page==='/signup' || page==='/profile' /* ZUNOTE: add others restricted pages.. */) && !this.state.userLogged ){
            this.props.history.push('/signin');
          }      
        });       
      });
    } 
  }

  handleRegistrationSubmit = (e) => {
    e.preventDefault();
    this.registerUser();
    console.log('posting registration');
  }
  
  registerUser = async () => {
    if(this.state.firstName===null || this.state.lastName===null || this.state.email===null || this.state.pswLogin===null){
      alert('Please complete all required fields'); 
      return false;
    } else {              
      const userFullyRegistered = this.state.registrationDate !== null && this.state.userLoaded
      const userId = userFullyRegistered ? this.state.userId : null
      // ZUNOTE: create keys and fix here!!!
      const userPublicKey= this.state.userPublicKey || null
      const userPrivateKey= this.state.userPrivateKey || null
      // ZUNOTE: need to use update instead of post 
      const response = await API.post('usersAPI', '/users/', {
        body: {
          // only attributes in "user model in db"
          id: userId, // if null, to create with uuid.v1()
          user_email:this.state.email, pswLogin: this.state.pswLogin,          
          userRegistered: true, 
          userFullyRegistered: userFullyRegistered,
          registrationDate: userFullyRegistered ? this.state.registrationDate : Date('Y-m-d'), 
          registrationDateUpdate: Date('Y-m-d'), 

          userType: this.state.userType || 0, 
          investorStatus: this.state.investorStatus || false, 
          userCanUpload: this.state.userCanUpload || false,   
          userFimartActive: this.state.userFimartActive || false,   
          llToken:this.state.llToken || 0, llScore:this.state.llScore || 0, 
          investDate: this.state.investDate || null,
          userPublicKey: userPublicKey || null, userPrivateKey: userPrivateKey || null,

          firstName:this.state.firstName || null, middleName:this.state.middleName || null, lastName:this.state.lastName || null,
          address:this.state.address || null, city:this.state.city || null, zipCode:this.state.zipCode || null, regionState:this.state.regionState || null,
          countryCitizenship:this.state.countryCitizenship || null, countryResidence:this.state.countryResidence || null,
          dateBirth:this.state.dateBirth || null, occupation:this.state.occupation || null 
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

  createGallery = async () => {
      const response = await API.post('galleriesAPI', '/galleries/', {
        body: {
          user_email:this.state.email,  
          id: null,
          name: this.state.firstName + '\'s gallery',        
          creationDate: Date('Y-m-d'),
        }
      });      
      
      console.log("Create Gallery response:\n" + JSON.stringify(response));
      return true;
      //this.loadArtworks(); //better later
  }

  /*loadArtworks = async () => {
    // need to do!
    return true;
  }*/

  handleRenewPassword = (e) => {
    e.preventDefault();
    this.renewPassword();
    console.log('changing password');
  }

  renewPassword = async () => {
    if(this.state.pswToRenew !== '' && this.state.pswToRenew !== this.state.pswLogin){
      const response = await API.post('usersAPI', '/users/', {
        body: {
          // only attributes in "user model in db"
          userId: this.state.userId,
          user_email:this.state.email, pswLogin: this.state.pswToRenew,                    
          userRegistered: this.state.userRegistered || false, 
          userFullyRegistered: this.state.userFullyRegistered || false,
          registrationDate: this.state.registrationDate !== null ? this.state.registrationDate : Date('Y-m-d'), 
          registrationDateUpdate: Date('Y-m-d'), 

          userType: this.state.userType || 0, 
          investorStatus: this.state.investorStatus || false, 
          userCanUpload: this.state.userCanUpload || false,   
          userFimartActive: this.state.userFimartActive || false,   
          llToken:this.state.llToken || 0, llScore:this.state.llScore || 0, 
          investDate: this.state.investDate || null,
          userPublicKey: this.state.userPublicKey || null, userPrivateKey: this.state.userPrivateKey || null,

          firstName:this.state.firstName || null, middleName:this.state.middleName || null, lastName:this.state.lastName || null,
          address:this.state.address || null, city:this.state.city || null, zipCode:this.state.zipCode || null, regionState:this.state.regionState || null,
          countryCitizenship:this.state.countryCitizenship || null, countryResidence:this.state.countryResidence || null,
          dateBirth:this.state.dateBirth || null, occupation:this.state.occupation || null 
        }
      });      
      this.setState({
        needToRenewPsw: false, 
        pswLogin: this.state.pswToRenew,
        pswToRenew: null,
      }, function () { 
        this.props.history.push('/');
        console.log("renewPassword response:\n" + JSON.stringify(response));
      });
    } else {
      alert('Please fill in a valid password');
      return false;
    }
  }

  handleSidebar = () => { this.setState({ sidebarOpened: !this.state.sidebarOpened }) }

  componentDidMount() { window.addEventListener('resize', this.resize); }
  
  componentWillUnmount() { window.removeEventListener('resize', this.resize); }

  resize = () => {
    if(this.state.viewport.width !== document.documentElement.clientWidth || this.state.viewport.height !== document.documentElement.clientHeight){
      this.setState({
        viewport: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }
      }, function () { this.forceUpdate() }); 
    }
  }

  componentWillMount () {     

    var ll_user_email = sessionStorage.getItem("ll_user_email");
    if(ll_user_email) 
      this.setState({ email: ll_user_email }, function() { this.getUser(); });

    let dataURL = "http://blog.looklateral.com/wp-json/wp/v2/platformcategories?_embed"; 
    fetch (dataURL) 
      .then (res => res.json ()) 
      .then (res => { 
        this.setState ({ categories: res }); 
      }) 

    if(this.state.viewport.width !== document.documentElement.clientWidth){
      this.setState({
        viewport: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
      }); 
    }
  }
  
  render() {

    return (
        
        <App userState={this.state} handleSidebar={this.handleSidebar} >
          <Switch>
            
            <Route exact path="/" render={(props) => <Home userState={this.state} {...props} /> } />
            
            <Route exact path="/signin" render={(props) => <Login 
                                                              userState={this.state} 
                                                              handleChangeTextField={this.handleChangeTextField}
                                                              handleLoginSubmit={this.handleLoginSubmit}
                                                              handleLogout={this.handleLogout}
                                                              handleRenewPassword={this.handleRenewPassword}
                                                              {...props} /> } />
            
            <Route exact path="/signup" render={(props) => <Register 
                                                              userState={this.state} 
                                                              handleChangeTextField={this.handleChangeTextField}
                                                              handleRegistrationSubmit={this.handleRegistrationSubmit}
                                                              {...props} /> } />
            
            <Route exact path="/provenance" render={(props) => <Provenance userState={this.state} {...props} /> } />
            <Route exact path="/fimart" render={(props) => <Fimart userState={this.state} {...props} /> } />
            

            <Route exact path="/users/:userId" render={(props) => <Profile userState={this.state} {...props} /> } />
            <Route exact path="/users/:userId/edit" render={(props) => <EditProfile 
                                                              userState={this.state} 
                                                              handleChangeTextField={this.handleChangeTextField}
                                                              handleRegistrationSubmit={this.handleRegistrationSubmit}
                                                              {...props} /> } />
            <Route exact path="/users/:userId/financials" render={(props) => <MyFinancials userState={this.state} {...props} /> } />
            {/*<Route path="/shops/:shopId" component={Shop}/>
            <PrivateRoute path="/seller/shops" component={MyShops}/>
            <PrivateRoute path="/seller/shop/new" component={NewShop}/>*/}
            <Route exact path="/users/:userId/:galleryId" render={(props) => <MyArt userState={this.state} {...props} /> } />
            
    
            {/* deprecated - to keep for imamu file-loader <Route path="/upload-artwork" exact render={(props) => <UploadArtwork userState={this.state} {...props} /> } />*/}
            {/*Private*/}<Route exact path="/product/new" render={(props) => <NewProduct userState={this.state} {...props} /> } />
            <Route exact path="/product/:productId" render={(props) => <Product userState={this.state} {...props} /> } />
            <Route exact path="/product/:productId/tokenize" render={(props) => <Tokenize userState={this.state} {...props} /> } />
            {/*Private*/}<Route exact path="/product/:productId/edit" render={(props) => <EditProduct userState={this.state} {...props} /> } />
            
            {/* <Route path="/seller/stripe/connect" component={StripeConnect}/> */}
            <Route component={Error404} />
          
          </Switch>

          <Sidebar 
                    userId={this.state.userId}
                    isOpen={this.state.sidebarOpened}
                    userLogged={ this.state.userLogged} 
                    firstName={ this.state.firstName} 
                    userType={ this.state.userType}
                    handleLogout={this.handleLogout}
                /> 
        </App>
    )
  }
}
export default withRouter(AppRoutes);    

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
  
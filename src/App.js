import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import IconSandwich from './components/IconSandwich'
import './App.css';

class App extends React.Component {
  
  render() {
    const userState = this.props.userState;  
    //if (this.props.authState === "signedIn") {
      return (     
        <div className="App">
          <Header userState={userState} />         
          <IconSandwich isOpen={userState.sidebarOpened} onClick={() => this.props.handleSidebar() } />            
          <Content children={this.props.children} />            
          <Footer userState={userState} />
        </div>
      );
    //} else return null;
  }
}
export default App;

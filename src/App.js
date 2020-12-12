import React, { Component } from 'react';
import logo from './logo.svg';
import Patient from "./components/patient";
import Login from "./components/login";
import Logout from "./components/logout";
import Perscriptions from "./components/perscriptions";
import Home from "./components/home";
import Upload from "./components/upload";
import Navbar from 'react-bootstrap/Navbar';
import TicketList from "./components/ticketlist";
import Applications from "./components/myapplications";
import Profile from "./components/profile";
import TicketRegistration from "./components/registerticket";
import CreateApplication from "./components/createapplication"
import Avatar from '@material-ui/core/Avatar';  
import Condi from "./components/conditions" 
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faClipboard, faClipboardCheck, faHospitalSymbol, faHome, faCogs, faBookmark,
  faAngry } from '@fortawesome/free-solid-svg-icons'

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false
  };
  }

  onToggle = (expanded) => {
    this.setState({ expanded: expanded });
};

  render (){

    if(window.location.pathname==='/login'){
      return (     
    <Router>   
      <div className="container mt-3">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    </div>
    </Router>
  );
    }  
    
    return(
      <div
      style={{
        marginLeft: this.state.expanded ? 240 : 64,
        padding: '20px 20px 0px 20px'
    }}>
         <Router>
    <Route render={({ location, history }) => (
        <React.Fragment >
          
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}

                onToggle={this.onToggle}
                
            >
                <SideNav.Toggle  />
                <SideNav.Nav defaultSelected="home" >
                    <NavItem eventKey="home">
                        <NavIcon>
                        <FontAwesomeIcon icon={faHome} />
                        </NavIcon>
                        <NavText>
                        Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="dashboard">
                        <NavIcon>
                        <FontAwesomeIcon icon={faChartLine} />
                        </NavIcon>
                        <NavText>
                        Dashboard
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="issues">
                        <NavIcon>
                        <FontAwesomeIcon icon={faAngry} />
                        </NavIcon>
                        <NavText>
                            Service Issues
                        </NavText>

                        <NavItem eventKey="issues">
                                <NavText title="My Issues">
                                My Registered Issues
                                </NavText>
                            </NavItem>

                        <NavItem eventKey="complain">
                                <NavText title="Register an Issue">
                                    Register an Issue
                                </NavText>
                            </NavItem>
                       </NavItem>




                    <NavItem eventKey="applications">
                        <NavIcon>
                        <FontAwesomeIcon icon={faBookmark} />
                        </NavIcon>
                        <NavText>
                            Document Applications
                        </NavText>

                        <NavItem eventKey="applications">
                                <NavText title="Apply for Documents">
                                My Applications
                                </NavText>
                            </NavItem>

                        <NavItem eventKey="apply">
                                <NavText title="Apply for Documents">
                                    Apply
                                </NavText>
                            </NavItem>
                       </NavItem>

                    <NavItem eventKey="settings">
                            <NavIcon>
                            <FontAwesomeIcon icon={faCogs} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="SETTINGS">
                                SETTINGS
                            </NavText>
                            <NavItem eventKey="logout">
                                <NavText title="Profile">
                                    Log Out
                                </NavText>
                            </NavItem>
                        </NavItem>
                </SideNav.Nav>
                
            </SideNav>
            <main expanded={this.state.expanded}>
            
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/dashboard" component={Patient} />
            <Route exact path="/" component={Home} />
            <Route exact path="/applications" component={Applications} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/issues" component={TicketList} />
            <Route exact path="/complain" component={TicketRegistration}/>
            <Route exact path="/apply" component={CreateApplication}/>
            <Route exact path="/upload" component={Upload} />
            </main>
        </React.Fragment>
        
    )}
    />
</Router>

</div>
    )

  }
}

export default App;


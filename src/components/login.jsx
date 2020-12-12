import React, { Component } from "react";
import Form from "react-validation/build/form";
import MedicalDataService from "../services/dataservice";
import Input from '@material-ui/core/Input';
import CheckButton from "react-validation/build/button";
import Card from '@material-ui/core/Card';
import logo from '../logo.svg';
import CardMedia from '@material-ui/core/CardMedia';
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";
import Avatar from '@material-ui/core/Avatar';
import { CardHeader, CardContent  } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import './styling/login.css'



export default class Login extends Component{
  
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.OnChangeUsername = this.OnChangeUsername.bind(this);
        this.OnChangePassword = this.OnChangePassword.bind(this);
        this.state = {
          username: "",
            password: "", 
            message: "",
            loading: false
          };
    }
    

    OnChangeUsername(e){
        this.setState({
          username: e.target.value
        });
    }

    OnChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });
            var data = {
              username: this.state.username,
                password: this.state.password 
            };

            MedicalDataService.login(data)
            .then(() =>{
               
                this.props.history.push("/");
                window.location.reload();
                },error =>{
                    const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
                    
                    
                    this.setState({
                        message: resMessage,
                        loading: false
                    });
    
                }
    
            );
    
    }

    render() {
        return (
          
            <div className = "background">
            <header
    absolute
    brand="Material Kit React"
    color="transparent"
  />
            <div>
    <div className = "login-grid">
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>  

      <Card>
      <CardHeader  
      avatar={<Avatar className = "avatar" alt="Remy Sharp" src={logo} />} 
      title="GovernmentNow"/>
      <CardContent >
      <Form
          onSubmit={this.handleLogin}
          ref={c => {
          this.form = c;
          }}
      >
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <Input
            type="text"
            className="form-control"
            name="username"
            fullWidth
            value={this.state.username}
            onChange={this.OnChangeUsername}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            className="form-control"
            name="password"
            value={this.state.password}
            onChange={this.OnChangePassword}
          />
        </div>

        <div className="form-group">
          <button
            className="btn btn-primary btn-block"
            disabled={this.state.loading}
          >
            {this.state.loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
        </div>

        {this.state.message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {this.state.message}
            </div>
          </div>
        )}
        <CheckButton
          style={{ display: "none" }}
          ref={c => {
            this.checkBtn = c;
          }}
        />
        </Form>
        </CardContent>
      
    </Card>
    </GridItem>
    </GridContainer>   
    </div>
    </div>
  </div>
    
    );
        
      }
    
}
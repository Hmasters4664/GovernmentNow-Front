import React, { Component } from "react";
import TokenStore from '../services/tokenservice';
import Form from "react-validation/build/form";
import MedicalDataService from "../services/dataservice";
import Input from '@material-ui/core/Input';
import CheckButton from "react-validation/build/button";
import Card from '@material-ui/core/Card';
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";
import Avatar from '@material-ui/core/Avatar';
import { CardHeader, CardContent  } from '@material-ui/core';


export default class TicketRegistration extends Component{

    constructor(props){
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.OnChangeIssue = this.OnChangeIssue.bind(this);
        this.OnChangeDescription = this.OnChangeDescription.bind(this);
        this.OnChangeCity = this.OnChangeCity.bind(this);
        this.OnChangeSuburb = this.OnChangeSuburb.bind(this);
        this.OnChangeProvince = this.OnChangeProvince.bind(this);
        this.OnChangeStreet = this.OnChangeStreet.bind(this);

        this.state = {
            issue: 0,
            description: "", 
            city: "",
            suburb: "",
            province: "",
            street: "",
            loading: false
          };
    }

    componentDidMount() {

        if (TokenStore.getToken() === null) {
            this.props.history.push("/login");
            window.location.reload();
          }
  
          
      }
      handleUpdate(e){
        e.preventDefault();

        this.setState({
          message: "",
          loading: true
        });

        var data = {
          issue: this.state.issue,
          description: this.state.description, 
          city: this.state.city,
          suburb: this.state.suburb,
          province: this.state.province,
          street: this.state.street,
        };

        MedicalDataService.registerIssue(data)
        .then(() =>{
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

      OnChangeIssue(e){
        this.setState({
            issue: e.target.value
        });
    }

    OnChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    OnChangeCity(e){
        this.setState({
            city: e.target.value
        });
    }

    OnChangeSuburb(e){
        this.setState({
            suburb: e.target.value
        });
    }

    OnChangeProvince(e){
        this.setState({
            province: e.target.value
        });
    }

    OnChangeStreet(e){
        this.setState({
            street: e.target.value
        });
    }



    render() {
        return (
            <div className = "login-grid">
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>  
      
            <Card>
            <CardHeader  
            avatar={<Avatar className = "avatar" alt="Remy Sharp" src={this.picture_url} />} 
            title={this.state.name}/>
            <CardContent >
            <Form
                onSubmit={this.handleUpdate}
                ref={c => {
                this.form = c;
                }}
            >

            <div className="form-group">
                <label htmlFor="issue">Issue</label>
                <select value={this.state.issue} onChange={this.OnChangeIssue}>
                  <option value={0}>EDUCATION</option>
                  <option value={1}>ELECTRICITY</option>
                  <option value={2}>WATER and SANITATION</option>
                  <option value={3}>HOUSING</option>
                  <option value={4}>INFRASTRUCTURE</option>
                </select>
              </div>



              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  fullWidth
                  value={this.state.description}
                  onChange={this.OnChangeDescription}
                />
              </div>
      
              <div className="form-group">
                <label htmlFor="city">City</label>
                <Input
                  type="text"
                  className="form-control"
                  name="city"
                  value={this.state.city}
                  onChange={this.OnChangeCity}
                />
              </div>

              <div className="form-group">
                <label htmlFor="suburb">Suburb</label>
                <Input 
                  type="text"
                  className="form-control"
                  name="suburb"
                  value={this.state.suburb}
                  onChange={this.OnChangeSuburb}
                />
              </div>


              <div className="form-group">
                <label htmlFor="province">Province</label>
                <Input 
                  type="text"
                  className="form-control"
                  name="province"
                  value={this.state.province}
                  onChange={this.OnChangeProvince}
                />
              </div>


              <div className="form-group">
                <label htmlFor="street">Street</label>
                <Input 
                  type="text"
                  className="form-control"
                  name="street"
                  value={this.state.street}
                  onChange={this.OnChangeStreet}
                />
              </div>


              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <Input
                  type="contact"
                  className="form-control"
                  name="contact"
                  value={this.state.contact}
                  onChange={this.OnChangeContact}
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
                  <span>Register Issue</span>
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
        )
    }


}
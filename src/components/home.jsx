import React, { Component, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import TokenStore from '../services/tokenservice';
import { Container } from "reactstrap"
import 'hammerjs';
import logo from '../logo.svg';
import Gov from '../assets/SA_GOV.jpg';
import Covid from '../assets/covid-19.jpg';
import Drivers from '../assets/Drivers-license.jpg';
import Germ from '../assets/germ.jpg'
import MedicalDataService from '../services/dataservice.js'
import {
    Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import "./styling/home.css"


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchPerson = this.onChangeSearchPerson.bind(this);
        this.clickPerson = this.clickPerson.bind(this);
        this.searchPerson = this.searchPerson.bind(this);
        
        this.state = {
          people: [],
          currentIndex: -1,
          currentPerson: null,
          searchPerson: ""
        };
      }

      componentDidMount() {

        if (TokenStore.getToken() === null) {
            this.props.history.push("/login");
            window.location.reload();
          }
          
        
      }
      
      clickPerson(id){

        localStorage.setItem("PATIENT_ID",id);
        this.props.history.push("/medical");
            window.location.reload();

      }

      request(id){
        MedicalDataService.request(id)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });

      }

      onChangeSearchPerson(e) {
        const searchterm = e.target.value;
    
        this.setState({
            searchPerson: searchterm
        });
      }
    
      searchPerson() {
        MedicalDataService.search(this.state.searchPerson)
          .then(response => {
            this.setState({
                people: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      render(){
          return(

            <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">

              

<div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={this.state.searchPerson}
                onChange={this.onChangeSearchPerson}
              />
              <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.searchPerson}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      </div> 

      
      <h1>News and Announcements</h1>
<Container className="container-fluid pr-2 pl-2 pt-2 pb-2">
          {/* row 1 - revenue */}
          <Container className="row" >
          <Container className="col">

          <div style={{width: "100%"}}>
        <Card >
          <CardImg top width="100%" src={Covid} alt="Card image cap" height="150px" />
          <CardBody>
    <CardTitle>Tshwane Government Launch COVID-19 Testing Centres</CardTitle>
    <CardText>The Tshwane govenrment has launched several COVID-19 testing Centres in Hatfield, Moraleta park, Sliverlakes
      and.... </CardText>
            
          </CardBody>
        </Card>
      </div>
             
              </Container>
          

       

            <Container className="col">

            <div style={{width: "100%"}}>
        <Card >
          <CardImg top width="80%" src={Gov} alt="Card image cap" height="150px" />
          <CardBody>
    <CardTitle>Gauteng Premier anounces new restrictions</CardTitle>
    <CardText>The Gauteng Premier The hounorable Thato Polisa has anounced new restrictions in a fight to cure the COVID_19 pandemic... 

    </CardText>
            
          </CardBody>
        </Card>
      </div>
             
              
              </Container>
            </Container>

            <Container className="row" >
          <Container className="col">

          <div style={{width: "100%"}}>
        <Card >
          <CardImg top width="100%" src={Drivers} alt="Card image cap" height="150px" />
          <CardBody>
    <CardTitle>SA extend expired driver licenses</CardTitle>
    <CardText>Due to the lockdown enforceed earlier this year The minster of transport has extended the validity of.....</CardText>
            
          </CardBody>
        </Card>
      </div>
             
              </Container>
          

       

            <Container className="col">

            <div style={{width: "100%"}}>
        <Card >
          <CardImg top width="80%" src={Germ} alt="Card image cap" height="150px" />
          <CardBody>
    <CardTitle>Tshwane Government Launch COVID-19 Testing Centres</CardTitle>
    <CardText>The Tshwane govenrment has launched several COVID-19 testing Centres in Hatfield, Moraleta park, Sliverlakes
      and.... </CardText>
            
          </CardBody>
        </Card>
      </div>
             
              
              </Container>
            </Container>




          </Container>

          </Container>

    
 

          );
      }



}
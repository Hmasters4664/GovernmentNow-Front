import React, { Component, useEffect, useState } from 'react';
import { Container } from "reactstrap"
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, DiscreteColorLegend, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, VerticalBarSeries} from 'react-vis';
import "bootstrap/dist/css/bootstrap.css";
import TokenStore from '../services/tokenservice';
import 'hammerjs';
import logo from '../logo.svg';
import Gov from '../assets/sa2.jpg'
import TableContainer from "./tables/tablecontainer"
import './styling/medicalrecords.css';
import MedicalDataService from '../services/dataservice.js'
import {PerscriptionTableLight} from "./tables/perscription_tables"
import {TicketTable } from "./tables/ticketTable"
import {ConditionsTableLight } from "./tables/conditions_tables"
import {HospitalTableLight } from "./tables/hospital_tables"
import { SelectColumnFilter } from './tables/filter.jsx';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle, Button
  } from 'reactstrap';



export default class Applications extends Component{
    constructor(props) {
        super(props);
        this.state = {
          applications:[],
         };
    }

    componentDidMount() {

        if (TokenStore.getToken() === null) {
            this.props.history.push("/login");
            window.location.reload();
          }
  
          this.get()
          
        
      }

      upload(id)
      {
        this.props.history.push("/upload");
        localStorage.setItem("upload_id",id);
            window.location.reload();
      }

      get() {
        MedicalDataService.myapplications()
        .then(response => {
          this.setState({
            applications: response.data,
          });
          //console.log(response.data.Profile);
        })
        .catch(e => {
          console.log(e);
        });
    }

 



    render() {
         
        return (
          <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
           
            {this.state.applications.map((application, index) => (
        <div>
        <Card >
        
          <CardBody>
          
    <CardTitle>{application.name}</CardTitle>
    <CardSubtitle>Application Refrence: {application.id}</CardSubtitle>
    <CardText>Application Type: {application.type_name}</CardText>
    <CardText>Application Status: {application.status_name}</CardText>
  {
      application.has_docs ? <Button color="danger">View</Button> : <Button color="danger" onClick={() => this.upload(application.id)}>Upload Documents</Button>
  }
          </CardBody>
        </Card>
      </div>
    ))}
            
            </Container>

        );
    }




}
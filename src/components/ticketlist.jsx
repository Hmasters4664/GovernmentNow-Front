import React, { Component, useEffect, useState } from 'react';
import { Container } from "reactstrap"
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, DiscreteColorLegend, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, VerticalBarSeries} from 'react-vis';
import "bootstrap/dist/css/bootstrap.css";
import TokenStore from '../services/tokenservice';
import 'hammerjs';
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
  } from 'reactstrap';



export default class TicketList extends Component{
    constructor(props) {
        super(props);
        this.state = {
          tickets:[],
         };
    }

    componentDidMount() {

        if (TokenStore.getToken() === null) {
            this.props.history.push("/login");
            window.location.reload();
          }
  
          this.retrieveAll()
          
        
      }

      retrieveAll() {
        MedicalDataService.myTickets()
        .then(response => {
          this.setState({
            tickets: response.data,
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
            <div className="scrollable">
           
                    <Container style={{ marginTop: 100 }}>
                      <h2>Tickets</h2>
                        <TicketTable data={this.state.tickets} 
                        />
                    </Container>
            </div>
            </Container>

        );
    }




}
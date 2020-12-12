import React, { Component, useEffect, useState } from 'react';
import { Container } from "reactstrap"
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, DiscreteColorLegend, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, VerticalBarSeries} from 'react-vis';
import "bootstrap/dist/css/bootstrap.css";
import TokenStore from '../services/tokenservice';
import 'hammerjs';
import TableContainer from "./tablecontainer"
import MedicalDataService from '../services/dataservice.js'
import {PerscriptionTable} from "./tables/full_perscription_table"
import { SelectColumnFilter } from './filter.jsx';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
  } from 'reactstrap';

  export default class Perscriptions extends Component{
    constructor(props) {
        super(props);
        this.state = {
          perscriptions:[],
          refill:[],
          iss:[]
         };
    }

    componentDidMount() {

        if (TokenStore.getToken() === null) {
            this.props.history.push("/login");
            window.location.reload();
          }
  
          this.getInfo()
          
        
      }

      getInfo() {
        MedicalDataService.perscription()
        .then(response => {
          this.setState({
            perscriptions: response.data
          });
          //console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      }

      getData(id)
      {
        MedicalDataService.refill(id)
        .then(response => {
          this.setState({
            refill: response.data,
          });
         // console.log(response.data.data);
        })
        .catch(e => {
          
          console.log(e);
        });
      }

    

      render() {
        const columns1
        = [
         {
             Header: () => null,
             id: 'expander', // 'id' is required
             Cell: ({ row }) => (
               <span {...row.getToggleRowExpandedProps()}>
                 {row.isExpanded ? '🔺' : '🔻'}
               </span>
             ),
         },
         
         {
         Header: 'Name', 
         accessor: 'name',
         Filter: SelectColumnFilter,
         filter: 'equals',
         headerClassName: 'header',
         },
         { 
         Header: 'Size', 
         accessor: 'size',
         headerClassName: 'header', 
         },
         { 
          Header: 'Condition', 
          headerClassName: 'header',
          accessor: 'condition' 
         },
         {
          Header: 'More Info', 
          headerClassName: 'header',
         Cell: ({ row }) => (<button onClick={() => this.getData(`${row.original.id}`)}>More Info</button>)
         }
          
         ]; 


         const columns2
        = [   
          {
            Header: () => null,
            id: 'expander', // 'id' is required
            Cell: ({ row }) => (
              <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? '🔺' : '🔻'}
              </span>
            ),
        },
         {
         Header: 'Name', 
         accessor: 'doctor.name',
         Filter: SelectColumnFilter,
         headerClassName: 'header',
         },
         { 
         Header: 'Contact', 
         accessor: 'doctor.contact',
         headerClassName: 'header', 
         },
         { 
             Header: 'Refill Date', 
             headerClassName: 'header',
             accessor: 'date' 
        },
         ]; 



         const renderRowSubComponent = (row) => {
            const {
              issuer,
              notes
            } = row.original;
            return (
              <div>
              <Card style={{ width: '18rem', margin: '0 auto' }}>
                <CardBody>
                  <CardTitle>
                    <strong>Issuing medical practitioner</strong>
                  </CardTitle>
                  <CardText>
                     {issuer.name} <br />
                     registration: {issuer.reg_number} <br />
                     contact: {issuer.contact} <br />
                  </CardText>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle>
                    <strong>Notes</strong>
                  </CardTitle>
                  <CardText>
                    {notes}
                  </CardText>
                </CardBody>
              </Card>
            </div>
            );
          };


          const renderRowSubComponentrefill = (row) => {
            const {
              notes
            } = row.original;
            return (
              <div>
              <Card style={{ width: '18rem', margin: '0 auto' }}>
                <CardBody>
                  <CardTitle>
                    <strong>Notes</strong>
                  </CardTitle>
                  <CardText>
                    {notes}
                  </CardText>
                </CardBody>
              </Card>
            </div>
            );
          };


        return (
          <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
                <div className="row">

                <Container style={{ marginTop: 25 }}>
                      <h2>Perscription</h2>
                      <TableContainer columns={columns1} data={this.state.perscriptions}
                        renderRowSubComponent={renderRowSubComponent} 
                      />
                </Container>

                </div>

                <div className="row">

                <Container style={{ marginTop: 100 }}>
                      <h2>Refill</h2>
                        <TableContainer columns={columns2} data={this.state.refill} 
                        renderRowSubComponent={renderRowSubComponentrefill}
                        />
                </Container>

                </div>

        
            </Container>
        )
      }



  }
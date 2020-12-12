import React, { Component, useEffect, useState } from 'react';
import { Container } from "reactstrap"
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, DiscreteColorLegend, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, VerticalBarSeries} from 'react-vis';
import "bootstrap/dist/css/bootstrap.css";
import TokenStore from '../services/tokenservice';
import 'hammerjs';
import './styling/medicalrecords.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import MedicalDataService from '../services/dataservice.js'
import './styling/upload.css'





  export default class Upload extends Component{
    constructor(props) {
        super(props);
        this.state = {
          images:[],
          selectedFile: null,
          notes: ""
         };
    }

    componentDidMount() {

        if (TokenStore.getToken() === null) {
            this.props.history.push("/login");
            window.location.reload();
          }  
          this.img()    
      }

      img(){
        MedicalDataService.images()
        .then(response => {
          this.setState({
            images: response.data,
          });
          //console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }
      onFileChange = event => { 
     
      
        this.setState({ selectedFile: event.target.files[0] }); 
       
      }; 

      onTextChange = event => { 
     
      
        this.setState({ notes: event.target.value }); 
       
      }; 

      onFileUpload = () => { 

        const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "file", 
        this.state.selectedFile, 
        this.state.selectedFile.name,
        this.state.selectedFile.type,
         
      ); 
 
      MedicalDataService.upload(formData) .then(response => {
        this.props.history.push("/medical");
        window.location.reload();
        
        
      })
      .catch(e => {
        console.log(e);
      });
      

      }


      fileData = () => { 
     
        if (this.state.selectedFile) { 
            
          return ( 
            <div> 
              <h2>File Details:</h2> 
              <p>File Name: {this.state.selectedFile.name}</p> 
              <p>File Type: {this.state.selectedFile.type}</p> 
              <p> 
                Last Modified:{" "} 
                {this.state.selectedFile.lastModifiedDate.toDateString()} 
              </p> 
            </div> 
          ); 
        } else { 
          return ( 
            <div> 
              <br /> 
              <h4>Choose before Pressing the Upload button</h4> 
            </div> 
          ); 
        } 
      }; 

      render() {
        return (
          <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
          <div>
            <div className="content">
            <div className="grid">
            {this.state.images.map(imgs =>
                <ActivityItemGrid url={imgs.url} date={imgs.date}
                    notes={imgs.notes} 
                />
            )}
         
            </div>
            <Popup className="Actions" trigger={<button> Upload</button>} modal>
   
                <input type="file" onChange={this.onFileChange} /> 
                <input type="text" onChange={this.onTextChange} /> 
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
          
          {this.fileData()}
          </Popup> 
           
        </div>
      
        </div>
        </Container>
        )
      }

  }

  class ActivityItemGrid extends React.Component{
    render() {
        return (
            <div className="grid">
                <div className="item">
                    <img src={this.props.url} />
                    <p>
                    {this.props.notes}
                </p>
                <span className="time">
                    {this.props.date}
                </span>
                </div>
                
            </div>
        );
    }
}
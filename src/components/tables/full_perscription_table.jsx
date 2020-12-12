import React, { Component, useEffect, useState } from 'react';
import TableContainer from "./tablecontainer"
import { SelectColumnFilter } from './filter.jsx';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
  } from 'reactstrap';


const perscriptions_col
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
       Header: 'Perscribing Doctor', 
       headerClassName: 'header',
       accessor: 'issuer.name' 
       },

       { 
         Header: 'Perscribing Doctor`s Contact', 
         headerClassName: 'header',
         accessor: 'issuer.contact' 
         },

         {
            Header: 'More Info', 
            headerClassName: 'header',
           Cell: ({ row }) => (<button onClick={() => this.getData(`${row.original.id}`)}>More Info</button>)
           }
    
     ]; 

     const renderPerscriptionSubComponent = (row) => {
        const {
          issuer,
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

     export const PerscriptionTable = ({data}) => 
     {
         return (
         <TableContainer columns={perscriptions_col} data={data}
         renderRowSubComponent={renderPerscriptionSubComponent}/>
        ); 
    };
     
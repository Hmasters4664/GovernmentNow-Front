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


const cons_col
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
     Header: 'Doctor', 
     headerClassName: 'header',
     Filter: SelectColumnFilter,
     filter: 'equals',
     accessor: 'consultin_doctor.name' 
 },
 { 
    Header: 'Contact', 
    headerClassName: 'header',
    accessor: 'consultin_doctor.contact' 
},
{ 
    Header: 'Reason',
    accessor: 'reason',
    headerClassName: 'header', 
    },
 ]; 


 const hos_col
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
     Header: 'Hospital', 
     Filter: SelectColumnFilter,
     filter: 'equals',
     headerClassName: 'header',
     accessor: 'hospital' 
 },
 { 
    Header: 'Hospital Contact', 
    headerClassName: 'header',
    accessor: 'hospital_contact' 
},
{ 
    Header: 'Duration', 
    accessor: 'duration',
    headerClassName: 'header', 
    },
    { 
      Header: 'Reason', 
      accessor: 'reason',
      headerClassName: 'header', 
      },
 ]; 



const cons = (row) => {
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


  export const Consultation = ({data}) => 
{
    return (
    <TableContainer columns={cons_col} data={data}
    renderRowSubComponent={cons} />
   ); 
};


export const Hospital = ({data}) => 
{
    return (
    <TableContainer columns={hos_col} data={data}
    renderRowSubComponent={cons} />
   ); 
};
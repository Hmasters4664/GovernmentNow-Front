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


const conditions_col
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
     headerClassName: 'header',
     accessor: 'name' 
 },
 { 
    Header: 'Type', 
    headerClassName: 'header',
    Filter: SelectColumnFilter,
    filter: 'equals',
    accessor: 'type_name' 
},
{ 
    Header: 'Date Discovered',
    accessor: 'date_discovered',
    headerClassName: 'header', 
    },
 ]; 


 const all_col
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
     Filter: SelectColumnFilter,
     filter: 'equals',
     headerClassName: 'header',
     accessor: 'name' 
 },
 { 
    Header: 'Serverity', 
    headerClassName: 'header',
    accessor: 'severity_name' 
},
{ 
    Header: 'Date', 
    accessor: 'date_discovered',
    headerClassName: 'header', 
    },
 ]; 



const des = (row) => {
    const {
      description
    } = row.original;
    return (
      <div>
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <CardBody>
          <CardTitle>
            <strong>Description</strong>
          </CardTitle>
          <CardText>
            {description}
          </CardText>
        </CardBody>
      </Card>
    </div>
    );
  };


  export const Conditions = ({data}) => 
{
    return (
    <TableContainer columns={conditions_col} data={data}
    renderRowSubComponent={des} />
   ); 
};


export const Allergens = ({data}) => 
{
    return (
    <TableContainer columns={all_col} data={data}
    renderRowSubComponent={des} />
   ); 
};
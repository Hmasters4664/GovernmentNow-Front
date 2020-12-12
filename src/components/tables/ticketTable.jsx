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



const cols
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
     Header: 'ID', 
     headerClassName: 'header',
     accessor: 'id' 
 },
 { 
    Header: 'Department', 
    Filter: SelectColumnFilter,
    filter: 'equals',
    headerClassName: 'header',
    accessor: 'issue_name' 
},
{ 
    Header: 'Province', 
    accessor: 'province',
    headerClassName: 'header', 
    },
    { 
      Header: 'City', 
      accessor: 'city',
      headerClassName: 'header', 
      },

      { 
        Header: 'Suburb', 
        accessor: 'suburb',
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


  export const TicketTable = ({data}) => 
  {
      return (
      <TableContainer columns={cols} data={data}
      renderRowSubComponent={des} />
     ); 
  };
  
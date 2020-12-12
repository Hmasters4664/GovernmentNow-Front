import React, { Component, useEffect, useState } from 'react';
import TableContainer from "./tablecontainer"
import { SelectColumnFilter } from './filter.jsx';

const allergens_col = [    
    {
    Header: 'Name', 
    accessor: 'name',
    Filter: SelectColumnFilter,
    filter: 'equals',
    headerClassName: 'header',
    },
    { 
    Header: 'Severity', 
    accessor: 'severity_name',
    headerClassName: 'header', 
    },{ 
        Header: 'Date discovered', 
        headerClassName: 'header',
        accessor: 'date_discovered' 
        }
    ]; 

    export const AllergensTableLight = ({data}) => 
    {
        return (
        <TableContainer columns={allergens_col} data={data}/>
       ); 
   };
    
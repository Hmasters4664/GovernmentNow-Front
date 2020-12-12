import React, { Component, useEffect, useState } from 'react';
import TableContainer from "./tablecontainer"
import { SelectColumnFilter } from './filter.jsx';

const conditions_col
= [
 {
 Header: 'Name', 
 accessor: 'name',
 Filter: SelectColumnFilter,
 filter: 'equals',
 headerClassName: 'header',
 },
 { 
 Header: 'Type', 
 accessor: 'type_name',
 headerClassName: 'header', 
 },{ 
     Header: 'Date', 
     headerClassName: 'header',
     accessor: 'date_discovered' 
     }
 ]; 


 export const ConditionsTableLight = ({data}) => 
 {
     return (
     <TableContainer columns={conditions_col} data={data}/>
    ); 
};
 
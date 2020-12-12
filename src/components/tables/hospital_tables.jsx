import React, { Component, useEffect, useState } from 'react';
import TableContainer from "./tablecontainer"
import { SelectColumnFilter } from './filter.jsx';

const hospital_col
= [
 {
 Header: 'Reason', 
 accessor: 'reason',
 Filter: SelectColumnFilter,
 filter: 'equals',
 headerClassName: 'header',
 },
 { 
 Header: 'Duration', 
 accessor: 'duration',
 headerClassName: 'header', 
 },{ 
     Header: 'Admission Date', 
     headerClassName: 'header',
     accessor: 'admission_date' 
     }
 ]; 




export const HospitalTableLight = ({data}) => 
{
    return (
    <TableContainer columns={hospital_col} data={data}/>
   ); 
};
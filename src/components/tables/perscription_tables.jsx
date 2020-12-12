import React, { Component, useEffect, useState } from 'react';
import TableContainer from "./tablecontainer"
import { SelectColumnFilter } from './filter.jsx';

const perscriptions_col
    = [
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
         }
    
     ]; 

     export const PerscriptionTableLight = ({data}) => 
     {
         return (
         <TableContainer columns={perscriptions_col} data={data}/>
        ); 
    };
     
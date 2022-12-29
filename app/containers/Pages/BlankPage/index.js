import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import StrippedTable from '../Table/StrippedTable';
import { useState, useEffect } from 'react';

import "./index.css"

function BlankPage() {
  const title = brand.name + ' - Clients';
  const description = brand.desc;
  const [users, setUsers] = useState([])
  

useEffect(() => {

  fetch("https://app-optimumsolutions.ch/api/users/getAll",{
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    
})
    .then((res) => res.json())
    .then((data) => {
 
  setUsers(data.data)

    });
}, []);



  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Clients" desc="Toutes les informations utilisateur">
      </PapperBlock>
     
      <>
       {           
          <StrippedTable users={users}></StrippedTable>        
       }
       </>
      
    </div>
  );
}

export default BlankPage;

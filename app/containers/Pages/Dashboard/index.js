import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import CompossedLineBarArea from './CompossedLineBarArea';
import StrippedTable from '../Table/StrippedTable';
import { useForm } from 'react-hook-form';
import "../Dashboard/style.css"
import axios from 'axios';
import { Box } from '@material-ui/core';

function BasicTable() {
  const title = brand.name + ' - Utilisateurs';
  const description = brand.desc;

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

 

  const [FileSelect, setFileSelect] = useState(0)
  const [FileSelect1, setFileSelect1] = useState(0)
  const [FileSelect2, setFileSelect2] = useState(0)
  const [FileSelect3, setFileSelect3] = useState(0)
  const [FileSelect4, setFileSelect4] = useState(0)
  const [FileSelect5, setFileSelect5] = useState(0)
  const [FileSelect6, setFileSelect6] = useState(0)
  const [FileSelect7, setFileSelect7] = useState(0)
  const [FileSelect8, setFileSelect8] = useState(0)
  const [FileSelect9, setFileSelect9] = useState(0)
  const [FileSelect10, setFileSelect10] = useState(0)


  const [valueForm, setValueForm] = useState([]);

  const onSubmit = values => {
    // const history = useHistory();
    console.log(values)
    axios.post("https://app-optimumsolutions.ch/api/authentication/register", values )
    .then((res) => {
      console.log('res',res);
      setTimeout(() => {
        setValueForm(values);
        window.location.reload(false);
        // console.log(`You submitted:\n\n${valueForm}`);
        // window.location.href = '/app';
        // history.push("/login");
      }, 500);
     

    })

    
  };

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

      <PapperBlock title="Utilisateurs" overflowX></PapperBlock>

      <Fragment>
        <div className='a'>
        <form onSubmit={handleSubmit(onSubmit)}>

      <label>Nom:</label>
      <input defaultValue="" {...register("nomUser", { required: true })} type="text" onChange={() => setFileSelect(1)}/> 
      {errors?.nomUser?.type === "required" && <p className='erroeMassage'>Nom est requis</p>} 

      <label>Prénom:</label>
      <input defaultValue="" {...register("prenomUser", { required: true })} type="text" onChange={() => setFileSelect1(1)}/>   
      {errors?.prenomUser?.type === "required" && <p className='erroeMassage'>Prénom est requis</p>}

      <label>Date de Naissance:</label>
      <input defaultValue="" {...register("birthdayUser", { required: true,  })} type="date" onChange={() => setFileSelect2(1)}/> 
      {errors?.birthdayUser?.type === "required" && <p className='erroeMassage'>Date de Naissance est requis</p>}

      <label>Nationalité:</label>
      <input defaultValue="" {...register("nationalityUser", { required: true })} type="text" onChange={() => setFileSelect3(1)}/>  
      {errors?.nationalityUser?.type === "required" && <p className='erroeMassage'>Nationalité est requis</p>}

      <label>Adresse:</label>
      <input defaultValue="" {...register("adrUser", { required: true })} onChange={() => setFileSelect4(1)}/>  
      {errors?.adrUser?.type === "required" && <p className='erroeMassage'>Adresse est requis</p>}

      <label>NPA:</label>
      <input defaultValue="" {...register("postalUser", { required: true })} type="text" onChange={() => setFileSelect5(1)}/>  
      {errors?.postalUser?.type === "required" && <p className='erroeMassage'>NPA est requis</p>}

      <label>Localité:</label>
      <input defaultValue="" {...register("localityUser", { required: true })} type="text" onChange={() => setFileSelect6(1)}/>  
      {errors?.localityUser?.type === "required" && <p className='erroeMassage'>Localité est requis</p>}

      {/* <label>codeCounsellor:</label> */}
      <input defaultValue="null" {...register("codeCounsellor")} type="hidden"/>  

      <label>Téléphone:</label>
      <input defaultValue="" {...register("telUser", { required: true})} type="Number" onChange={() => setFileSelect7(1)} onKeyDown={(e) =>["e", "E", "-"].includes(e.key) && e.preventDefault()}/>  
      {errors?.telUser?.type === "required" && <p className='erroeMassage'>Téléphone est requis</p>}

      <label>Email:</label>
      <input defaultValue="" {...register("emailUser" , { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  } )}  type="email" onChange={() => setFileSelect8(1)}/>
      {errors?.emailUser?.type === "required" && <p className='erroeMassage'>Email est requis</p>}

      <label>Mot de passe:</label> 
      <input defaultValue="" {...register("passwordUser", { required: true, pattern: /^(?=.*\d).{8,16}$/ })} type="password" onChange={() => setFileSelect9(1)}/>  
      {errors?.passwordUser?.type === "required" && <p className='erroeMassage'>Mot de passe est requis</p>}  

      {/* <label>photoUser:</label> */}
      <input defaultValue="" {...register("photoUser")} type="hidden"/>   

      {/* <label>validiteAdresse</label> */}
      <input defaultValue="null" {...register("validiteAdresse")} type="hidden"/>   

      <label>Rôle:</label>
      <select {...register("typeusers.nomTypeUser", { required: true })} onChange={() => setFileSelect10(1)}>
            <option value=""> Indiquez l’état de l’assurance </option>
            <option value="admin">admin</option>
            <option value="conseiller">conseiller</option>

      </select>
      {errors?.typeusers?.nomTypeUser?.type === "required" && <p className='erroeMassage'>Rôle est requis</p>}  

     {/* <Box sx={{ mt: 5 }}>
     <input type="submit" value="nous faire parvenir"/>
     </Box> */}
     <Box sx={{ mt: 5 }}>

<input type="reset" value="réinitialiser" onClick={() => setFileSelect(0)}/>
</Box>

     {FileSelect&&FileSelect1&&FileSelect2&&FileSelect3&&FileSelect4&&FileSelect5&&FileSelect6&&FileSelect7&&FileSelect8&&FileSelect9&&FileSelect10?<Box sx={{ mt: 5 }}>
     <input type="submit" value="nous faire parvenir"/>
     </Box>: <Box sx={{ mt: 5 }}>
     <input type="submit" value="nous faire parvenir" disabled="disabled"/>
     </Box>

     }
   
    </form>
        </div>
      </Fragment>
      
   
      

    </div>
  );
}

export default BasicTable;

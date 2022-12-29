import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PapperBlock } from "dan-components";
import { textAlign } from "@mui/system";

const Details = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    fetch(`https://app-optimumsolutions.ch/api/admin/mandat-user-get/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
      });
  }, []);

  console.log(item);
  return (
    <div>
      <PapperBlock
        title="Admin Details"
        whiteBg
        icon="ion-ios-menu-outline"
        desc="Gestion de l'assurance des utilisateurs"
      ></PapperBlock>
      <div style={{ 
        width:"50%",
        backgroundColor:"white",
        boxShadow:"5px 10px 20px #E5E4E2",
        margin:"auto",
        borderRadius:"10px",
      //  border:"1px solid gray",
       padding:"40px 10px",
        textAlign:"center" }}>
        <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>nom:</span>
          {item?.user?.nomUser}
        </p>
        <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>
            Prénom:
          </span>
          {item?.user?.prenomUser}
        </p>
        <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>
            Date de Naissance:
          </span>
          {item?.user?.birthdayUser}
        </p>
        <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>
            Nationalité:
          </span>
          {item?.user?.nationalityUser}
        </p>
        <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>
            Adresse:
          </span>
          {item?.user?.nationalityUser}
        </p>
        <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>
            PostalUser:
          </span>
          {item?.user?.postalUser}
        </p>
        <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>
            LocalityUser:
          </span>
          {item?.user?.localityUser}
        </p>
        <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>
            CodeCounsellor:
          </span>
          {item?.user?.codeCounsellor}
        </p>
        <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>
            Téléphone:
          </span>{" "}
          {item?.user?.telUser}
        </p>
        <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>
            Email:
          </span>
          {item?.user?.emailUser}
        </p>
        <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>
            Validité Adresse:
          </span>
          {item?.user?.validiteAdresse}
        </p>
        {/* <p style={{padding:"25px 0", borderBottom:"1px solid skyblue",margin:'0'}}>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: "15px" }}>Rôle:</span>
          {item?.user?.typeusers?.nomTypeUser}
        </p> */}
      </div>
    </div>
  );
};

export default Details;

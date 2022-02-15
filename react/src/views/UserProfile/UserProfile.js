import React, { useEffect, useState } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import Diagram from './userDiagram'
import Weight from './uploadImgWeigth'
import Details from './userDetails'
import Menu from './menuDisplay'
import Bmi from './bmi'
import Orders from './orders'
import { useSelector, useDispatch } from "react-redux";
import Chat from '../Chat/WelcomeScreen'
import { BsChatQuote } from 'react-icons/bs';
import { updateCustomer,updateCurrentUser,getAllCustomers,updateChat} from "../../actions/customer";
import { Redirect } from 'react-router';
import { Button } from "semantic-ui-react";
import './profile.css';

const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF",
      },
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1",
      },
    },
  };
  
  const useStyles = makeStyles(styles);
  
export default function UserProfile() {

    const classes = useStyles();
    const data = useSelector((state) => state.customerReducer);
    const dispatch = useDispatch();
    const [startChat,setStartChat]=useState(false)

    if(startChat==true){
        return <Redirect from="/admin/orders" to='/admin/welcome'></Redirect>
        // return <Redirect from="/admin/orders" to={`/admin/welcome/${mail}/${room}`}></Redirect>
        }
    return (
        <GridContainer>
              <GridItem  xs={12} sm={4} md={4} lg={4}><Details/></GridItem>
              <GridItem  xs={12} sm={4} md={4} lg={12}><Diagram/></GridItem>
              <h6 class="bmi" ><Bmi/></h6>
              <GridItem class="weight" xs={12} sm={4} md={4} lg={4}><Weight/></GridItem>
              <GridItem class="orders" xs={12} sm={4} md={4} lg={12}><Orders/></GridItem>
              <GridItem  xs={12} sm={4} md={4} lg={12}><Menu/></GridItem>
              <GridItem  xs={12} sm={4} md={4} lg={12}>
                <br/>
              <Button color="purple" onClick={async()=>{await dispatch(updateChat(data?.currentUser?._id)),setStartChat(true)}}><BsChatQuote/>התחל צ'אט עם המדריכה</Button>
              </GridItem>
        </GridContainer>
    )
}
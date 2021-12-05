import React, { useRef, useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import ChartistGraph from "react-chartist";
import {
  dailyWeightChart,
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AccessTime from "@material-ui/icons/AccessTime";
import avatar from "assets/img/faces/marc.jpg";
import 'semantic-ui-css/semantic.min.css';
import { Form, Checkbox, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { getAllCustomers, postCustomer } from "../../actions/customer";
import axios from "axios";
import styles1 from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// import WeigthImg from './weightImg'
import WeigthImg from './uploadImgWeigth'
import UserDetails from './userDetails'
import MenuFunc from './menuDisplay'
import Table from "components/Table/Table.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  header: {
    direction: "rtl",
    textAlign: " right",
    _msthash: "1834274",
    _msttexthash: "5953194"
  },
  p: {
    direction: "rtl",
    textAlign: "right",
    _msthash: "1704807",
    _msttexthash: "18080270"
  }
};

const useStyles = makeStyles(styles,styles1);

export default function UserDiagram(){


let arrWeigth = dailyWeightChart?.data.series[0];
let options = {
  lineSmooth: Chartist.Interpolation.cardinal({
    tension: 0,
  }),
  low: 0,
  // high: 100,
  high: Math.max( ...arrWeigth )+20,
  chartPadding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}
let arrDates = dailyWeightChart?.data.labels

const classes = useStyles();

const diff = Date.parse(new Date()) - Date.parse(arrDates[arrDates.length-1]) 
var diffDays = Math.round(diff / (1000 * 60 * 60 * 24));

// useEffect(() => {
// alert(JSON.stringify(dailyWeightChart.data) )
// alert(JSON.stringify(arrWeigth) )
// alert(JSON.stringify(arrDates) )
// alert(JSON.stringify(diffDays) )
// }, )


  return(
    <>
    {/* <h1>This is Profile Component!</h1> */}
    <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color={arrWeigth[0]>arrWeigth[arrWeigth.length-1]?"success":"danger"}>
            {/* <CardHeader color="success"> */}
              <ChartistGraph
                className="ct-chart"
                data={dailyWeightChart.data}
                type="Line"
                options={options}
                // options={dailyWeightChart.options}
                listener={dailyWeightChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>דיאגרמת הצלחות ירידה במשקל</h4>
              <p className={classes.cardCategory}>
               <span className={classes.successText}>
               {arrWeigth[0]-arrWeigth[arrWeigth.length-1]>0?" ירדת השבוע ":"עלית השבוע"}{arrWeigth[0]-arrWeigth[arrWeigth.length-1] +"קילו "}
                  {/* <ArrowUpward className={classes.upArrowCardCategory} /> 95% */}
                </span>{" "}
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> התעדכן לאחרונה לפני {diffDays} ימים
                {/* <AccessTime /> התעדכן לאחרונה לפני2 ימים */}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        </GridContainer>
       
    </>
  )
}



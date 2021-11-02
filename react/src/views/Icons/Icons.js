//בדף זה נציג את האזור האישי של המשתמש בו יהיה הצ'ט עם המדריכה ודיאגרמת משקל
//ומחשבון bmi

/*eslint-disable*/
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { connect } from "react-redux";
import { getAllCustomers } from "../../actions/customer";
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import { cardHeader } from "assets/jss/material-dashboard-react";
import Paper from '@material-ui/core/Paper';

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const data = [
  { argument: 1, value: 10 },
  { argument: 2, value: 20 },
  { argument: 3, value: 30 },
];

const useStyles = makeStyles(styles);
function Icons(props) {
  let maxLostWeight = 0;
  let [nameOfWinner, setNameOfWinner] = useState("");

  const winner = () => {
    console.log("winner ");
    console.log(props.arr);
    props.arr ? props.arr.forEach(element => {
      if (parseFloat(element.customerWeights[element.customerWeights.length - 2].currentWeight) -
        parseFloat(element.customerWeights[element.customerWeights.length - 1].currentWeight) > maxLostWeight) {
        maxLostWeight = parseFloat(element.customerWeights[element.customerWeights.length - 2].currentWeight) -
          parseFloat(element.customerWeights[element.customerWeights.length - 1].currentWeight);
          let name=element.name + " " + element.lastName;
        setNameOfWinner (name) ;
        console.log(nameOfWinner);
      }
    }
    ) : null
  }
  const intreduceWinner = () => {
    return <p>{nameOfWinner}</p>
  }
  useEffect(() => {
    props.getAllCustomers();
  }, [])
  useEffect(() => {
    winner();
  }, [props.arr])
  const classes = useStyles();
  return (
    <>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>המרתונים השבועיים שלנו</h4>
            <p className={classes.cardCategoryWhite}>
              herbalife  רד במשקל בדרך נכונה ובריאה וזכה בפרס מתנת {" "}
              {/* <a
                href="https://design.google.com/icons/?ref=creativetime"
                target="_blank"
              >
                Google
              </a> */}
            </p>
          </CardHeader>
          <CardBody>
            {/* <Hidden only={["sm", "xs"]}>
              <iframe
                className={classes.iframe}
                src="https://material.io/icons/"
                title="Icons iframe"
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            </Hidden> */}
            {/* <Hidden only={["lg", "md"]}>
              <GridItem xs={12} sm={12} md={6}>
                <h5>
                  The icons are visible on Desktop mode inside an iframe. Since
                  the iframe is not working on Mobile and Tablets please visit
                  the icons on their original page on Google. Check the
                  <a
                    href="https://design.google.com/icons/?ref=creativetime"
                    target="_blank"
                  >
                    Material Icons
                  </a>
                </h5>
              </GridItem>
            </Hidden> */}

            <div>
              <h3>:הזוכה השבועי שלנו</h3>
              {intreduceWinner()}

            </div>
          </CardBody>
        </Card>
      </GridItem>
     
    </GridContainer>
    
     <Paper>
      <Chart
        data={data}
      >
        <ArgumentAxis />
        <ValueAxis />
    
        <LineSeries valueField="value" argumentField="argument" />
      </Chart>
    </Paper>
    </>
    
  );

}
const mapStateToProps = (state) => {

  return { arr: state.customerReducer.customerArr };
}
export default connect(mapStateToProps, { getAllCustomers })(Icons);
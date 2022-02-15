//דף זה הוא דף הבית כאן אמור להיות תמונה מתאימה והסבר על האתר שלנו


//דף זה הוא דף הבית כאן אמור להיות תמונה מתאימה והסבר על האתר שלנו



import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import pic1 from "../../assets/img/images (7).jpg"
import pic2 from "../../assets/img/images (3).jpg"
import pic3 from "../../assets/img/images (5).jpg"

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { style } from "@material-ui/system";

const useStyles = makeStyles(styles);
// const styles={
// onePis:{
//   color: "red",
// }
// }
export default function Dashboard() {
  const classes = useStyles();
  return (

    <div>
      <div >

        {/* <img src={pic2} width="50" height="50" /> */}

        <h1 >HEALTHY LIFE STYLE</h1>
        <img src={pic1} width="250" height="150" />
        <img src={pic2} width="250" height="150" />
        <img src={pic3} width="250" height="150" />

        <h3>אתרינו מיועד לאנשים/נשים שמעונינים לעצב ולחטב את גופם בבריאות</h3>
        <h3>תהילה -מדריכת תזונה מוסמכת תלווה כל אחד ואחד בדרכו אל השגת היעד</h3>
        <h3>תהליך ההרזיה יבוצע על ידי נטילת תכשירי בריאות שיומלצו ללקוח על </h3>
        <h3>פי נתוניו תוך ליווי מלא של המדריכה בצאט פרטי</h3>
        <h3>באתרינו ישנם תחרויות לעמידה ביעדים שתציב המדריכה אשר יתוגמלו בפרסים</h3>
        <h3>אתר זה יעניק לכם חווית בריאות קסומה יחס אישי והרבה כוח להגשים יעדים</h3>
        <h3>כאן תוכלו להנות מתהליך העיצוב תוך אפשרות שיתוף חבריכם בצאט כללי</h3>
        <h3>תוכלו לעודד חברים, ולהיתעדכן במשך כל שעות היום מהמתרחש באתר</h3>
        <h3>בבכרכת הצלחה והגשמה</h3>
        
        <h3>שלכם תהילה...</h3>
      </div>
</div>
  );
}

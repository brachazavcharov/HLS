import {useSelector,useDispatch} from 'react-redux'
import React,{useEffect, useState} from 'react'
import {saveCustomers, getAllCustomers} from "../../actions/customer";
import { getAllProducts } from "../../actions/product";
import axios from 'axios'
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AccessTime from "@material-ui/icons/AccessTime";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import styles1 from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { ImWink } from "react-icons/im";
import { Button } from 'semantic-ui-react';
// import { Bu } from 'components/CustomButtons/Button';

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

export default function Competition(){
const data = useSelector((state) => state);
const dispatch = useDispatch();
const [arrWeight,setArrWeight]= useState([])
const [gift,setGift]= useState()
const [isChoose,setIsChoose]= useState(false)
const [competition,setCompetition]= useState([])
const [addP,setAddP]= useState(false)
const classes = useStyles();

useEffect(() => {
  //dispatch(getAllCustomers())
  dispatch(getAllProducts())
  axios.get("http://localhost:5000/customer").then(succ => {
    debugger
    console.log(succ);
    dispatch(saveCustomers(succ.data));
    initArr(succ.data)
}).catch(ee => { console.log(ee.message) });
axios.get('http://localhost:5000/CompetitionFiles').then(succ => {
  setCompetition(succ?.data[succ.data.length-1])})
  .catch(e => { console.log(e.message)})
}, [])

function initArr(customerArr){//  הפונקציה עוברת על מערך המשקלים של הלקוחות ,בלי המדריכה
  // על מנת להציג את הספקי הירידה במשקל המשתמשים בדיאגרמה
 customerArr=customerArr?.filter(x => x.mail !== data.customerReducer.AdminEmail)
 let weightArr = customerArr?.map(x=>
  {
    if(x.customerWeights?.length>7)
    return {WeightLoss:x.customerWeights[x.customerWeights?.length-8]?.currentWeight-x
      .customerWeights[x.customerWeights?.length-1]?.currentWeight,name:x.name+" "+x.lastName}
   else
   return {WeightLoss:x.customerWeights[0]?.currentWeight-x.
    customerWeights[x.customerWeights?.length-1]?.currentWeight,name:x.name+" "+x.lastName
  }})
 weightArr=weightArr?.filter(x=>!isNaN(x.WeightLoss))
 weightArr?.sort((a,b)=>a.WeightLoss - b.WeightLoss)
  setArrWeight(weightArr)
}

var delays = 80,
  durations = 500;

 function finishCompetition(){
  var data = JSON.stringify({
    "isEnded": true
  });
  
  var config = {
    method: 'put',
    url: 'http://localhost:5000/CompetitionFiles/61ac12c01c026443b804b201',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.put('http://localhost:5000/CompetitionFiles/'+competition._id,{isEnded:true})
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    setCompetition(response.data)
    setAddP(false)
    setIsChoose(false)
  })
  .catch(function (error) {
    console.log(error);
  });
  
 }

const competitionChart = {
  data: {
    series:[arrWeight?.map(x=>x.WeightLoss)],
    // labels : ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
    labels: arrWeight?.map(x=>x.name)
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high:arrWeight[arrWeight.length-1]?.WeightLoss+10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  // for animation
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};
function chooseGift(e){
debugger
e.preventDefault();
let giftobj = {}
giftobj.name = e.target.name.value || 'תחרות שבועית',
giftobj.date = new Date()
giftobj.details = e.target.details.value || 'ירידה מירבית במשקל',
giftobj.prize = data?.productReducer?.productArr?.find(x=>x._id == gift)?.name
// giftobj.winningRecipeId = 'c'
giftobj.endDate= e.target.endDate.value || new Date()+7,

axios.post('http://localhost:5000/CompetitionFiles',giftobj)
.then(r=>{setCompetition(r.data)})
.catch(err=>console.log(err))
}

return (
  <>
  <GridContainer>
  <GridItem xs={12} sm={12} md={4} lg={4}>
    <Card chart>
      <CardHeader color="success">
        <ChartistGraph
          className="ct-chart"
          data={competitionChart.data}
          type="Line"
          options={competitionChart.options}
          listener={competitionChart.animation}
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>תחרות שבועית ירידה  במשקל</h4>
        <p className={classes.cardCategory}>
         <span className={classes.successText}> 
         {competition?.isEnded?<>
           <h3>הזוכה בתחרות {arrWeight[arrWeight.length-1]?.name}</h3>
            {/* <ArrowUpward className={classes.upArrowCardCategory} />  */}
            <ImWink></ImWink></>:null}
          </span>{" "}
        </p>
      </CardBody>
      <CardFooter chart>
        <div className={classes.stats}>
          {/* <AccessTime /> התעדכן לאחרונה לפני {diffDays} ימים */}
          {/* <AccessTime /> התעדכן לאחרונה לפני2 ימים */}
        </div>
      </CardFooter>
    </Card>
  </GridItem>
  <GridItem>
    <div>
  {data?.customerReducer?.userAuth=='a'&&competition?.isEnded?<>
   {addP==false?<Button color="purple" onClick={()=>setAddP(true)}>הוסף תחרות חדשה</Button>:null}
   {addP==true?<>
  <h4>בחר מוצר מתנה לתחרות</h4><ul>
   {data?.productReducer?.productArr?.map((item,key)=>(
     <GridItem lg={3} key={key}>
       <li >
       {item.name}
        <img src={item.img} style={{width:'80px'}}></img>
        <input type="checkbox" disabled={isChoose&&gift!=item._id?true:false} onClick={(e)=>
        {if(e.target.checked){setGift(item._id)
          setIsChoose(true)}
          else {setIsChoose(false),setGift(null)}}}></input></li>
     </GridItem>
   ))
   }</ul>
   <form onSubmit={(e)=>chooseGift(e)}> 
   <h4>הכנס פרטים</h4>
   <input type='text' id='name' placeholder='הכנס שם תחרות'></input>
   <input type='text' id='details' placeholder='הכנס פרטי תחרות'></input>
   <input type='date' id='endDate' placeholder='הכנס תאריך סיום '></input>
   <Button color='google plus' color="purple" disabled={!isChoose}>אישור</Button>
   </form></>:null}
   </>:null}
     {data?.customerReducer?.userAuth=='a'&&competition?.isEnded==false?
     <Button color="purple" onClick={()=>finishCompetition()}>הכרז על סיום תחרות</Button>:null}
     </div>
   </GridItem>
   {competition?.isEnded==false||data?.customerReducer?.userAuth!='a'&&competition?.isEnded?<>
   <GridItem>
  <h2>מתנה</h2>
  <h1>{competition.prize}</h1>
  <img src={data?.productReducer?.productArr?.find(x=>x.name==competition.prize)?.img} width='200px'></img>
   </GridItem>
   </>:null}
   {competition?.isEnded==false?<GridItem>
     <h3>{competition?.name}</h3>
     <h3>פרטי התחרות: {competition?.details}</h3>
     <h3>תאריך סיום: {new Date(competition?.endDate).toLocaleDateString()}</h3>
     </GridItem>:null}
  </GridContainer>
 </>
)
}
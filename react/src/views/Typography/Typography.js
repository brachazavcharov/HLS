//דף זה יהיה סל הקניות שהמשתמש בחר 

import 'semantic-ui-css/semantic.min.css';

//import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Quote from "components/Typography/Quote.js";
import Muted from "components/Typography/Muted.js";
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import React, { useEffect, useState } from 'react'
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import { useSelector, useDispatch } from "react-redux";
import { selecteProduct, deleteSelectedProduct } from '../../actions/product';
import { connect } from "react-redux";
import axios from "axios";

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
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
};

const useStyles = makeStyles(styles);

function TypographyPage(props) {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.customerReducer);
  const classes = useStyles();
  const [orderDate, setOrderDate] = useState(true);
  const [quantity, setQuantity] = useState(true);
  const [customerId, setCustomerId] = useState(true);
  const [productId, setProductId] = useState(true);
  const [x, setX] = useState(false);
  const [arrSelected,setArrSelected] = useState([])


  // useEffect(() => {
  //   let order = {
  //     orderDate: orderDate,
  //     quantity: quantity,
  //     customerId: customerId,
  //     productId: productId
  //   };
  //   axios.post("http://localhost:5000/order", order)
  //     .then(res =>
  //       console.log(res));
  //   console.log("ההזמנה נכנסה למערכת");
  // }, [])

  const submit1 = () => {
    debugger
    // setX(true);
    let order={}
    //צריך לבדוק אם יש מוצרים במערך אם יש לעבור עליהם אחד אחד ולהוסיף אותם 
    props.arr?.map((item,key)=>{
      order.orderDate = new Date()
      order.quantity = item.quantity || 1
      order.customerId = data.currentUser._id
      order.productId = item._id
      axios.post("http://localhost:5000/order", order)
      .then(res =>{
        console.log(res)
        console.log("ההזמנה נכנסה למערכת")
        setX(true);
      })
    .catch(err=>console.log(err))
    })
    //if()
    //map...
    //אני דבר ראשון צריכה לשלוף את האידי של המשתמש
    //ולהוסיף אותו דרך הסט לפרטי הזמנה
    // setCustomerId()
    //להכניס את תאריך הלחיצה 
    //setOrderDate();
    //להכניס את האידי של המוצר 
    // setProductId();
   // setQuantity(1);
  }

  useEffect(() => {
    console.log("use effect start");
    props.selectedProducts;
    setArrSelected(props.arr)
    console.log("use effect end");
  }, []);
  const [arr, setarr] = useState();

  // const delateSelected = (e) => {

  //   let newArr = [];
  //   props.arr.map(i => {
  //     if (e.name !== i.name) {
  //       newArr.push(e);
  //     }
  //   });
  //   props.delete(newArr);
  // }

  function delateSelected(id){
    debugger
    setArrSelected(arrSelected.filter(x =>x._id!=id))
  }

  return (


    <Card>
      {x && <div class="ui success message">
        <i class="close icon" onClick={() => setX(false)}></i>
        <div class="header" > ההזמנה נשלחה למדריכה </div>
        <p>המדריכה תיצור איתך קשר בהקדם</p>
      </div>}
      <CardBody>
      {props.arr.length!=0?<div><Table
          tableHeaderColor="primary"
          tableHead={["הסרה", "תיאור", "שם מוצר","כמות", "תמונה"]}
          tableData={
            props.arr ?
            arrSelected?.map(i => {
                return (
                  [<input onClick={() => delateSelected(i._id)} type="button" value="הסר מהסל" />, i.description, i.name,<input type='number' defaultValue="1" min="1" max="5" onChange={(e)=>{i.quantity=e.target.value}}/>, <img src={i.img} />]
                )
              }) : null} />
     <Button color="primary" onClick={() => { submit1() }}>שלח הזמנה למדריכה</Button>
     </div>:<div class="ui success message">
        <i class="close icon" onClick={() => setX(false)}></i>
        <div class="header" >סל הקניות שלך ריק </div>
        <p>בחר מוצרים</p>
      </div>}
      </CardBody>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (event) => dispatch(deleteSelectedProduct(event)),
  }
}
const mapStateToProps = (state) => {
  return {
    arr: state.productReducer.selectedProducts,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TypographyPage);
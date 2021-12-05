//דף זה יהיה דף הקניות בו המדריכה תזריך מוצרים מומלצים ללקוח ולחצן הוספה לסל
//נצטרך לשנות את הטבלאות הנתונות המוצרים ולהוסיף עמודה של תמונה 
//כמובן שצריך לשנות את שמות המשתנים מאנשים למוצרים
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../actions/product';
import { connect } from "react-redux";
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios';

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

function TableList(props) {

  const [arrReccomend,setArrReccomend]=useState([])
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customerReducer);

  const classes = useStyles();
  useEffect(() => {
    console.log("use effect start");
    props.getAllProducts();
    console.log("use effect end");
    axios.get('http://localhost:5000/recommendedProducts')
    .then(response=> {
      debugger
      console.log(JSON.stringify(response.data));
      setArrReccomend(response.data)
    })
    .catch(error=>console.log(error))
    
  
  }, []);

  const add = (e) => {
    debugger;
  if(props.selectedProducts.find(x=> x._id==e._id)==undefined)
      props.selectedProducts.push(e);
    console.log(props.selectedProducts);
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>מוצרים</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["הסרה", "תיאור","שם מוצר" , "תמונה"]}
              tableData={
                props.arr ?
                  props.arr.map(i => {
                    return (
                      [<div>{arrReccomend.find(x=>x.productId==i._id&&x.customerId==data?.currentUser?._id)!=undefined?<h2 style={{backgroundColor:'red',textAlign:'center',color:'white'}}>מוצר מומלץ</h2>:null}<input onClick={()=>{add(i)}} type="button" value="הוסף לסל"/></div>, i.description,i.name , <img src={i.img} />]
                    )
                  })
                  : null
              }
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
      </GridItem>
    </GridContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    arr: state.productReducer.productArr,
    selectedProducts: state.productReducer.selectedProducts
  };
}
export default connect(mapStateToProps, { getAllProducts })(TableList);

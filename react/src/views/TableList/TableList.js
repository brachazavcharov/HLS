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
import { getAllProducts ,deleteProduct,addProduct} from '../../actions/product';
import { connect } from "react-redux";
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios';
import { Button } from "semantic-ui-react";

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

  const [arrReccomend,setArrReccomend] = useState([])
  const [name,setName]= useState()
  const [description,setDescription] = useState()
  const [img,setImg] = useState()
  const [isAdd,setIsAdd] = useState(false)
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customerReducer);
  // const dataProduct = useSelector((state) => state.productReducer);

  const classes = useStyles();
  useEffect(async () => {
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

  function addProductFunc(){
    debugger

    axios.post('http://localhost:5000/product',{name:name,description:description})
    .then(r=>{
      console.log(JSON.stringify(r.data));
       const formData = new FormData()
       formData.append('img', img)
       axios.post("http://localhost:5000/product/"+r.data._id ,formData,{
           "Content-Type": "form-data"
         }).then(res => {
           debugger
           console.log(res)
           dispatch(addProduct(res.data))
           setIsAdd(false);
       }).catch(err=>console.log(err))
       //
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function removeProduct(id){

axios.delete('http://localhost:5000/product/'+id)
.then(r=>{
  console.log(JSON.stringify(r.data));
  dispatch(deleteProduct(id))
})
.catch(function (error) {
  console.log(error);
});
  }

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
                      [<div>
                        {arrReccomend.find(x=>x.productId==i._id&&x.customerId==data?.currentUser?._id)!=undefined?<h2 style={{backgroundColor:'red',textAlign:'center',color:'white'}}>מוצר מומלץ</h2>:null}
                        {data?.userAuth=='a'?<>
                        <Button onClick={()=>removeProduct(i._id)}  color="purple">הסר מוצר</Button>
                        {/* {isDelete?<h1>המוצר הוסר בהצלחה</h1>:null} */}
                        </>:
                        <Button onClick={()=>{add(i)}}   color="purple" type="button">הוסף לסל</Button>}
                        </div>
                        , i.description,i.name , <img src={i.img} />]
                    )
                  })
                  : null
              }
            />
          </CardBody>
        </Card>
        {data?.userAuth=='a'?<GridItem>{isAdd==false?<Button  color="purple" onClick={()=>setIsAdd(true)}>הוסף מוצר</Button>:<>
          <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="הכנס שם מוצר"></input>
          <input onChange={(e)=>setDescription(e.target.value)}  type="text" placeholder="הכנס תיאור מוצר"></input>
          <lable>בחר תמונת מוצר</lable>
          <input onChange={(e)=>setImg(e.target.files[0])}  type="file"></input>
          <Button disabled={!name||!description||!img}  color="purple" onClick={()=>addProductFunc()}>אישור</Button></>}
        </GridItem>:null}
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

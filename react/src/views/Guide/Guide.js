import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { updateCustomer,updateCurrentUser,getAllCustomers,updateChat, deleteCustomer} from "../../actions/customer";
import { getAllProducts } from "../../actions/product";
import { deleteOrder ,getAllOrders} from "../../actions/order";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import { BsChatQuote } from 'react-icons/bs';
import WelcomeScreen from "views/Chat/WelcomeScreen";
import { Redirect } from 'react-router';
import ChatScreen from '../Chat/ChatScreen';




export default function Guide(props){
    const [arrOrders,setArrOrders]=useState([])
    const [arrReccomend,setArrReccomend]=useState([])
    const [arrIsRec,setArrIsRec]=useState([false])
    const dispatch = useDispatch();
    const data = useSelector((state) => state.customerReducer);
    const dataProduct = useSelector((state) => state.productReducer);
    const dataOrders = useSelector((state) => state.orderReducer);
    // const [arrReccomendedProduct,setArrReccomendedProduct] = useState([])
    const [breakfast,setBreakfast]=useState('')
    const [lunch,setLunch]=useState('')
    const [dinner,setDinner]=useState('')
    const [isbreakfast,issetBreakfast]=useState(false)
    const [islunch,issetLunch]=useState(false)
    const [isdinner,issetDinner]=useState(false)
    const [startChat,setStartChat]=useState(false)
    const [mail,setMail]=useState()
    const [room,setRoom]=useState()


    useEffect(() => {
      axios.get('http://localhost:5000/recommendedProducts')
      .then(response=> {
        debugger
        console.log(JSON.stringify(response.data));
        setArrReccomend(response.data)
      })
      .catch(error=>console.log(error))
     
     }, [])

  useEffect(() => { 
  dispatch(getAllCustomers())
  dispatch(getAllProducts())
  // dispatch(getAllOrders())
  axios.get('http://localhost:5000/order')
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    setArrOrders(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
  //  alert(JSON.stringify(data.customerArr))
  
    
   },[])

   if(startChat==true){
    return <Redirect from="/admin/orders" to='/admin/welcome'></Redirect>
    // return <Redirect from="/admin/orders" to={`/admin/welcome/${mail}/${room}`}></Redirect>
    }

   function sendTafrit(e,id){
     debugger
  e.preventDefault();
  const formData = new FormData()
  if(e.target.id=='breakfast')
  formData.append('file',breakfast)
  if(e.target.id=='lunch')
  formData.append('file',lunch)
  if(e.target.id=='dinner')
  formData.append('file',dinner)
  // formData.append('file',e.target.id=='breakfast'?breakfast:'lunch'?lunch:'dinner'?dinner:null)
  axios.patch("http://localhost:5000/customer/"+id+'/'+e.target.id, formData,{
      "Content-Type": "form-data"
    }).then(res => {
      debugger
      console.log(res)
      // setIsChooseImg(true);
  }).catch(err=>console.log(err))
   }

 function confirmOrder(id) {
   debugger
   arrOrders?.map(item=>{
     if(item.customerId==id&&item.isConfirm==false){
    // dispatch(deleteOrder(item._id))

axios.put('http://localhost:5000/order/'+item._id,{isConfirm:true})
.then(response=> {
  console.log(JSON.stringify(response.data));
  dispatch(deleteOrder(id))
  setArrOrders(response.data)
})
.catch(error=> {
  console.log(error);
});
     }
})
}

function deleteCust(id){
axios.delete('http://localhost:5000/customer/'+id)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  dispatch(deleteCustomer(id))
})
.catch(function (error) {
  console.log(error);
});
}

   function reccomendProduct(prodId,custId,isChecked){
     //המדריכה בוחרת ללקוח מוצרים מומלצים והפונקציה אחראית להכניס את כל 
     //המוצרים המומלצים ללקוח זה למערך ומעדכנת אותם או לחילופין מוחקת מוצרים 
    let r ={}
    if(isChecked){
    if(arrReccomend?.find(x=>x.productId==prodId&&x.customerId==custId)==undefined){
    r.customerId = custId
    r.productId = prodId
    axios.post('http://localhost:5000/recommendedProducts',r)
    .then(function (response) {
      setArrReccomend(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    }}
    else{
      let id = arrReccomend.find(x=>x.productId==prodId&&x.customerId==custId)._id
      if(id!=undefined){
      axios.delete('http://localhost:5000/recommendedProducts/'+id)
      .then(function (response) {
        setArrReccomend(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });}
    }
   }

   function updateWeight(e,id){
     debugger
    e.preventDefault();
    if(e.target.weight.value!=""&&e.target.weight.value!=null){
    let user = data.customerArr.find(x=>x._id == id)
    if(user.customerWeights==null&&user.customerWeights==undefined)
    user.customerWeights=[]
    user.customerWeights?.push({date:new Date(),currentWeight:e.target.weight.value})
    dispatch(updateCustomer(user))}
   }
   

   function checkUpdateDisable(i){
   debugger
   if(new Date(i.customerWeights[i.customerWeights.length-1].date).getDate()==new Date().getDate())
   return true
    return false
   }

   function checkChecked(custid,prodid){
     debugger
     arrReccomend?.map(item=>{
     if(item.customerId==custid&&item.productId==prodid)
     return true
     })
     return false
    //  arrReccomend.find(x=>x.productId==prodid&&x.customerId==custid)?true:false
    //arrReccomend.find(x=>x.productId==item._id&&x.customerId==i._id)!=undefined?true:false
   }
  
  // function reccomendToCust(custId){
  //   debugger
  //   let r ={}
  //   if(arrReccomendedProduct!=null&&arrReccomendedProduct!=undefined&&arrReccomendedProduct!=[]&&arrReccomendedProduct.length!=0){
  //   arrReccomendedProduct?.map((item,key)=>{ 
  //     if(arrReccomend.find(x=>x.productId==item&&x.customerId==custId)==undefined){
  //     r.customerId = custId
  //     r.productId = item
  //     // let data = JSON.stringify(r);
  //     axios.post('http://localhost:5000/recommendedProducts',r)
  //     .then(function (response) {
  //       debugger
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //     }
  //   }) 
  //    debugger
  //    arrReccomend?.map((item,key) => {
  //     if(arrReccomendedProduct.find(x=>x==item.productId&&item.customerId==custId)==undefined){
  //     axios.delete('http://localhost:5000/recommendedProducts/'+item._id)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   }
  //   })}

  
 // }
    return (
       //  <h1>GUIDE</h1>
        <Card>
          {/* <div class="ui success message">
            <i class="close icon"></i>
            <div class="header" > ההזמנה נשלחה למדריכה </div>
            <p>המדריכה תיצור איתך קשר בהקדם</p>
          </div> */}
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["פרטי לקוח", "הזמנות לקוח", "מוצרים מומלצים","תמונת משקל","תפריט לקוח","צאט"]}
              tableData={
                  data.customerArr?.filter(x=>x.mail!=data.AdminEmail).map(i => {
                  //  if(i.mail!=data.AdminEmail){
                   return (
                     [
                     <><h3>שם לקוח: {i.name} {i.lastName}</h3><h3>טלפון: {i.phone}</h3></>,<>
                     {arrOrders?.map((item,key)=>(
                     item.customerId==i._id&&item.isConfirm==false?  
                     <div key={key}>
                      <h4>תאריך הזמנה: {new Date(item.orderDate).toLocaleString()}</h4>
                      <h4>כמות: {item.quantity}</h4>
                      <img src={dataProduct?.productArr[dataProduct.productArr?.findIndex(x=>x._id==item.productId)]?.img} style={{ width: "60px" }}/>
                     </div>:null))}
                     {arrOrders?.find(x=>x.customerId==i._id&&x.isConfirm==false)?<Button color="primary" onClick={()=>confirmOrder(i._id)}>אישור הזמנה</Button>:<h3>אין הזמנות ללקוח זה</h3>}
                     {(arrOrders?.find(x=>x.customerId==i._id&&(x.isConfirm==false||(x.isConfirm==true&&Math.round((Date.parse(new Date())-Date.parse(new Date(x.orderDate))) / (1000 * 60 * 60 * 24))<28)))==undefined&&Math.round((Date.parse(new Date())-Date.parse(new Date(i.joinDate))) / (1000 * 60 * 60 * 24))>28)?
                    <> <h2 style={{color:'red'}}>התראה: אין ללקוח זה הזמנות יותר מחודש</h2>
                    <Button color="primary" onClick={()=>deleteCust(i._id)}>הסר לקוח</Button>
                    </>:null}
                      </>,
                      <>{dataProduct?.productArr?.map((item,key)=>(
                        <div key={key}>
                        <h3>{item.name}<input type='checkbox' defaultChecked={arrReccomend?.find(x=>x.customerId==i._id&&x.productId==item._id)!=undefined?true:false} onChange={(e)=>reccomendProduct(item._id,i._id,e.target.checked)}/></h3>
                        <img src={item.img} style={{ width: "60px" }}/>
                        </div>
                      ))}
                      <Button color="primary">עדכן המלצות</Button>
                      </>,
                      <>
                      {new Date(i.weightImg?.date).getDate()<new Date().getDate()||i.weightImg==undefined?<h5>הלקוח עדין לא הכניס תמונת משקל</h5>
                      :<>
                     <img src={i.weightImg?.currentImg} style={{ width: "100px" }}/>
                     {new Date(i.customerWeights[i.customerWeights.length-1].date).getDate()==new Date().getDate()?
                     <h3>המשקל המעודכן הוא {i.customerWeights[i.customerWeights.length-1].currentWeight}</h3>:
                     <form onSubmit={(e)=>updateWeight(e,i._id)}><div><input id='weight' type="text" placeholder="הכנס משקל לקוח"/></div>
                     <Button type="submit" disabled={checkUpdateDisable(i)} color="primary">עדכן משקל</Button></form>}</>
                     }
                      </>,
                      <>
                      <div style={{textAlign: 'center'}}><h5>בחר קובץ תפריט ארוחת בוקר</h5><input name='breakfast' onChange={(e)=>{setBreakfast(e.target.files[0]) ,issetBreakfast(true)}} type='file'/><button  id='breakfast' onClick={(e)=>sendTafrit(e,i._id)} disabled={!isbreakfast}>שלח תפריט ארוחת בוקר</button></div>
                      <div style={{textAlign: 'center'}}><h5>בחר קובץ תפריט ארוחת צהריים</h5><input name='lunch' onChange={(e)=>{setLunch(e.target.files[0]),issetLunch(true)}} type='file'/><button  id='lunch' onClick={(e)=>sendTafrit(e,i._id)} disabled={!islunch}>שלח תפריט ארוחת צהריים</button></div>
                      <div style={{textAlign: 'center'}}><h5>בחר קובץ תפריט ארוחת ערב</h5><input name='dinner' onChange={(e)=>{setDinner(e.target.files[0]),issetDinner(true)}} type='file'/><button  id='dinner' onClick={(e)=>sendTafrit(e,i._id)} disabled={!isdinner}>שלח תפריט ארוחת ערב</button></div>
                      {/* <Button type="submit" color="primary">שלח תפריט ללקוח</Button> */}
                      </>,<>
                      <h3>התחל צ'אט עם לקוח</h3>
                      <Button color="primary" onClick={async()=>{await dispatch(updateChat(i._id)),setStartChat(true)}}><BsChatQuote/></Button>
                      </>
                     ]
                    )
                    })}/>
          </CardBody>
        </Card>
      );
}

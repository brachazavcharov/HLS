import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from "../../actions/product";
import axios from 'axios';

export default function Orders() {
  const [arrOrders, setArrOrders] = useState([]);
  const dataProduct = useSelector((state) => state.productReducer);
  const dispatch = useDispatch()
  const data = useSelector((state) => state.customerReducer);
  const [showOld,setShowOld]= useState(false)
  useEffect(async() => {
  await  dispatch(getAllProducts())
  await  axios
      .get("http://localhost:5000/order")
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setArrOrders(
        response.data
          // item.customerId==i._id&&item.isConfirm==false?
        //   response.data?.filter(x => x.customerId == data.currentUser._id)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>{arrOrders?.find(x=>x.customerId==data?.currentUser?._id&&x.isConfirm==false)?<h2>ההזמנות שלך</h2>:null}
      {arrOrders?.map((item, key) => (
        item.customerId==data?.currentUser?._id&&item.isConfirm==false?
        <div key={key}>
          <h4>תאריך הזמנה: {new Date(item.orderDate).toLocaleString()}</h4>
          <h4>כמות: {item.quantity}</h4>
          <img
            src={
              dataProduct?.productArr[
                dataProduct.productArr?.findIndex(
                  (x) => x._id == item.productId
                )
              ]?.img
            }
            style={{ width: "60px" }}
          />
        </div>:null
        //arrOrders?.find(x=>x.customerId==data?.currentUser?._id&&x.isConfirm==true&&new Date(x.orderDate).getMonth()==new Date().getMonth()&& new Date(x.orderDate).getDate > new Date().getDate()-7)==undefined?<h1>לא הזמנת מוצרים זמן רב</h1>:null
      ))}
      {arrOrders?.find(x=>x.customerId==data?.currentUser?._id&&(x.isConfirm==false||(x.isConfirm==true&&Math.round((Date.parse(new Date())-Date.parse(new Date(x.orderDate))) / (1000 * 60 * 60 * 24))<7)))==undefined?
      <h2 style={{color:'red'}}>התראה: לא הזמנת מוצרים יותר משבוע המדריכה עלולה להסיר אותך</h2>:null}
      {arrOrders?.find(x=>x.customerId==data?.currentUser?._id&&x.isConfirm==true)?<>
      <button onClick={()=>setShowOld(!showOld)}>{showOld?'הסתר':'הצג הזמנות ישנות שלך'}</button>
      {showOld?<>
      {arrOrders?.map((item, key) => (
        item.customerId==data?.currentUser?._id&&item.isConfirm==true?
        <div key={key}>
          <h4>תאריך הזמנה: {new Date(item.orderDate).toLocaleString()}</h4>
          <h4>כמות: {item.quantity}</h4>
          <img
            src={
              dataProduct?.productArr[
                dataProduct.productArr?.findIndex(
                  (x) => x._id == item.productId
                )
              ]?.img
            }
            style={{ width: "60px" }}
          />
        </div>:null
      ))}
      </>:null }
      </>:null}
    </>
  );
}

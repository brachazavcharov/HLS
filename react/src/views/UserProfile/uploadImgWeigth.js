import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { updateCustomer,updateCurrentUser } from "../../actions/customer";


export default function FilesUpload() {
const [isSaveImg, setIsSaveImg] = useState(false);
const [isChooseImg, setIsChooseImg] = useState(false);
const [weightImg, setWeightImg] = useState('')

const dispatch = useDispatch();
const data = useSelector((state) => state.customerReducer);
useEffect(async () => {
    debugger
    if(new Date(data?.currentUser?.weightImg?.date).getDate()<new Date().getDate()&&new Date().getHours()>23)
    setIsSaveImg(false);
    else
    setIsSaveImg(true);
    debugger
  //  }
  }, )

    function onFileChange(e) {
        setWeightImg(e.target.files[0])
    }

   function onSubmit(e) {
        debugger
        e.preventDefault()
        const formData = new FormData()
        formData.append('currentImg', weightImg)
        axios.post("http://localhost:5000/customer/"+data.currentUser._id, formData,{
            "Content-Type": "form-data"
          }).then(res => {
            debugger
            localStorage.setItem('CurrentUser',JSON.stringify(res.data))
            console.log(res)
            setIsChooseImg(true);
        }).catch(err=>console.log(err))
    }

        return (
            <div className="container">
                <div className="row">
                {new Date(data?.currentUser?.customerWeights[data?.currentUser?.customerWeights.length-1].date).getDate()==new Date().getDate()?
                     <h3>המשקל המעודכן הוא {data?.currentUser?.customerWeights[data?.currentUser?.customerWeights.length-1].currentWeight}</h3>:null}
                     {new Date(data?.currentUser?.weightImg?.date).getDate()==new Date().getDate()?<>
                       <h4>תמונת המשקל היומית שלך</h4>
                       <img src={data?.currentUser?.weightImg?.currentImg} style={{ width: "200px" }} /></>:
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="form-group">
                            {!isChooseImg?<input type="file" onChange={(e)=>onFileChange(e)} />:null}
                            <img src={weightImg?URL.createObjectURL(weightImg):""} style={{ width: "200px" }} />
                        </div>
                        <div className="form-group">
                           {weightImg&&!isChooseImg?<button disabled={weightImg?false:true} className="btn btn-primary" type="submit">שלח תמונה למדריכה</button>:null}
                            {isChooseImg?<h2>תמונת המשקל נשלחה למדריכה</h2>:null}
                           
                        </div>
                    </form>}{isSaveImg?null:<h2>עדיין לא הכנסת היום תמונת משקל</h2>}
                </div>
            </div>
        )
 }
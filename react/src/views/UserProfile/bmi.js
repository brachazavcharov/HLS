import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'

export default function Bmi() {
const data = useSelector((state) => state.customerReducer);

return(
 <h3>BMI: {data.currentUser?.customerWeights[data.currentUser?.customerWeights?.length-1].currentWeight/(data.currentUser?.height/100)}</h3>
)
}
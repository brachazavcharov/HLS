import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addCustomer = (customer) => {
    console.log("from action "+customer);
    return {
        type: actionTypes.CUSTOMER_ADDED,
        payload: customer
    }
}
export const deleteCustomer = (_id) => {
    return {
        type: actionTypes.CUSTOMER_DELETED,
        payload: _id
    }
}
export const updateCustomer = (customer) => {
    return (dispatch) => {
        axios.put('http://localhost:5000/customer/'+ customer._id,customer).then(succ => {
            debugger
            console.log(succ);
            // dispatch(addCustomer(succ.data));
            // dispatch(saveCustomers(succ.data));
            localStorage.setItem('CurrentUser',JSON.stringify(succ.data))
        }).catch(ee => { console.log(ee.message) });
    }
}
export const selecteCustomer = (customer) => {
    return {
        type: actionTypes.CUSTOMER_SELECTED,
        payload: customer
    }
}
export const getAllCustomers = () => {
    return (dispatch) => {
        debugger
        axios.get("http://localhost:5000/customer").then(succ => {
            debugger
            console.log(succ);
            dispatch(saveCustomers(succ.data));
        }).catch(ee => { console.log(ee.message) });
    }
}
export const saveCustomers = (customers) => {
    return {
        type: actionTypes.CUSTOMER_SAVED,
        payload: customers
    }
}
export const postCustomer = (customer) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/customer', customer).then(succ => {
            console.log(succ);
            // dispatch(addCustomer(succ.data));
            dispatch(saveCustomers(succ.data));
        }).catch(ee => { console.log(ee.message) });
    }
}
export const updateAuth = (auth) => {
    debugger
        return {      
            type: actionTypes.UPDATE_AUTH,
            payload: auth
        }
    }

export const updateCurrentUser = (user) => {
        debugger
            return {      
                type: actionTypes.UPDATE_CURRENT_USER,
                payload: user
            }
        }
        export const updateChat = (room,email) => {
            debugger
                return {      
                    type: actionTypes.UPDATE_CHAT,
                    payload: {room: room, email: email}
                }
            }
    
       
    // export const getCustomerById = (customer) => {
    //     return (dispatch) => {
    //         axios.put('http://localhost:5000/customer/'+customer).then(succ => {
    //             console.log(succ);
    //             // dispatch(addCustomer(succ.data));
    //             dispatch(saveCustomers(succ.data));
    //         }).catch(ee => { console.log(ee.message) });
    //     }
    // }
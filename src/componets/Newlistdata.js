import { useEffect } from 'react';
import { io } from "socket.io-client";
import { listLoginUserData } from '../Api/api';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';



function Newlistdata(){
    // const location = useLocation();
    // const {state} = location; 
    // console.log('state', state);
    // const socket = io(`http://localhost:3000?user_id=${state}`);

    useEffect(() =>{
        userDataList();
    }, [])
//     const { id } = useParams();
//    console.log('id', id)
    const userDataList = () =>{
    listLoginUserData()
    .then(function(response){
     console.log("response",response)
    //  console.log('response_id', response.data.data._id)
     if(response.data.status === true){
        //  navigate('/Listuserdata' , {state: response.data.data._id} );        
     }
    })
    .catch(function (error) {
     console.log(error);
     });
    }

    return(
       <>
       <div>
        <div>
          <p>Chatapp</p>
          <Button></Button>
        </div>
       </div>
       </>
    )
}
export default Newlistdata;
import { useEffect, useState } from 'react';
import '../css/Listuserdata.css'
import { io } from "socket.io-client";
import { listLoginUserData } from '../Api/api';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import image_user from '../icons/Cartoon-Avatar-PNG-Photo.png';
import user_pic from '../icons/usericon.jpg';
import { useNavigate } from "react-router-dom";
import { userChatData } from '../Api/api'
import UserListShow from './UserListShow';



function Listuserdata(){
    const navigate = useNavigate();
    const location = useLocation();
    const {state} = location; 
    // console.log('state', state);
    const { id } = useParams();
    console.log('id', id)
    // console.log('userDataLogin', userDataLogin.data._id);
    // if(userDataLogin.data._id == id){
    //     navigate(`/Listuserdata/react/${id}`)
    // }
    // const socket = io.connect(`http://localhost:3000?user_id=${id}`);
    //const socket = io(`http://localhost:3000?user_id=${state}`);
    const [loginUserId , setLoginUserId] = useState('');
    const [listUserData, setListUserData] = useState([]);
    const [isOnlineUser, setIsOnlineUser] = useState([])


    const socket = io.connect(`http://localhost:3000?user_id=${id}`);
    useEffect(() =>{
        // if(userDataLogin.data._id == id){
        //     console.log('drashti');
        //     // navigate(`/Listuserdata/react/${id}`)
        // }
        userDatacheck();
        userDataList();
        // socket.on('online', ({ userId })=>{
        //     console.log('11111+++',userId)
           
        //     for (let index = 0; index < listUserData.length; index++) {
        //         const element = listUserData[index];
        //         console.log('11111--------------------',element)

        //         if(element._id == userId ){
        //             console.log('element._id === userId ', element._id == userId );
        //             element.isOnline = 'true'
        
        //         }
               
               
        //     }
         
        // })
        // socket.on('offline', ({ id }) => {
        //   console.log('8++++++')
        //   })
    }, [])

    const userDatacheck = () =>{
        var userDataLogin =  JSON.parse(localStorage.getItem('userData'))
        console.log('userDataLogin', userDataLogin);
        if(userDataLogin === null){
            console.log('condiiiiiiiiiiiiiiiiiiiiiiii')
            navigate('/Login');
        }
        else{
            navigate(`/Listuserdata/react/${userDataLogin.data._id}` , {state: userDataLogin.data.name});     
        }
    }
//     const { id } = useParams();
//    console.log('id', id)
    const userDataList = () =>{
    listLoginUserData(id)
    .then(function(response){
     console.log("response",response)
     console.log('responsedata', response.data.response)
    //  var apiDataSet = (response.data)
     setLoginUserId(response.data.response)
     setListUserData(response.data.response.userdata)
    //  const user_Edit = response.data.response.userdata.filter((el) => {
    //     console.log('=+=+=+=+=+=+=',el._id)
    //     console.log('id === el._id', id === el._id)
    //     return id === el._id;
    //  })
    //  console.log('response_id', response.data.data._id)
     if(response.data.status === true){

        //  navigate('/Listuserdata' , {state: response.data.data._id} );        
     }
    })
    .catch(function (error) {
     console.log(error);
     });
    }


    const logOutUser = () =>{
       socket.disconnect();
       navigate('/Login')
    }
    
    
    const dataUserChat = (userid) =>{
    //   socket.emit('chatjoin', {reciverId:userid,senderId:id}); 
       navigate(`/Userdashbord/${userid}`, {state: id});     
    }
   
    // const socket = io(`http://localhost:3000?user_id=${id}`);
    return(
       <>
       <div className='all_list_page'>

    
       <div className='all_listdata'>
            <div className='user_data'>
                <img src={image_user} alt='' className='image_set_user'></img>
                <h2>{state}</h2>
                {/* <p>{loginUserId.userId}</p> */}

            </div>
            <div className='list_hedaer'>
                <h2>Chatapp</h2>
                <Button variant='danger' onClick={logOutUser}>Log out</Button>
            </div>
            <div className='all_login_user'>
            {listUserData.map((user , index)=>{
                return(
                    <UserListShow  user={user} dataUserChat={dataUserChat} socket={socket} />
                    )
                })}

            </div>

       </div>
       </div>
       </>
    )
}
export default Listuserdata;

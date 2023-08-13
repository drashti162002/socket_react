import '../css/Listuserdata.css';
import { Button } from 'react-bootstrap';
import user_pic from '../icons/usericon.jpg';
import { useEffect, useState } from 'react';


function UserListShow(props){
  
    const [stateOnline , setStateOnline] = useState(props.user.isOnline)

    useEffect(() =>{
    // const socket = io.connect(`http://localhost:3000?user_id=${id}`);
    console.log('props.scoket', props.socket)       
    props.socket.on('online', ({ userId })=>{
           console.log('11111+++',userId)
           console.log('props.user._id == userId',props.user._id == userId)
           if(props.user._id == userId){
            // console.log('setStateOnline', setStateOnline)
               setStateOnline("true")
           }
        
       })

       props.socket.on('offline', ({ userId })=>{
        console.log('222222+++',userId)
        console.log('props.user._id == userId',props.user._id == userId)
        if(props.user._id == userId){
        //  console.log('setStateOnline', setStateOnline)
            setStateOnline("false")
        }
     
    })
       // socket.on('offline', ({ id }) => {
       //   console.log('8++++++')
       //   })
   }, [])

    return(
       <>
        <div className='user_detalis'>
        <img src={user_pic} alt='' className='user_pic'></img>
        {console.log('isOnline', props.user.isOnline)}
        
        <span className = {stateOnline === "true" ? "circle_g":"circle"}>p</span>
        <span className='ms-3'>{props.user.name}</span>
        <Button variant='success' className='chat_button me-2' onClick={(e)=>props.dataUserChat(props.user._id)}>chat</Button>
        </div>
        </>
    )
}
export default UserListShow;
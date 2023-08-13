import { useEffect ,useState} from "react";
import '../css/Userdashbord.css';
import { io } from "socket.io-client";
import chat_logo from '../icons/spike-email-messenger-chat-2019-05-01.png';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useLocation, useParams } from 'react-router-dom';
import { userChatData } from '../Api/api'



function Userdashbord(){
    const location = useLocation();
     const {state} = location; 
    //  console.log('statepassloginuserid', state);
    const { userid } = useParams(); 
    // console.log('paramspassuserid', userid)]
    const [socket, setSocket] = useState(null);
    // const socket = io.connect(`http://localhost:3000?user_id=${state}`);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        var socket_data = io.connect(`http://localhost:3000?user_id=${state}`);
        setSocket(socket_data);
        userpage();
        //   return () => {
        //     socket.disconnect();    
        //   };
    } , []);
     

    useEffect(()=>{
        if(socket) {
            socket.off('message');
            socket.on('message',  (data) => {
                console.log('data', data)
                console.log('msg',data.msg)
                var data = {
                    Message : data.msg,
                    reciverId:data.reciverId,
                    senderId:data.senderId
                }
                setMessages((messages) => [...messages, data]);
              });
        }
    // window.location.relord()
    },[socket]);
    

    const userpage = () =>{
        userChatData(state, userid )
        .then(function(response){
         console.log("response",response)    
        //  console.log('response_id', response.data.data._id)
         if(response.data.status === true){
            console.log('userresponsmessage',response.data.response.str)
            setMessages(response.data.response.str);
            // setRoomId(response.data)
            //  navigate('/Listuserdata' , {state: response.data.data._id} );        
         }
        })
        .catch(function (error) {
         console.log(error);
         });
    }

    
    const datasenduser = (e) =>{
        e.preventDefault();
        if (inputValue.trim() === '') {
          return;
        }
        socket.emit('message',  {reciverId:userid, senderId:state, msg:inputValue});
        setInputValue('');
        console.log('inputValue', inputValue)
    }
    return (
      <div className="full_Page">
        <div className="all_masg">
          <div className="name_app">
            <img src={chat_logo} alt="logo" className="logo_img"></img>
            <p>Chatapp</p>
          </div>
          <div className="msg_area">
            {/* <div className="outgoing_msg">Lorem jhddgfcgdcfhgdhcv gdhhhhsf dytsf uyfuds fdsjfyhsd fdjyuds ufdysfu ufyd8suf uydifyd jui gshfg gfds hgdhgf grts </div>
                <div className="incoming_msg">Lorem jhddgfcgdcfhgdhcv gdhhhhsf dytsf uyfuds fdsjfyhsd fdjyuds ufdysfu ufyd8suf uydifyd jui gshfg gfds hgdhgf grts </div>
                <div className="outgoing_msg">Lorem jhddgfcgdcfhgdhcv gdhhhhsf dytsf uyfuds fdsjfyhsd fdjyuds ufdysfu ufyd8suf uydifyd jui gshfg gfds hgdhgf grts </div>
                <div className="outgoing_msg">Lorem jhddgfcgdcfhgdhcv gdhhhhsf dytsf uyfuds fdsjfyhsd fdjyuds ufdysfu ufyd8suf uydifyd jui gshfg gfds hgdhgf grts </div>
                <div className="incoming_msg">Lorem jhddgfcgdcfhgdhcv gdhhhhsf dytsf uyfuds fdsjfyhsd fdjyuds ufdysfu ufyd8suf uydifyd jui gshfg gfds hgdhgf grts </div>
                <div className="incoming_msg">Lorem jhddgfcgdcfhgdhcv gdhhhhsf dytsf uyfuds fdsjfyhsd fdjyuds ufdysfu ufyd8suf uydifyd jui gshfg gfds hgdhgf grts </div>
                <div className="outgoing_msg">Lorem jhddgfcgdcfhgdhcv gdhhhhsf dytsf uyfuds fdsjfyhsd fdjyuds ufdysfu ufyd8suf uydifyd jui gshfg gfds hgdhgf grts </div> */}
            {messages.map((item, index) => {
            // console.log('item',item.Message)
              return (
                <p key={index} className="incoming_msg">
                  {item.Message}
                </p>
              );
            })}
          </div>
          <div className="send_msg">
            <Form.Control
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              as="textarea"
              rows={1}
            />
            <Button onClick={datasenduser}>send</Button>
          </div>
        </div>
      </div>
    );
}
export default Userdashbord;
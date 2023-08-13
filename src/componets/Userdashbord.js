import { useEffect ,useRef,useState} from "react";
import '../css/Userdashbord.css';
import { io } from "socket.io-client";
import chat_logo from '../icons/spike-email-messenger-chat-2019-05-01.png';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useLocation, useParams } from 'react-router-dom';
import { userChatData } from '../Api/api'



function Userdashbord(){
   var timeout 
    const location = useLocation();
     const {state} = location; 
    //  console.log('statepassloginuserid', state);
    const { userid } = useParams(); 
    // console.log('paramspassuserid', userid)]
    const [socket, setSocket] = useState(null);
    // const socket = io.connect(`http://localhost:3000?user_id=${state}`);
    const [inputValue, setInputValue] = useState('');
    const [user, setUser] = useState({})
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [stateOnline , setStateOnline] = useState("false")
    const lastMessageRef = useRef(null);


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
              socket.on('typing', (data) =>{
                console.log('aaaa', data.reciverId);
                console.log('aaaa11111', data.senderId);
                setIsTyping(true)
                myFunction();
              });

              socket.on('online', ({ userId })=>{
                console.log('11111+++',userId)
                console.log('props.user._id == userId', user._id !== userId)
                if(user._id !== userId){
                //  console.log('setStateOnline', setStateOnline)
                    setStateOnline("true")
                }             
            })

            socket.on('offline', ({ userId })=>{
              console.log('2222+++',userId)
              console.log('props.user._id == userId', user._id !== userId)
              if(user._id !== userId){
              //  console.log('setStateOnline', setStateOnline)
                  setStateOnline("false")
              }             
          })
     

        }
    },[socket]);

    const userpage = () =>{
        userChatData(state, userid )
        .then(function(response){
         console.log("response",response)    
        //  console.log('response_id', response.data.data._id)
         if(response.data.status === true){
            // console.log('userresponsmessage',response.data.response.str)
            setUser(response.data.response.data)
            setMessages(response.data.response.str);   
         }
        })
        .catch(function (error) {
         console.log(error);
         });
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputValue(value);
        socket.emit('typing', {reciverId:userid,senderId:state} , value !== ''); // Emit typing event when input value is not empty
        setIsTyping(false);
        if (value === ''){
          setIsTyping(false);
        }
      
      };
    
    const datasenduser = (e) =>{
        e.preventDefault();
        if (inputValue.trim() === '') {
          return;
        }
        socket.emit('message',  {reciverId:userid, senderId:state, msg:inputValue});
        setInputValue(''); 
        setIsTyping(false);
        console.log('inputValue', inputValue);
    }

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

    function alertFunc() {
      setIsTyping(false)
  }

    function myFunction() {
      timeout = setTimeout(alertFunc, 1000);
  }
    
    return (
      <div className="full_Page">
        <div className="all_masg">
          <div className="name_app">
            <img src={chat_logo} alt="logo" className="logo_img"></img>
            <div className="ms-4">
               <h4>{user.name}</h4>
               <h6>{stateOnline ==="true" ? 'Online' : 'Offline'}</h6>
            </div>
          </div>
          <div lastMessageRef={lastMessageRef} className="msg_area">
            {messages.map((item, index) => {
              // console.log('item',item)
              var classAdd = "incoming_msg";
              if(item.senderId === state ){
                classAdd = "outgoing_msg"
              }
              return (
                <p key={index} ref={lastMessageRef} className={classAdd}>
                  {item.Message}
                </p>
              );
            })}
            </div>
            <div>

            <div >
           {isTyping && <p className="">Someone is typing...</p>}
            </div>

          <div className="send_msg">
            <Form.Control
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              as="textarea"
              rows={1}
            />
            <Button onClick={datasenduser}>send</Button>
          </div>
        </div>
        </div>
      </div>
    );
}
export default Userdashbord;      
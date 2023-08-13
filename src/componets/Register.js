import "../css/Employerregister.css";
import { Container ,Row ,Col, NavLink} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import logo_login_page from '../icons/box.png';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { postuserregisterUser} from '../Api/api';
// import Swal from "sweetalert2";



function Userregister(){
     const navigate = useNavigate();
    
    // user from state //
    const [name , setName] = useState('');
    const [city , setCity] = useState('');
    const [emailAddress , setEmailaddress] = useState('');    
    const [password , setPassword] = useState('');
     

  // user validationfrom state //
  const [errorName , setErrorName] = useState('');
  const [errorCity , setErrorCity] = useState('');
  const [erroremailAddress , setErrorEmailaddress] = useState('');
  const [errorpassword , setErrorPassword] = useState('');




    const userRegisterData = (e) => {
      e.preventDefault();
        if(!validationData()){
           return false;
        }
        var data = {
          name: name,
          city: city,
          email: emailAddress,
          password: password,
        };
        console.log('data', data);
        postuserregisterUser(data)
        .then(function (response) {
        console.log('response', response)
        if(response.data.status === true){
            navigate('/Login')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const validationData = () => {
        var isValid = true;
        if(name == ''){
            setErrorName('Please Enter Name');
            isValid = false;
        }
        if(city == ''){
            setErrorCity('Please Enter City');
            isValid = false;
        }    
        if(emailAddress == ''){
            setErrorEmailaddress('Please Enter Email Address');
            isValid = false;
        }else{
            const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailAddress);
          if (!emailRegex) {
            setErrorEmailaddress("Please Enter Vaild Email");
            isValid = false;
          }
    
          }   
        if(password == ''){
            setErrorPassword('Please Enter password');
            isValid = false;
        }    
        return isValid;
    };

    return(
    
     // Userregistr page //

    <div className='all_userregister_full_page'>    
       <Row className="m-0 all_col_center image_user_background">
         <Col lg={5}>
            <Container>
            <Row className='all_contant_cenetr background_white_all_page'>
                <Col lg={12} className='image_logo_col'>
                    <img src={logo_login_page} alt='logo' className='logo_login_page'></img>
                    <div> Turn-to</div>
                </Col>  

                <Col>
                    <h2 className='text-center'>User Register Form</h2>
                    <Form>
                        <Form.Group className="mb-1" controlId="formGroupEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" 
                              name='name'
                              value={name}
                              onChange={(e)=>setName(e.target.value)}/>
                             <span className='errormsg'>{errorName}</span>
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formGroupEmail">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="Enter City" 
                              name='city'
                              value={city}
                              onChange={(e)=>setCity(e.target.value)}/>
                             <span className='errormsg'>{errorCity}</span>
                        </Form.Group>  
                        <Form.Group className="mb-1" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" 
                             name='emailAddress'
                             value={emailAddress}
                             onChange={(e)=>setEmailaddress(e.target.value)}/>
                              <span className='errormsg'>{erroremailAddress}</span>
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formGroupEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" 
                               name='password'
                               value={password}
                               onChange={(e)=>setPassword(e.target.value)}/>
                                <span className='errormsg'>{errorpassword}</span>
                        </Form.Group>   
                        <div className='sign_button_main'>
                            <button className='sign_in_button' onClick={userRegisterData}> SIGN Up </button>
                            <p className='my-2'>Already have an account ? <a href='/Login' className='color_link'> Sign In</a></p>
                        </div>    
                    </Form>
                </Col>
            </Row>
            </Container>
         </Col>
         <Col className='small_screen_back_height'>
         </Col>
       </Row>
  
    </div>
    )
}
export default Userregister;
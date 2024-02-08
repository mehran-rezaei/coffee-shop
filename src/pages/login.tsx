import React , {useContext} from 'react';
import BackColor from '@/components/backColor';
import Login1 from '@/components/loginSignUP/login1';
import NumberValidate from '@/components/loginSignUP/numberValidate';
import SignUp from '@/components/loginSignUP/signUp';
import Getcoffee from '@/components/loginSignUP/getcoffee';
// import Chockout from '@/components/chockout';

// context
import {signUpIn} from '@/context/signUpIn';

const Login = () => {
    const {state , dispatch} = useContext(signUpIn)
    
    
    return (
        <div 
        className='for_app '>
           {state.showLogin &&  <Login1/>}
           {state.showPhoneValidation &&   <NumberValidate /> }
           {state.showSignUp && <SignUp /> }
           {state.showGetCofee &&  <Getcoffee />}
  

           {/* <Test 
           status={'mehran rezaei'} 
           age={21} 
           accept={true} 
           dataList={{firstName :'mehran' , lastName : 'rezaei'}}
           userData={[
            {carNumber : 5},
            {carNumber : 6},
           ]}/> */}

           {/* {state.showCheckOut && <Chockout />} */}
            {/* <BackColor/> */}
        </div>
    );
};

export default Login;
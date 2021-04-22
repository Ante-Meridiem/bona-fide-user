import React from "react";
import axios from "axios";


class Login extends React.Component{
constructor(props){
    super(props)
    this.state = {
        username : '',
        password : ''
    }
}
submitButtonAction = async() => {
    
    const authRequest = {
        username: 'lino',
        password: 'password'
    }
    // axios.post('http://localhost:9012/authenticate',authRequest).then(res=>{console.log(res.data)})
    fetch('http://localhost:9012/authenticate',{method: 'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify({username:'lino',password:'password'})}).then(res => console.log(res))    
}

    render(){
        return (
            <form>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="text" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" maxLength="8" minLength="4"/>
                </div>
                <button type="submit" onClick={this.submitButtonAction} className="btn btn-primary btn-block">Submit</button>
            </form>
        )
    }
}

export default Login;
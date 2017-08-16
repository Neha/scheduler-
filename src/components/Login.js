import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = (event) => {
        var field = {};
        field[event.target.name] = event.target.value;
        this.setState(field);
    }

    doLogin = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:9000/login", {
            username: this.state.username,
            password: this.state.password
        })
            .then((response) => {

                if (response.data.status.error) {
                    alert("Invalid user info.");
                } else {
                    
                    this
                        .props
                        .saveUserInfo(response.data);
                }

            })

    }

    render() {
        return (
            <div id="login-overlay" className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">Login to site.com</h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-6">
                                <div className="well">
                                    <form id="loginForm" onSubmit={this.doLogin}>
                                        <div className="form-group">
                                            <label htmlFor="username" className="control-label">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                name="username"
                                                value=""
                                                required=""
                                                value={this.state.username}
                                                onChange={this.handleChange}
                                                title="Please enter you username"
                                                placeholder="example@gmail.com"/>
                                            <span className="help-block"></span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="control-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                required=""
                                                title="Please enter your password"/>
                                            <span className="help-block"></span>
                                        </div>
                                        <div id="loginErrorMsg" className="alert alert-error hide">Wrong username og password</div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" name="remember" id="remember"/>
                                                Remember login
                                            </label>
                                            <p className="help-block">(if this is a private computer)</p>
                                        </div>
                                        <button type="submit" className="btn btn-success btn-block">Login</button>
                                        <a href="/forgot/" className="btn btn-default btn-block">Help to login</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;

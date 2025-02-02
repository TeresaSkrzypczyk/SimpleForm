import React, {Component} from "react";
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            userName: "",
            password: "",
            repeatPassword: "",
            email: "",
            userNameError: "",
            passwordError: "",
            repeatPasswordError: "",
            emailError: "",
            send: false,
            errors: []
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = async event =>  {
        event.preventDefault();

        const data=this.state;
        console.log(data);

        if (this.validate()) {
            this.setState({send: true})
        }

       await axios({
            method: 'post',
            url: '/data',
            data: data,
            config: { headers: {'Content-Type': 'application/json' }}
            })
            .then (function (response) {
                console.log(response);
            })
            .catch (function (error) {
                console.log(error.response);
            });
    }

    validate() {
        let userNameError = "";
        let passwordError = "";
        let repeatPasswordError = "";
        let emailError = "";
        let errors = [];

        if (this.state.userName === "") {
            userNameError ='Username is required';
            errors.push(userNameError);
        }
        if (this.state.password === "") {
            passwordError ='Password is required';
            errors.push(passwordError);
        }
        if (this.state.password !== this.state.repeatPassword) {
            repeatPasswordError ='Passwords are not the some';
            errors.push(repeatPasswordError);
        }
        if (this.state.email.length < 3 && this.state.email.indexOf("@") === -1) {
            emailError ='Email is invalid!';
            errors.push(emailError);
        }

        this.setState({userNameError, passwordError, repeatPasswordError, emailError});
        console.log(errors);
        return errors.length === 0;
    }

    render() {

        const form = (
            <form onSubmit={e => this.handleSubmit(e)} className="form">

                <div className="row main-row">
                    <div className="col-3">
                        <h1 className="title">Registration form</h1>

                        <div className="form-group">
                            <label>First name</label>
                            <input className="form-control" type="text" placeholder="" name="firstName" value={this.state.firstName} onChange={e => this.handleChange(e)} />
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input className="form-control" type="text" placeholder="" name="userName" value={this.state.userName} onChange={e => this.handleChange(e)} />
                            <small className="form-text text-muted">
                                {this.state.userNameError}
                            </small>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
                            <small className="form-text text-muted">
                                {this.state.passwordError}
                            </small>
                        </div>

                        <div className="form-group">
                            <label>Confirm password</label>
                            <input className="form-control" type="password" name="repeatPassword" value={this.state.repeatPassword} onChange={e => this.handleChange(e)} />
                            <small className="form-text text-muted">
                                {this.state.repeatPasswordError}
                            </small>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" type="email" placeholder="" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
                            <small className="form-text text-muted">
                                {this.state.emailError}
                            </small>
                        </div>

                        <div className="left-position">
                            <button className="btn btn-outline-primary" type="submit">Send</button>
                        </div>

                    </div>
                </div>
            </form>
        );

        const thanks = (
            <div className="row main-row">
                <div className="col-3">
                    <h1 className="title title-success">Thanks for your registration!</h1>
                </div>
            </div>
        );

        return (
            <>
                {this.state.send ? <>{thanks}</>: form}
            </>
        );
    }
}

export default Form;
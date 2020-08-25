import React, {Component} from "react";

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

    handleSubmit(e) {
        e.preventDefault();

        const data=this.state;
        console.log(data);

        if (this.validate()) {
            this.setState({send: true})
        }
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
        if (this.state.password === this.state.repeatPassword) {
            repeatPasswordError ='Passwords are not the some';
            errors.push(repeatPasswordError);
        }
        if (this.state.email.length < 3 && this.state.email.indexOf("@") === -1) {
            emailError ='Email is invalid!';
            errors.push(emailError);
        }

        this.setState({userNameError, passwordError, repeatPasswordError, emailError});
        console.log(errors);
        return false;
    }

    render() {

        const form = (
            <form onSubmit={e => this.handleSubmit(e)}>

                <div className="row main-row">
                    <div className="col-3">
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
                            <label>Repeat password</label>
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

        const thanks = (<h3>Sent</h3>);

        return (
            <>
                {this.state.send ? <>{thanks}{form}</>: form}
            </>
        );
    }
}

export default Form;
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
            emailError ='Email is wrong!';
            errors.push(emailError);
        }

        this.setState({userNameError, passwordError, repeatPasswordError, emailError});
        console.log(errors);
        return false;
    }

    render() {

        const form = (
            <form onSubmit={e => this.handleSubmit(e)}>

                    <div>
                        <div>
                            <label>
                                <span>First name</span>
                                <input type="text" placeholder="" name="firstName" value={this.state.firstName} onChange={e => this.handleChange(e)} /><br />
                            </label>
                        </div>

                        <div>
                            <label>
                                <span>Username</span>
                                <input type="text" placeholder="" name="userName" value={this.state.userName} onChange={e => this.handleChange(e)} /><br />
                            </label>
                            <div>
                                {this.state.userNameError}
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Password</span>
                                <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} /><br />
                            </label>
                            <div>
                                {this.state.passwordError}
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Repeat password</span>
                                <input type="password" name="repeatPassword" value={this.state.repeatPassword} onChange={e => this.handleChange(e)} /><br />
                            </label>
                            <div>
                                {this.state.repeatPasswordError}
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Email</span>
                                <input type="email" placeholder="" name="email" value={this.state.email} onChange={e => this.handleChange(e)} /><br />
                            </label>
                            <div>
                                {this.state.emailError}
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="submit">Send</button>
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
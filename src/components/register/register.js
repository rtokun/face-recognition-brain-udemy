import React from "react";
import {HOME, SIGN_IN} from "../constants";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameError: false,
            email: '',
            emailError: false,
            password: '',
            passwordError: false
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    };

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    };

    isEmailValid = (mail) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail));

    isPasswordValid = (password) => password.length > 4;

    isNameValid = (name) => name.length > 2;

    onSubmit = async () => {

        const {name, email, password} = this.state;

        if (!this.isNameValid(name)) {
            this.setState({nameError: true});
            return
        } else {
            this.setState({nameError: false});
        }

        if (!this.isEmailValid(email)) {
            this.setState({emailError: true});
            return
        } else {
            this.setState({emailError: false});
        }

        if (!this.isPasswordValid(password)) {
            this.setState({signPasswordError: true});
            return
        } else {
            this.setState({signPasswordError: false});
        }

        const requestBody = {
            password: password,
            email: email,
            name: name
        };

        try {
            const result = await fetch('http://localhost:4000/register', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const user = await result.json();

            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange(HOME);
            } else {
                if (result.status === 401) {
                    alert("Failed to register");
                } else {
                    alert(result.statusText);
                }
            }
        } catch (e) {
            console.log('XXX', 'e');
            alert("Failed to register");
        }
    };


    render(){

        const {onRouteChange} = this.props;
        const {nameError, emailError, passwordError} = this.state;

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange}  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="text" name="Name" id="name"/>
                                {
                                    nameError &&
                                    <label className="tc db fw6 lh-copy f6 dark-red">Invalid name</label>
                                }
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address"/>
                                {
                                    emailError &&
                                    <label className="tc db fw6 lh-copy f6 dark-red">Invalid email</label>
                                }
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password"/>
                                {
                                    passwordError &&
                                    <label className="tc db fw6 lh-copy f6 dark-red">Invalid password</label>
                                }
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="submit"
                                   value="Register"
                                   onClick={() => this.onSubmit()}
                            />
                        </div>
                        <div className="lh-copy mt3 pointer">
                            <p onClick={() => onRouteChange(SIGN_IN)} className="f6 link dim black db">Sign in</p>
                        </div>
                    </div>
                </main>
            </article>);
    }


}

export default Register;
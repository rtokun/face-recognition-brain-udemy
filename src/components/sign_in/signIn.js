import React, {Component} from "react";
import {HOME, REGISTER} from "../constants";


class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInEmailError: false,
            signPasswordError: false,
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    };

    isEmailValid = (mail) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail));

    /*
    * To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    * */
    isPasswordValid = (password) => password.length > 4;

    onSubmit = async () => {

        const {signInEmail, signInPassword} = this.state;

        if (!this.isEmailValid(signInEmail)) {
            this.setState({signInEmailError: true});
            return
        } else {
            this.setState({signInEmailError: false});
        }

        if (!this.isPasswordValid(signInPassword)) {
            this.setState({signPasswordError: true});
            return
        } else {
            this.setState({signPasswordError: false});
        }

        const requestBody = {
            password: signInPassword,
            email: signInEmail
        };

        try {
            const result = await fetch('http://localhost:4000/signIn', {
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
                    alert("Failed to sign in");
                } else {
                    alert(result.statusText);
                }
            }
        } catch (e) {
            console.log('XXX', 'e');
            alert("Failed to sign in")
        }
    };

    render() {

        const {onRouteChange} = this.props;
        const {signInEmailError, signPasswordError} = this.state;

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange}
                                       className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address"/>
                                {
                                    signInEmailError &&
                                    <label className="tc db fw6 lh-copy f6 dark-red">Invalid email</label>
                                }
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange}
                                       className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password"/>
                                {
                                    signPasswordError &&
                                    <label className="tc db fw6 lh-copy f6 dark-red">Invalid password</label>
                                }
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="submit"
                                   value="Sign in"
                                   onClick={() => this.onSubmit()}
                            />
                        </div>
                        <div className="lh-copy mt3 pointer">
                            <p onClick={() => onRouteChange(REGISTER)} className="f6 link dim black db">Register</p>
                        </div>
                    </div>
                </main>
            </article>);
    }

}

export default SignIn;
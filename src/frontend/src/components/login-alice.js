import React, { Component } from 'react';
// import WelcomeLogo from './welcomelogo'
import "../static/css/welcomelogo.css";


// I will need 1 image with logo (logo.svg), with 1 header that says WELCOME, 2 textboxes - username + password, 1 button (ok), 1  with link (Sign Up)
// I will need to confirm these classnames

export class logo extends Component {
    render(){
        return(
            <div className="App-logo App-welcome-text">
                <div className="container">
                    <div className="App-logo">
                    <img src="./static/site/img/logo.svg" class="center" width="345" height="480" ></img>
                    </div>
                    <div className="Welcome-text">
                    <p><welcomeText>WELCOME</welcomeText></p>
                    </div>
                </div>
            </div>           
        )
    }
}

// input text (username)
// input password (password)
// input submit (OK - login server)

export class logo extends Component {
    render(){
        return(
            <div className="App-enter-username">
                <div className="container">
                    <form action="/loginaction.php"></form>
                        <div className="Username">
                            <img src="./static/site/img/login/textfill.png" class="center" width="280" height="50" ></img>
                            <input type="text" id="username" name="username"><br><br>
                        </div>
                        <div className="Password">
                            <img src="./static/site/img/login/textfill.png" class="center" width="280" height="50" ></img>
                            <input type="password" id="pw" name="pw"><br><br></br>
                        </div>
                    </form>
                </div>
            </div>           
        )
    }
}

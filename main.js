// NOT MY CODE DON'T TOUCH
import {
 SignUp 
} from './ui-components';

import { Storage } from "@aws-amplify/storage"



import { ThemeProvider, createTheme } from "@aws-amplify/ui-react";
import { studioTheme } from './ui-components';

const updatedTheme = createTheme({
    // Extend the theme to update the button color
    name: "my-theme-updates", 
    tokens: {
        components: {
            button: {
                primary: {
                    backgroundColor: {
                        value: "#b71c1c"
                    },
                },
            },
        },
    },
}, studioTheme)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    "<ThemeProvider theme={updatedTheme}><App /></ThemeProvider>"
);

try {
    const user = await Auth.signIn(username, password);
} catch (error) {
    console.log('error signing in', error);
}

//ok this is mine again

var storageTest= document.getElementById("storageTest");

var hamburger_menu_move = document.getElementById("hamburger_menu_move_out");
var hamburger_menu_button = document.getElementById("hamburger_menu");
var hamburger_boolean = false;
function move_out() {
    hamburger_menu_move.style = "animation-name: menu_move_out;\n" +
        "    animation-duration: 0.5s;\n" +
        "    animation-fill-mode: forwards;";
}

function move_in() {
    hamburger_menu_move.style = "animation-name: menu_move_in;\n" +
        "    animation-duration: 0.5s;\n" +
        "    animation-fill-mode: forwards;";
}

function process_hamburger_menu() {
    hamburger_boolean = !hamburger_boolean;
    if (hamburger_boolean) {
        move_out();
    } else {
        move_in();
    }
}

function test_storage() {
 await Storage.put("test.txt", "Hello");
 console.log("Tested Storage");
}

storageTest.addEventListener("click", test_storage);

hamburger_menu_button.addEventListener("click", process_hamburger_menu)

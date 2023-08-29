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

hamburger_menu_button.addEventListener("click", process_hamburger_menu)
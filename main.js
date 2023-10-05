//okay so the current problem is that this function uses a ridiculous amount of memory.
function process_message_to_colors(original_message, current_message) {
    //splitting each messsage into their respective content areas. Words are not enough since there can be data
    // added and removed from each section.
    var split_orignal_message = split(original_message, " ");
    var split_current_message = split(current_message, " ");
    var split_new_message = [];
    var new_message_coloring = [];

    var current_string = "";
    var colored_text;
    for (var i = 0; i < split_orignal_message.length; i++) {
        if (split_current_message[i] !== undefined || split_current_message[i] !== undefined) {
            colored_text = false;
            current_string = "";
            //this block of two while loops should ensure that each string is the same length;
            while (split_orignal_message[i].length > split_current_message[i].length) {
                split_current_message[i] += " ";
            }
            while (split_orignal_message[i].length < split_current_message[i].length) {
                split_orignal_message[i] += " ";
            }
            //looping through every character in the word
            for (var g = 0; g < split_orignal_message[i].length; g++) {
                //if they match then no problem. We add it to the buffer string
                if (split_orignal_message[i][g] == split_current_message[i][g]) {
                    current_string += split_orignal_message[i][g];
                    // if they don't match then we have an issue
                    // if the original is a space that means it was artificially lengthed in order to compensate for the
                    // addition of something in the new message
                } else if (split_orignal_message[i][g] == " ") {
                    split_new_message.push(current_string + split_current_message[i][g]);
                    current_string = "";
                    new_message_coloring.push("addition");
                    colored_text = true;
                    // conversely if the current message has a space then it was artificially lengthened to compensate
                    // for the original string being removed.
                } else if (split_current_message[i][g] == " ") {
                    split_new_message.push(current_string + split_orignal_message[i][g]);
                    current_string = "";
                    new_message_coloring.push("subtraction");
                    colored_text = true
                }
            }
            if (!colored_text) {
                new_message_coloring.push("normal");
            }
            split_new_message.push(current_string);
        }
    }
    return [split_new_message, new_message_coloring];
}

//the current problem is that when I read the initial value of the div it's just text, but after changing it to colorize it
//it has html tags. so I need to remove those when I process the text.
//THIS FUNCTION IS CAUSING PROBLEMS - it is reading the tag as well as the tag text for some reason and that is breaking the system.
function convert_html_to_text(parent_element) {
    var children_tags = parent_element.children;
    console.log(children_tags);
    var net_text = "";
    for (var i = 0; i < children_tags.length; i++) {
        net_text += children_tags[i].innerHTML;
        console.log(children_tags[i].innerHTML);
    }
    return net_text;
}

//this makes it so the output of the process_message_to_colors function isn't a giant list. it's something smaller to be
//optimized.
function join_text_and_colors_lists(texts, colors) {
    var new_texts = [];
    var new_colors = [];

    var text_buffer = texts[0];
    var current_color = colors[0];

    for (var i = 1; i < colors.length; i++) {
        if (current_color == colors[i]) {
            text_buffer += " " + texts[i];
        } else {
            new_texts.push(text_buffer);
            new_colors.push(current_color);
            current_color = colors[i];
            text_buffer = texts[i];
        }
    }
    new_texts.push(text_buffer);
    new_colors.push(new_colors);
    return [new_texts, new_colors];
}

//converts the optimized texts and colors lists to html code and coloring
function convert_colors_to_html(parent, text_list, class_list) {
    var html_elements = [];
    for (var i = 0; i < text_list.length; i++) {
        var new_paragraph_element = document.createElement("span");

        new_paragraph_element.textContent = text_list[i];
        new_paragraph_element.className = class_list[i];
        parent.appendChild(new_paragraph_element);
        html_elements.push(new_paragraph_element);
    }
    return html_elements;
}

//just like the split function in python!
function split(string, delimiter) {
    var list = [];
    var current_string = "";
    for (var i = 0; i < string.length; i++) {
        if (string[i] == delimiter) {
            list.push(current_string);
            current_string = "";
        } else {
            current_string += string[i];
        }
    }
    list.push(current_string);
    return list;
}

var base_text = document.getElementById("sample_text").innerHTML;
var sample_text = document.getElementById("sample_text");


//updates the text on screen
function check_text() {
    var new_text = document.getElementById("sample_text");
    new_text = convert_html_to_text(new_text);
    console.log(new_text);
    var text_and_colors = process_message_to_colors(base_text,new_text);
    var joined_text_and_colors = join_text_and_colors_lists(text_and_colors[0], text_and_colors[1]);
    var text_list = joined_text_and_colors[0];
    var colors_list = joined_text_and_colors[1];

    console.log(text_list);

    sample_text.innerHTML = "";

    var html_elements = convert_colors_to_html(sample_text, text_list, colors_list);
}

setInterval(check_text, 5000);
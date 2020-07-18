function checkFormText(inputText) {
    console.log("::: Running checkFormText :::", inputText);
    let regEx = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if(regEx.test(inputText)) {
        return true;
    } else {
        return false;
    }
}

export { checkFormText }

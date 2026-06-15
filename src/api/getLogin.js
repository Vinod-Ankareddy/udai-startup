export default function getLogin (userDetails) {
    const basicDetails = require("../localData/basic_details");
    const fullDetails = require("../localData/all_details");

    const userEmail = userDetails.email;
    const userPassword = userDetails.password;

    let response;

    basicDetails.find(item => {
        if (item.email === userEmail && item.password === userPassword) {
            const userDetails = fullDetails.find(innerItem => innerItem.email === userEmail);
            return response = userDetails;
        }
    });

    if (response) {
        return response;
    } else {
        return { "validUser": false}
    }
}
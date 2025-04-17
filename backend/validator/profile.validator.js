const isEmpty = require("./isEmpty ");
const validator = require("validator");

nodule.exports = function ValidateProfile(data) {
let errors = {};


data.title = !isEmpty(data.title) ? data.title: "";
if (!validator.isEmpty (data.title)) {
    errors.title = "required title";
}

data.phone = !isEmpty(data.phone) ? data.phone :"";
if (validator.isEmpty(data.phone)) {
    errors.phone = "required phone";
}


data.country = !isEmpty(data.country) ? data.country :"";
if (validator.isEmpty(data.country)) {
    errors.country = "required country";
}


data. bio = !isEmpty(data.bio) ? data.bio: "";
if (validator.isEmpty(data.bio)) {
    errors.bio = "required bio";
}

data. skills = !isEmpty(data.skills) ? data.skills: "";
if (validator.isEmpty(data.skills)) {
    errors.skills = "required skills";
}

data.github = !isEmpty(data.github) ? data.github: "";
if (validator.isEmpty(data.github)) {
    errors.github = "required github";
}

return{
    errors,
    isValid: isEmpty(errors),
};
};
import moment from "moment";

export const newUserValidations = {
  firstName: {
    notEmpty: { errorMessage: "first name must be not empty" },
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "first name must be in range 5-32 character",
    },
  },
  lastName: {
    notEmpty: { errorMessage: "last name must be not empty" },
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "last name must be in range 5-32 character",
    },
  },
  dateOfBirth: {
    isDate: true,
    custom: {
      options: (value) => {
        const birthDate = moment(value, "YYYY-MM-DD");
        const currentDate = moment();
        const age = currentDate.diff(birthDate, "years");

        if (age < 15) {
          throw new Error("you must 16 years or older");
        }
        return true;
      },
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be 8 characters at least",
    },
    isString: true,
    custom: {
      options: (value) => {
        const hasupper = /[A-Z]/.test(value);
        const haslower = /[a-z]/.test(value);
        const numirc = /[0-9]/.test(value);
        if (!(haslower && hasupper && numirc)) return false;
        return true;
      },
      errorMessage: "Password must has lower and upper casses and numbers",
    },
  },
  address: {
    notEmpty: { errorMessage: "No address recieved" },
  },
  email: { isString: true, errorMessage: "wrong Email" },
  phone: { isString: true, errorMessage: "invalid phone number" },
  // impage: { notEmpty: true, errorMessage: "no image assigned" },
  userType: {
    notEmpty: { errorMessage: "no type assigned" },
  },
};

export const newPasswordValidations = {
  newPassword: {
    notEmpty: {
      errorMessage: "no new password sent",
    },
    isLength: {
      options: {
        min: 8,
        errorMessage: "it must be at least 8 characters",
      },
    },
    isString: true,
    custom: {
      options: (value) => {
        const lowercase = /[a-z]/.test(value);
        const upper = /[A-Z]/.test(value);
        const number = /[0-9]/.test(value);
        if (!(lowercase && upper && number)) return false;
        return true;
      },
      errorMessage: "must has lower and upper casses and numbers",
    },
  },
};

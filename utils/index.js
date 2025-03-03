import * as Yup from "yup";
import Cookies from "js-cookie";

export const removeHtmlTags = (str) => {
  return str.replace(/(<([^>]+)>)/gi, "");
};

// export function stringToArray(str) {
//     // Remove the last comma from the string
//     str = str.slice(0, -1);

//     // Split the string by comma to create an array
//     const arr = str.split(',');

//     return arr;
//   }

export function stringToArray(str) {
  // Remove the last comma from the string, only if it exists
  if (str.endsWith(",")) {
    str = str.slice(0, -1);
  }

  // Split the string by comma to create an array
  const arr = str.split(",");

  return arr;
}

export function arrayToString(arr) {
  // Join the array elements into a string separated by a comma and a space
  const str = arr.slice(1).join(", ");

  return str;
}

export function sliceString(str) {
  if (!str) {
    return ""; 
  }
  if (str.length > 35) {
    return str.slice(0, 28) + " ...";
  } else {
    return str;
  }
}

export function slice50(str) {
  if (str.length > 50) {
    return str.slice(0, 120) + " ...";
  } else {
    return str;
  }
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password1: Yup.string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required")
    .test(
      "capital-letter",
      "Password must include at least one capital letter",
      (value) => {
        // Check for at least one capital letter
        return /[A-Z]/.test(value);
      }
    )
    .test(
      "special-character",
      "Password must include at least one special character",
      (value) => {
        // Check for at least one special character
        return /[!@#$%^&*()_+{}[\]:;<>,.?~]/.test(value);
      }
    ),
  password2: Yup.string()
    .required()
    .oneOf([Yup.ref("password1"), null], "Passwords must match"),
  firstName: Yup.string()
    .required("Please enter your first name")
    .test("no-numbers", "First name cannot contain numbers", (value) => {
      if (value) {
        return !/\d/.test(value);
      }
      return true;
    }),
  lastName: Yup.string()
    .required("Please enter your first name")
    .test("no-numbers", "First name cannot contain numbers", (value) => {
      if (value) {
        return !/\d/.test(value);
      }
      return true;
    }),
  // gender: Yup.string().required("please select a gender"),
  // packageId: Yup.string().required("please select a subscription plan"),
  phoneNumber: Yup.string()
    .min(10, "Size must be at least 10 characters")
    .max(15, "Phone number must be at most 15 characters")
    .matches(/^\+?[0-9]{1,15}$/, "Invalid phone number")
    .required("Phone number is required"),
});
export const resetpasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required")
    .test(
      "capital-letter",
      "Password must include at least one capital letter",
      (value) => {
        // Check for at least one capital letter
        return /[A-Z]/.test(value);
      }
    )
    .test(
      "special-character",
      "Password must include at least one special character",
      (value) => {
        // Check for at least one special character
        return /[!@#$%^&*()_+{}[\]:;<>,.?~]/.test(value);
      }
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const updateProfilePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string("Enter your old password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Old password is required")
    .test(
      "capital-letter",
      "Password must include at least one capital letter",
      (value) => {
        // Check for at least one capital letter
        return /[A-Z]/.test(value);
      }
    )
    .test(
      "special-character",
      "Password must include at least one special character",
      (value) => {
        // Check for at least one special character
        return /[!@#$%^&*()_+{}[\]:;<>,.?~]/.test(value);
      }
    ),
  newPassword: Yup.string("Enter your new password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("New password is required")
    .test(
      "capital-letter",
      "Password must include at least one capital letter",
      (value) => {
        // Check for at least one capital letter
        return /[A-Z]/.test(value);
      }
    )
    .test(
      "special-character",
      "Password must include at least one special character",
      (value) => {
        // Check for at least one special character
        return /[!@#$%^&*()_+{}[\]:;<>,.?~]/.test(value);
      }
    ),
  confirmNewPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("newPassword"), null], "Must match new password"),
});

export const AddProverbValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().required("Required"),
  suggestedProverb: Yup.string().required("Required"),
  suggestedEnglishTransliteration: Yup.string().required("Required"),
  suggestedEnglishInterpretation: Yup.string().required("Required"),
});

export const EditProfileValiadtionSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  firstName: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{1,15}$/, "Invalid phone number")
    .required("Phone number is required"),
});

export const EditAddressValiadtionSchema = Yup.object().shape({
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  street: Yup.string().required("Required"),
  house_number: Yup.string().required("Required"),
  postal_code: Yup.string().required("Required"),
});

export const genderList = [{ data: "MALE" }, { data: "FEMALE" }];
export const subscriptionList = [
  { data: "Bronze" },
  { data: "Silver" },
  { data: "Gold" },
  { data: "Platinum" },
];

export function extractNameById(data, packageId) {
  const matchingObject = data?.find((item) => item.id === packageId);
  return matchingObject ? matchingObject.name : null;
}
export function extractPriceById(data, packageId) {
  const matchingObject = data?.find((item) => item.id === packageId);
  return matchingObject ? matchingObject.amount : null;
}
export function extractPackageEthnicsNo(data, packageId) {
  const matchingObject = data?.find((item) => item.id === packageId);
  return matchingObject ? matchingObject.noOfEthnics : null;
}
export function extractPackageDescription(data, packageId) {
  const matchingObject = data?.find((item) => item.id === packageId);
  return matchingObject ? matchingObject.description : null;
}
export function extractPackage(data, packageId) {
  const matchingObject = data?.find((item) => item.id === packageId);
  return matchingObject ? matchingObject : null;
}

export function extractIds(data) {
  // Initialize an empty array to store the extracted ids
  const idArray = [];

  // Loop through the input data array and extract the "id" from each object
  for (const item of data) {
    if (item && item.id) {
      idArray.push(item.id);
    }
  }

  // Return the array of extracted ids
  return idArray;
}

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    // Check if we're on the client-side
    return Cookies.get("userToken");
  }
  return null;
};

export const getUserId = () => {
  if (typeof window !== "undefined") {
    // Check if we're on the client-side
    return JSON.parse(localStorage.getItem("user"))?.id;
  }
  return null;
};
export const getAuthStatus = () => {
  if (typeof window !== "undefined") {
    // Check if we're on the client-side
    return JSON.parse(localStorage.getItem("isAuthenticated"));
  }
  return null;
};

export const numberToWords = (number) => {
  const ones = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (number < 0 || number > 999) {
    return "Number out of range (0-999)";
  }

  if (number < 20) {
    return ones[number];
  }

  if (number < 100) {
    const ten = Math.floor(number / 10);
    const one = number % 10;
    return tens[ten] + (one > 0 ? `-${ones[one]}` : "");
  }

  const hundred = Math.floor(number / 100);
  const remainder = number % 100;
  return (
    ones[hundred] +
    " Hundred" +
    (remainder > 0 ? ` and ${numberToWords(remainder)}` : "")
  );
};



export function addCommasToNumber(number) {

  var numberStr = number.toString();


  if (numberStr.includes('.')) {

    var parts = numberStr.split('.');


    var integerPartWithCommas = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    var result = integerPartWithCommas + '.' + parts[1];
  } else {
    // Add commas to the entire number if it's an integer
    var result = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return result;
}




export function convertToHumanReadableDate(isoDateString) {

  var date = new Date(isoDateString);

  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  var humanReadableDate = date.toLocaleDateString('en-US', options);

  return humanReadableDate;
}


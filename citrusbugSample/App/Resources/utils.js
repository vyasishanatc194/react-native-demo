export function validateEmail(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
    }

  export function nlVat(value) {
    
    if (!/(NL)?[0-9]{9}B[0-9]{2}$/.test(value)) {
        return false;
    } else {
    return true;
    }
    // const weight = [9, 8, 7, 6, 5, 4, 3, 2];
    // let sum = 0;
    // for (let i = 0; i < 8; i++) {
    //     sum += parseInt(v.charAt(i), 10) * weight[i];
    // }
    // sum = sum % 11;
    // if (sum > 9) {
    //     sum = 0;
    // }
    // return {
    //     meta: {},
    //     valid: `${sum}` === v.substr(8, 1),
    // };
}

export function beVat(value) {
  let v = value;
  if (!/(BE)?0[0-9]{9}$/.test(v)) {
      return false
  } else {
  return true
  }
  // if (v.length === 9) {
  //     v = `0${v}`;
  // }
  // if (v.substr(1, 1) === '0') {
  //     return {
  //         meta: {},
  //         valid: false,
  //     };
  // }
  // const sum = parseInt(v.substr(0, 8), 10) + parseInt(v.substr(8, 2), 10);
  // return {
  //     meta: {},
  //     valid: sum % 97 === 0,
  // };
}
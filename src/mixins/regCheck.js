/*
 *  正则验证
 */

/*
 *手机格式验证
 */
export function vPhone(value) {
  const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}

/*
 *密码验证
 */
export function vPassword(value) {
  const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{6,20}$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}

/*
 * 验证短信码
 * */
export function vSMS(value) {
  const reg = /^(?=.*\d).{4}$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}

/*
 *图形码验证
 */
export function vCode(value) {
  const reg = /^(?=.*[a-zA-Z])(?=.*\d).{4}$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}

/*
 *验证英文数字
 */
export function vWorld(value) {
  const reg = /^[0-9a-zA-Z]*$/g;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}

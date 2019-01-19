import service from "@/api/fetchAuth";
import CONST from "@/api/const";

/**
 * 获取手机验证码
 * @param cid
 * @returns {servicePromise<any>}
 */
export function sendPhoneCode() {
  // return service.post('/member/login', {account, password})
  return 1;
}
/**
 * 获取图片验证码
 * @param cid
 * @returns {servicePromise<any>}
 */
export function getImgCode() {
  return service.post(
    "",
    {
      platform: CONST.request.PLATFORM
    },
    {
      target: "MANAGER-API-140"
    }
  );
}
/**
 * 验证码登录
 * @param cid
 * @param userName
 * @param password
 * @returns {servicePromise<any>}
 */
export function codeLogin(userName, password) {
  return service.post(
    "",
    {
      userName,
      password,
      platform: CONST.request.PLATFORM
    },
    {
      target: "MANAGER-API-100"
    }
  );
}
/**
 * 密码登录
 * @param cid
 * @param userName
 * @param password
 * @returns {servicePromise<any>}
 */
export function login(userName, password, validateCodeKey, validateCode) {
  return service.post(
    "",
    {
      userName,
      password,
      validateCodeKey,
      validateCode,
      platform: CONST.request.PLATFORM
    },
    {
      target: "MANAGER-API-100"
    }
  );
}

/**
 * 退出登录
 * @returns {servicePromise<any>}
 */
export function loginout() {
  return service.post(
    "",
    {},
    {
      target: "MANAGER-API-101"
    }
  );
}

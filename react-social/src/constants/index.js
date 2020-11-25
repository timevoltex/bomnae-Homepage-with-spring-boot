export const API_BASE_URL = "http://bomnae1971.site:8080";
// export const API_BASE_URL = "http://14.32.217.141:8080";
export const ACCESS_TOKEN = "accessToken";
export const ADMIN_TOKEN = false;

export const OAUTH2_REDIRECT_URI = "http://bomnae1971.site/oauth2/redirect";
export const DEVELOPMENT_URL = "http://14.32.217.141:8080";
export const DEVELOPMENT_REDIRECT_URL = "http://localhost:3000/oauth2/redirect";

export const GOOGLE_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/kakao?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorize/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;

export const GUESTBOOK_URL = API_BASE_URL + "/guestbook-list";

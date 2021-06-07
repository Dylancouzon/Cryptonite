import * as queryString from 'query-string';
import axios from 'axios';
import API from "./api";

const stringifiedParams = queryString.stringify({
  client_id: '232246939902-feprc0hdm5dl57fbkpomoq7cec1lkpce.apps.googleusercontent.com',
  redirect_uri: 'https://cryptonite.azurewebsites.net/profile',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

const urlParams = queryString.parse(window.location.search);

if (urlParams.error) {
  console.log(`An error occurred: ${urlParams.error}`);
} else if(urlParams.code) {
   getAccessTokenFromCode(urlParams.code)
  .then((res)=>{
    getGoogleUserInfo(res)
    .then((userInfo)=>{
        const data = {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name.split(" ").join("")
        }
        API.googleOauth(data)
        .then((result)=>{
          if(result.data.message){
            console.log(result.data.message);
             privateKey = result.data.message;

          };
          if(result.data.user){
            window.location.reload();
          }
        });
    })
  });

}

async function getAccessTokenFromCode(code) {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: 'post',
      data: {
        client_id: '232246939902-feprc0hdm5dl57fbkpomoq7cec1lkpce.apps.googleusercontent.com',
        client_secret: '0-HuUnGtmzhrsr0IebcTqVgf',
        redirect_uri: 'http://localhost:3000/profile',
        grant_type: 'authorization_code',
        code,
      },
    });
    return data.access_token;
  };

  async function getGoogleUserInfo(access_token) {
    const { data } = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
  };

  export var privateKey = "";
import { Alert } from "react-native";
import axios from "axios";
import { buildHeader, imagePreFetcher } from "./helpers";
import { live, BASE_URL, POST_TYPES } from "./globals";

import { helpers } from "..";
import { chain, uniqBy } from "lodash";
import AsyncStorage from '@react-native-community/async-storage';

//const URL = 'http://localhost:3146/api/';
//const URL = 'http://10.0.28.189:3146/api/';
//const URL = 'http://picstagraph-backend-dev.us-east-1.elasticbeanstalk.com/api/';
let URL = "";

//App API's
const REGISTER_SAVE_U = { type: "POST", url: URL + "users?isMobile=true" };
const LOGIN_U = { type: "POST", url: URL + "auth/login/" };
const FBLOGIN_U = { type: "POST", url: URL + "users/facebook-user" };
const SOCIAL_PROVIDER_SAVE_U = {
  type: "PATCH",
  url: (provider) => {
    return URL + "users/" + provider + "/save";
  },
  dynamic: true,
};
const SOCIAL_PROVIDER_DISCONNECT_U = {
  type: "DELETE",
  url: (provider) => {
    return URL + "auth/" + provider + "/disconnect";
  },
  dynamic: true,
};


const OWN_SAVEDFEEDS_U = {
  type: "GET",
  url: (d) =>
    URL + "savepost/" + d.id + "?page=" + d.page + "&limit=" + d.limit,
  dynamic: true,
};


//Current Now
const END_POINT = { type: "POST", url: "https://ws.taskerium.com/saas/login/" };
const REGISTER_USER = { type: "POST", url: URL + "sync_registration_data" };
const LOGIN_USER = { type: "POST", url: URL + "login" };
const GET_TASKS = { type: "POST", url: URL + "get_core_data" };
const FORGET_PASSWORD = { type: "POST", url: URL + "recover_password" };
const RESET_PASSWORD = { type: "POST", url: URL + "reset_password" };

// const REGISTER_USER = { type: "POST", url: getBaseUrl() }



export const API = {

  getEndPoint: (data, cb) => request(data, cb, END_POINT, {}, "", false),
  registerUser: async (data, cb) => request(data, cb, REGISTER_USER),
  loginUser: async (data, cb) => request(data, cb, LOGIN_USER),
  getAllTasks: async (data, cb) => request(data, cb, GET_TASKS),
  forgetPassword: async (data, cb) => request(data, cb, FORGET_PASSWORD),
  resetPassword: async (data, cb) => request(data, cb, RESET_PASSWORD),

  registerSave: (data, cb) => request(data, cb, REGISTER_SAVE_U),
  login: (data, cb) => request(data, cb, LOGIN_U),
  fblogin: (data, cb) => request(data, cb, FBLOGIN_U),
  instagramUserInfo: (data, cb) => request(data, cb, INSTAGRAM_U),
  socialProviderSave: (data, cb, header, urlData) =>
    request(data, cb, SOCIAL_PROVIDER_SAVE_U, header, urlData),
  socialProviderDisconnect: (data, cb, header, urlData) =>
    request(data, cb, SOCIAL_PROVIDER_DISCONNECT_U, header, urlData),
  validateToken: (data, cb, header) =>
    request(data, cb, VALIDATE_TOKEN_U, header),
  languageSet: (data, cb, header, urlData) =>
    request(data, cb, LANGUAGE_SET_U, header, urlData),
  getAllCampaignsList: (data, cb, header) =>
    request(data, cb, CAMPAIGNS_GET_ALL_U, header),
  getUserInfo: (data, cb, header, urlData) =>
    request(data, cb, USERINFO_GET_U, header, urlData),
  userInfoUpdate: (data, cb, header) =>
    request(data, cb, USERINFO_UPDATE_U, header),
  imageUpload: (data, cb, header, urlData) =>
    request(data, cb, IMAGE_UPLOAD_U, header, urlData),
  saveVideoPost: (data, cb, header, urlData) =>
    request(data, cb, VIDEO_POST_CREATE_U, header, urlData),
  saveMediaPost: (data, cb, header, urlData) =>
    request(data, cb, MEDIA_POST_SAVE_U, header, urlData),
  profileImageSave: (data, cb, header, urlData) =>
    request(data, cb, PROFILE_IMAGE_SAVE, header, urlData),
  campaignFavoriteGetApi: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_FAVORITE, header, urlData),
  campaignGetApi: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_GET_U, header, urlData),
  campaignGetApi2: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_GET_U_V2, header, urlData),
  campaignUpdateRedis: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_GET_UDTATE_REDIS, header, urlData),
  likesPostApi: (data, cb, header, urlData) =>
    request(data, cb, LIKE_POST_U, header, urlData),
  notificationReadPostApi: (data, cb, header, urlData) =>
    request(data, cb, NOTIFICATION_READ_POST_U, header, urlData),
  getLikeUsers: (data, cb, header, urlData) =>
    request(data, cb, LIKE_USER_GET_U, header, urlData),
  commentsGetApi: (data, cb, header, urlData) =>
    request(data, cb, COMMENTS_GET_U, header, urlData),
  commentsSaveApi: (data, cb, header, urlData) =>
    request(data, cb, COMMENTS_SAVE_U, header, urlData),
  commentsEditApi: (data, cb, header, urlData) =>
    request(data, cb, COMMENTS_EDIT_U, header, urlData),
  commentsDeleteApi: (data, cb, header, urlData) =>
    request(data, cb, COMMENTS_DELETE_U, header, urlData),
  participantGetApi: (data, cb, header, urlData) =>
    request(data, cb, PARTICIPANTS_GET_U, header, urlData),
  participantTop10GetApi: (data, cb, header, urlData) =>
    request(data, cb, PARTICIPANTS_TOP10_GET_U, header, urlData),
  homeNewsfeedGetApi: (data, cb, header, urlData) =>
    request(data, cb, HOME_NEWSFEED_U, header, urlData),
  homeExploreGetApi: (data, cb, header, urlData) =>
    request(data, cb, HOME_EXPLORE_U, header, urlData),
  homeExploreGetApi2: (data, cb, header, urlData) =>
    request(data, cb, HOME_EXPLORE_U_V2, header, urlData),
  homeParticipantGetApi: (data, cb, header, urlData) =>
    request(data, cb, HOME_PARTICIPANT_U, header, urlData),
  usersListGet: (data, cb, header, urlData) =>
    request(data, cb, USER_LIST_GET, header, urlData, true),
  usersListSearch: (data, cb, header, urlData, imageFetcher) =>
    request(data, cb, USER_LIST_SEARCH, header, urlData, imageFetcher),
  getOwnNewsFeeds: (data, cb, header, urlData) =>
    request(data, cb, OWN_NEWSFEEDS_U, header, urlData),
  getOwnNewsFeeds2: (data, cb, header, urlData) =>
    request(data, cb, OWN_NEWSFEEDS_U_V2, header, urlData),
  saveOwnSaved: (data, cb, header) =>
    request(data, cb, SAVE_SAVEDFEEDS_U, header),
  getOwnSaved: (data, cb, header, urlData) =>
    request(data, cb, OWN_SAVEDFEEDS_U, header, urlData),
  getUserContest: (data, cb, header, urlData) =>
    request(data, cb, USRE_CONTEST_U, header, urlData),
  reportPost: (data, cb, header) => request(data, cb, REPORT_POST_U, header),
  getOtherNewsFeeds: (data, cb, header, urlData) =>
    request(data, cb, OTHER_NEWSFEEDS_U, header, urlData),
  getOtherNewsFeeds2: (data, cb, header, urlData) =>
    request(data, cb, OTHER_NEWSFEEDS_U_V2, header, urlData),
  blockOtherUser: (data, cb, header, urlData) =>
    request(data, cb, OTHER_USER_BLOCK_U, header, urlData),
  unblockOtherUser: (data, cb, header, urlData) =>
    request(data, cb, OTHER_USER_UNBLOCK_U, header, urlData),
  updatePushNotifications: (data, cb, header) =>
    request(data, cb, UPDATE_PUSH_NOTIFICATIONS, header),
  likeOtherUser: (data, cb, header) =>
    request(data, cb, LIKE_OTHER_USER_U, header),
  getPushNotifications: (data, cb, header) =>
    request(data, cb, GET_PUSH_NOTIFICATIONS, header),
  subscribeUser: (data, cb, header, urlData) =>
    request(data, cb, SUBSCRIBE_USER_U, header, urlData),
  unsubscribeUser: (data, cb, header, urlData) =>
    request(data, cb, UNSUBSCRIBE_USER_U, header, urlData),
  updateSubscribeRequests: (data, cb, header) =>
    request(data, cb, SUBSCRIBE_REQUESTS_UPDATE_U, header),
  getSubscribedUsers: (data, cb, header, urlData) =>
    request(data, cb, SUBSCRIBED_UESERS_GET_U, header, urlData),
  getSubscribers: (data, cb, header, urlData) =>
    request(data, cb, SUBSCRIBERS_GET_U, header, urlData),
  getMessages: (data, cb, header, urlData) =>
    request(data, cb, MESSAGES_LIST_GET_U, header, urlData),
  getUserMessages: (data, cb, header, urlData) =>
    request(data, cb, GET_USER_MESSAGES_U, header, urlData),
  getPicsHomeList: (data, cb, header, urlData) =>
    request(data, cb, GET_PICS_HOME_U, header, urlData),
  getUserStory: (data, cb, header, urlData) =>
    request(data, cb, GET_PICS_STATUS_U, header, urlData),
  getPicsStatus: (data, cb, header, urlData) =>
    request(data, cb, GET_PICS_STATUS_U, header, urlData),
  getLikeYouNotifications: (data, cb, header) =>
    request(data, cb, GET_LIKE_YOU_NOTIFICATIONS, header),
  saveCampaignParticipant: (data, cb, header) =>
    request(data, cb, CAMPAIGN_PARTICIPANT_SAVE, header),
  postClick: (data, cb, header, urlData) =>
    request(data, cb, POST_CLICK_U, header, urlData),
  companyCampaginPostClick: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_POST_CLICK_U, header, urlData),
  companyCampaginCallToAction: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_CALL_TO_ACTION_U, header, urlData),
  postViews: (data, cb, header, urlData) =>
    request(data, cb, POST_VIEW_U, header, urlData),
  deviceFirebaseTokenSave: (data, cb, header) =>
    request(data, cb, DEVICE_FIREBASE_TOKEN_SAVE_U, header),
  getNotifications: (data, cb, header, urlData) =>
    request(data, cb, GET_NOTIFICATIONS_U, header, urlData),
  getNotificationMentionInfo: (data, cb, header, urlData) =>
    request(data, cb, GET_NOTIFICATIONMENTION_INFO, header, urlData),
  getCamapignInfo: (data, cb, header, urlData) =>
    request(data, cb, GET_CAMPAIGN_INFO, header, urlData),
  getMediaInfo: (data, cb, header, urlData) =>
    request(data, cb, GET_MEDIA_INFO, header, urlData),
  getParticipantInfo: (data, cb, header, urlData) =>
    request(data, cb, GET_PARTICIPANT_INFO, header, urlData),
  deleteOwnPost: (data, cb, header, urlData) =>
    request(data, cb, DELETE_OWN_POST, header, urlData),
  postUpdate: (data, cb, header, urlData) =>
    request(data, cb, POST_UPDATE, header, urlData),
  deleteMessage: (data, cb, header, urlData) =>
    request(data, cb, MESSAGE_DELETE, header, urlData),
  forgotPassEmailSend: (data, cb, header) =>
    request(data, cb, FORGOT_PASS_EMAIL_SEND, header),
  validateResetPassword: (data, cb, urlData) =>
    request(
      data,
      cb,
      VALIDATE_RESET_PASSWORD,
      helpers.buildHeader({}),
      urlData
    ),
  resetPassword: (data, cb, header) =>
    request(data, cb, RESET_PASSWORD, header),
  getNotificationCounter: (data, cb, header) =>
    request(data, cb, GET_NOTIFICATION_COUNTER, header),
  participantWinnersGetApi: (data, cb, header, urlData) =>
    request(data, cb, PARTICIPANTS_WINNERS_GET_U, header, urlData),
  validateRegister: (data, cb, urlData) =>
    request(data, cb, VALIDATE_REGISTER, helpers.buildHeader({}), urlData),
  getStaticInfo: (data, cb, header) =>
    request(data, cb, GET_STATIC_INFO, header),
  awardUserPoints: (data, cb, header, urlData) =>
    request(data, cb, AWARD_USER_POINTS, header, urlData),

  //Privacy Screen
  activateDeactivateProfileSet: (data, cb, header) =>
    request(data, cb, ACTIVATE_DEACTIVATE_PROFILE_SET, header),
  advertizeProfileSet: (data, cb, header, urlData) =>
    request(data, cb, ADVERTIZE_PROFILE_SET, header, urlData),
  socialShareProfileSet: (data, cb, header, urlData) =>
    request(data, cb, SOCIAL_SHARE_PROFILE_SET, header, urlData),
  changePassword: (data, cb, header) =>
    request(data, cb, CHANGE_PASSWORD_U, header),
  changeEmail: (data, cb, header) => request(data, cb, CHANGE_EMAIL_U, header),

  //Filters
  categoryFilterGet: (data, cb, header) =>
    request(data, cb, CATEGORIES_GET_U, header),
  categoryFilterSave: (data, cb, header) =>
    request(data, cb, CATEGORIES_SAVE_U, header),
  offerTagFilterGet: (data, cb, header) =>
    request(data, cb, OFFER_TAG_GET_U, header),
  offerTagFilterSave: (data, cb, header) =>
    request(data, cb, OFFER_TAG_SAVE_U, header),
  inquiryTagFilterGet: (data, cb, header) =>
    request(data, cb, INQUIRY_TAG_GET_U, header),
  inquiryTagFilterSave: (data, cb, header) =>
    request(data, cb, INQUIRY_TAG_SAVE_U, header),
  hashtagFilterGet: (data, cb, header) =>
    request(data, cb, HASHTAG_TAG_GET_U, header),
  hashtagFilterSave: (data, cb, header) =>
    request(data, cb, HASHTAG_TAG_SAVE_U, header),

  //Service
  sendFeedback: (data, cb, header) =>
    request(data, cb, SEND_FEEDBACK_U, header),
  deleteAccount: (data, cb, header) =>
    request(data, cb, DELETE_ACCOUNT_U, header),
  sendReportProblem: (data, cb, header) =>
    request(data, cb, SEND_REPORT_PROBLEM_U, header),
  sendAuthorityReport: (data, cb, header) =>
    request(data, cb, SEND_REPORT_AUTHORITY_U, header),
  locationCountryFilterGet: (data, cb, header) =>
    request(data, cb, LOACTION_COUNTRY_GET_U, header),
};

// request({}, {
//     success: (res) => { console.log("res", res); },
//     error: () => {}
// }, {
//     type: 'GET',
//     url: 'http://10.0.28.189:3001/api/searchHistory'
// })

function getRequestData(data) {
  let formBody = [];
  let encodedKey;
  let encodedValue;
  for (let property in data) {
    encodedKey = property;
    encodedValue = data[property];
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
}

// async function requestBaseUrl () {
//   // const baseUrl = await AsyncStorage.getItem("baseUrl");
//   console.log("featureURL :", featureURL)
//   let url = "";
//   if (retriveBaseUrl) {
//     console.log("bacd")
//     let baseUrl = await getBaseUrl()
//     let endurl = featureURL.dynamic ? featureURL.url(urlData) : featureURL.url;
//     console.log({ baseUrl, endurl })
//     url = baseUrl + "v2/Default.asmx/" + endurl
//   } else {
//     console.log("abc")
//     url = featureURL.dynamic ? featureURL.url(urlData) : featureURL.url;

//   }
// }

async function request(requestData, cb, featureURL, secureRequest = buildHeader(), urlData = '', retriveBaseUrl = true) {
  // const baseUrl = await AsyncStorage.getItem("baseUrl");
  console.log("featureURL :", featureURL)
  let url = "";
  if (retriveBaseUrl) {
    console.log("bacd")
    let baseUrl = await getBaseUrl()
    let endurl = featureURL.dynamic ? featureURL.url(urlData) : featureURL.url;
    console.log({ baseUrl, endurl })
    url = baseUrl + "v2/Default.asmx/" + endurl
  } else {
    console.log("abc")
    url = featureURL.dynamic ? featureURL.url(urlData) : featureURL.url;

  }
  // const url = baseUrl + featureURL.url
  if (!live) {
    console.groupCollapsed("API REQUEST");
    console.log({ featureURL });
    console.log({ secureRequest });
    console.log({ requestData });
    console.log({ url });
    console.groupEnd();
  }

  try {
    let response;

    if (featureURL.type == 'GET') {
      response = await axios.get(url, {
        headers: secureRequest,
        params: requestData
      })
    }
    else if ('POST|PATCH|PUT'.includes(featureURL.type)) {
      response = await axios[featureURL.type.toLocaleLowerCase()](url, requestData, {
        headers: secureRequest
      })
    }
    else if ('DELETE'.includes(featureURL.type)) {
      response = await axios.create({ headers: secureRequest }).delete(url);
    }
    if (!live) {
      console.groupCollapsed("API RESPONSE");
      console.log({ response });
      console.groupEnd();
    }
    if (cb.complete) cb.complete();

    if (response.status == 200) {
      cb.success(response.data);
    } else {
      if (response.data.message === 'Invalid credentials' || response.data.error === 'Error: Invalid credentials') {
        logout();
      }
      cb.error(response.data);
    }
  } catch (error) {
    !live ? console.log({ error }) : null;
    if (cb.complete) cb.complete();
    if (error.response) {
      if (error.response.data.message === 'Invalid credentials' || error.response.data.error === 'Error: Invalid credentials') {
        logout();
      }
      cb.error(error.response.data);
    }
    else {
      if (error.data.message === 'Invalid credentials' || error.data.error === 'Error: Invalid credentials') {
        logout();
      }
      cb.error(error);
    }
  }
}

function logout() {
  setTimeout(() => {
    Alert.alert(
      'Success',
      'Authentication failed',
      [
        {
          text: 'OK', onPress: () => {
            // NavigationService.navigate('rootNav', 'Login', {});
          }
        },
      ]
    );
  }, 300);
}

async function getBaseUrl() {
  console.log(" getBaseUrl :")
  const baseUrl = await AsyncStorage.getItem("baseUrl");
  // URL = baseUrl + "v2/Default.asmx/"
  return baseUrl
}
import { Dimensions, Platform } from "react-native";
// import DeviceInfo from "react-native-device-info";

export const live = false;
// export const BASE_URL = 'http://184.72.194.163/';
// export const BASE_URL = "https://api.picstagraph.com/";
// export const BASE_URL = "http://stagingapi.picstagraph.com/";


export const API_KEY = "TqKGLk2e";

export const POST_TYPES = {
};

var userData = {
  baseUrl: ""
};

export const setUserData = (prop, value) => {
  userData[prop] = value;
};
export const getUserData = (prop) => userData[prop];
export const getAllData = () => userData;

export const fcmToken = "";
export const receivingNotificationId = "";

export const CREDS = {
  LINKING_APP_NAME: "picstagraphApp",
  INSTAGRAM_CLIENT_ID: "58e2155f75df4cbc9560e9f33facce06",
  TWITTER_COMSUMER_KEY: "5ODNF25DfGXVnWYvjgeyiGQjh",
  TWITTER_CONSUMER_SECRET: "7ubq7Ig5kI6RCn80z2J1AU78soy4E3JZ9hswd3l65CHLJP3dOx",
  //ANALYTICS_TRACKER_ID: "UA-129127828-1", //Mobils-app account
  ANALYTICS_TRACKER_ID: "UA-127336629-1", //Mobils-app account
  //ANALYTICS_TRACKER_ID: "UA-129118641-1", //Demo account
  JWT_SECRET_KEY: "picstagraph90",
  GOOGLE_SEARCH_PLACES_KEY: "AIzaSyD8nNA8oClra35kgn3VAi1Eo5jdZnNgd24",
  RESET_PASS_TASK: "resetPassword",
  LOGIN_TASK: "login",
};

export const WINDOW = Dimensions.get("window");
export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const WINDOW_WIDTH = Dimensions.get("window").width;
export const iPhoneX =
  Platform.OS == "ios" && WINDOW.height == 812 && WINDOW.width == 375
    ? true
    : false;
export const footerHeight = iPhoneX ? 80 : 60;

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const LANG_ARR = {
  English: "en",
  German: "he",
};

export const PAGINATION = {
  // subscribers: 10,
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  pages: 0,
};

export const EMPTY_LOCATION = JSON.stringify({
  longitude: "",
  latitude: "",
  address: "",
});


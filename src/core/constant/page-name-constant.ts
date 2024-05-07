export type Page = {
  path: string;
  name: string;
};

export class PageNamesConstants {
  static Camera: Page = {
    path: "/camera",
    name: "camera",
  };
  static Battery: Page = {
    path: "/battery",
    name: "battery",
  };
  static Localisation: Page = {
    path: "/localisation",
    name: "localisation",
  };
  static Gallery: Page = {
    path: "/gallery",
    name: "gallery",
  };
  static PhoneCall: Page = {
    path: "/phonecall",
    name: "phonecall",
  };
  static Vibration: Page = {
    path: "/vibration",
    name: "vibration",
  };
  static WebOTP: Page = {
    path: "/webotp",
    name: "webotp",
  };
  static Tchat: Page = {
    path: "/tchat",
    name: "tchat",
  };
}

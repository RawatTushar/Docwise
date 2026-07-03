export const CLIENTS = {
  RajagiriUAT: {
    BASE_URL: 'https://mobappsuat.rajagirihospital.com/MobhiHisTreeCore_UATReact',
    WebViewLink: 'https://mobappsuat.rajagirihospital.com/MobHisTreeTest/MobiHISTree.svc/',
    HisReportingService: 'https://mobappsuat.rajagirihospital.com/HISTreeReportingService_UAT',
  },
  // Add more clients here to switch between multiple environments.
  RajagiriLive: {
    BASE_URL: 'https://patientportal.rajagirihospital.com/MobiHISTreeReact',
    WebViewLink: 'https://patientportal.rajagirihospital.com/MobHisTreeForLive/MobiHISTree.svc/',
    HisReportingService: 'https://patientportal.rajagirihospital.com/HISTreeReportingService_Live',
  },
  ShijaLive: {
    BASE_URL: 'https://mobihistree.shijahospitals.com/MobiHISTreeCoreLive',
    WebViewLink: 'https://mobihistree.shijahospitals.com/MobWebViewLive/MobiHISTree.svc',
    HisReportingService: 'https://mobihistree.shijahospitals.com/HISTreeReportingService',
  },
  WoodlandsUAT: {
    BASE_URL: 'https://uat.woodlandshospital.in/MobiHistreeReactAPP',
    WebViewLink: 'https://uat.woodlandshospital.in/MobiHISTreeUat/MobiHISTree.svc/',
    HisReportingService: 'https://uat.woodlandshospital.in/PPService_UAT/Service.svc/',
  },
  SkrUat:{
       BASE_URL:"https://patientportal.skrhospital.com/MobiHisTreeCoreReact_UAT",
  }
};

export const DEFAULT_CLIENT = 'SkrUat';
export const BASE_URL = CLIENTS[DEFAULT_CLIENT].BASE_URL;


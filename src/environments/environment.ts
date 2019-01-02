// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
   freightApiUrl: 'https://freight-portal-mobile-api-test.production-ase1.p.azurewebsites.net/api/', 
  // freightApiUrl: 'http://localhost:9773/api/',
  defaultUser: 'lizelle.britz@go2tigers.com',
  defaultPassword: 'Lizelle.12',
  useOAuth: true,
  // tslint:disable-next-line:max-line-length
  defaultOAuthToken: 'hxNdTyKZFDHnGebt52Owl7tQuw8tTk4-RK1xnOc0P08ZU4l9d1_brCL2O8y53dzOwRvS5YP9F4jeNkvOLMbncgfgMnE7oyY5_B_J9irnJN8PpGSk-rk1bb3WxD4QnXVeqDKbg7va39GxOrxCRH-rqxD9LRXwN2lq1D8HJCDLOerysSZNgtzBcRG_7gt7KNgKBFR4cfBN9cclEsVthMjQIhvUHru9GTwQRL92b9tIYjEsdEUa6CXOF_QwnWobw6sSoxHg3RmvY4DM2Duy1TWUKfTM7ioMlw8S2AKRO7Dt4AnViTHCftw4-hewUp2YYj0k0IXNWhECAg1KxLKpMlQZdpjW3YP-P2BZ4QQX9wucqqt9Vq_-HP4i69Fc9YoeSpf13mPSFYcDdXtolBByzpo2iRO5RNa9dYQIZO22NBtTCjcCFwER1wAOLNPKRVLVvPRvaBjkMMNeoRz6L-otGUUyI9SnXB2EHZahwGstIvM3hAXxF8Eta7FhRU1Ypftwnwapmi6kHwlQNDql7-UQiiUzwANncSV84ZSHckOOGCRnsbw'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

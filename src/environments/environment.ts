// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  
  defaultUser: 'lizelle.britz@go2tigers.com',
  defaultPassword: 'Lizelle.12',
  useOAuth: true,

  // Local
  // defaultOAuthToken: ''
  // freightApiUrl: 'http://localhost:9773/api/',

  // Test
  // tslint:disable-next-line:max-line-length
  // defaultOAuthToken: 'hxNdTyKZFDHnGebt52Owl7tQuw8tTk4-RK1xnOc0P08ZU4l9d1_brCL2O8y53dzOwRvS5YP9F4jeNkvOLMbncgfgMnE7oyY5_B_J9irnJN8PpGSk-rk1bb3WxD4QnXVeqDKbg7va39GxOrxCRH-rqxD9LRXwN2lq1D8HJCDLOerysSZNgtzBcRG_7gt7KNgKBFR4cfBN9cclEsVthMjQIhvUHru9GTwQRL92b9tIYjEsdEUa6CXOF_QwnWobw6sSoxHg3RmvY4DM2Duy1TWUKfTM7ioMlw8S2AKRO7Dt4AnViTHCftw4-hewUp2YYj0k0IXNWhECAg1KxLKpMlQZdpjW3YP-P2BZ4QQX9wucqqt9Vq_-HP4i69Fc9YoeSpf13mPSFYcDdXtolBByzpo2iRO5RNa9dYQIZO22NBtTCjcCFwER1wAOLNPKRVLVvPRvaBjkMMNeoRz6L-otGUUyI9SnXB2EHZahwGstIvM3hAXxF8Eta7FhRU1Ypftwnwapmi6kHwlQNDql7-UQiiUzwANncSV84ZSHckOOGCRnsbw',
  // freightApiUrl: 'https://freight-portal-mobile-api-test.production-ase1.p.azurewebsites.net/api/', 

  // Live
  // tslint:disable-next-line:max-line-length
  defaultOAuthToken: 'RHuP2Icoy8b-PVQaGrFxnyYrKCpKyOFFPJfcvTKoSFL514hYQlrEPlnQjJHEp6AureFKasG0TU_5S1A555LIYX9UxuFHCBQAAqMNkcRYTH_rYmW7Ps3FPouTxRQTfJZ1pUF43O6YQZaWUap144f3SpT-b9J2aq5IegoKP6Up0T11JwhgEgeahhQiagek0nHF60SguxtHKwYF6pzI7dO4A3dQ2pFp978DrDxfQyo3jGGAROblI0f2eTCEqAAP095uHJPLs3SRgk9HhFe92LtHByEGUKQmw4ogO6HhpiGOMECIxPauv3h1zK7CnfO9uNq5ilk4sYj5d03yjcsX9eeavf0vNsnmN67x4sIzkSowtAMSaZCBiZo8r512fPsWv0DWxCbkQdb1a81LMvOCiR-1XMGK-N-Jc1uEmn1NJIJNkwD3h4IzfxZLScjyIBhEBkfOu8TemPPJ2ipUNHNjdPClQCrncYEI9OFf00sywJXSBj-QgmUiT_vP_roXELzheMeNIe1BEilBYKFaGkMchdMMQaVtHKhh9ZgKNfsoSb525Hs',
  freightApiUrl: 'https://freight-portal-mobile-api-live.production-ase1.p.azurewebsites.net/api/', 
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

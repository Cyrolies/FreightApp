// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  freightApiUrl: 'https://freight-portal-mobile-api-test.production-ase1.p.azurewebsites.net/api/',
  defaultUser: 'lizelle.britz@go2tigers.com',
  useOAuth: false,
  // tslint:disable-next-line:max-line-length
  defaultOAuthToken: 'xEr2jrPyUf1g75byz5LMc2XImNUGAOJEC97zhqGAb9WSxbR4dOMFn3XvHwuKCZ-wiGoKJWUqltEOPQmNvkNHJJGRAjfRbfOukS2lbMm-HtUZHc-A8CoUlLTF3WUu4WcJEPLNuegoCZa2apodEMeEmmf1UDTEcXwqMNhgtto_QXMa4vVWJRX0cdv0lG-EvOE0vjWtYDltmu5oZBB1aJ33DxqdqF4lYurWslBopIx2LV3nZyPVhzTjfqqmaaHbUD8SwDoXqvSmWKllL6E9rx_efvYf-zsX6SaoKWPm1KWN5PKYT1XhyP6h31rG4oFisBJd4pbkV0FEtjgyl5oEob5-6soEZVC5t0qK1HHplXdLRD9TLr6Pv0y3ZYAQ8SEZI0MAZCeQN6QXzG-dulT9LLLVHdniq8U6EfmMxZaVuW4KAk5CcQ8ehQDDdvNdjMliTNAJJ69ff3zk0T1zxteoIZArQbnB2LozANMRNCLkdLcszXeZJEUdaoHxEdHBOCUsa-wYktk2oEnX4nOm6hwZlMJPUBKAhHL8tVCUJ8gr-1mRSKw'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

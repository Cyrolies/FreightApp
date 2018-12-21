import { PowerBISettings, EmbedConfig } from './../../../providers/freight-api.service';
import * as pbi from 'powerbi-client';
import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FreightApiService, EventTopic } from '../../../providers/freight-api.service';
import { ToastController, LoadingController, NavController, NavParams, Events } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-about',
  templateUrl: 'freightspend.html',
  encapsulation: ViewEncapsulation.None
})
export class FreightSpendPage {

  embedConfig: EmbedConfig;
  constructor(
    // public popoverCtrl: PopoverController,
    public freightApiService: FreightApiService,
    // public router: Router,
    public toastCtrl: ToastController,
    public loading: LoadingController,
    public http: HttpClient,
    private userData: UserData,
    public navCtrl: NavController,
    private events: Events
  ) {}

 async ionViewDidEnter() {
  const spinner = await this.loading.create();
  spinner.present().then(() => {

    const powerBISettings = new PowerBISettings() ;
    powerBISettings.UserID = 'SIMFISSEA';
    powerBISettings.RoleName = 'Freight Spend Dashboard RLS';
    powerBISettings.ReportID = '6207ba27-b218-43f5-87b1-479598475a19';
    powerBISettings.WorkspaceID = '0605ad47-8f86-435d-b6d8-63dc5842ee07';

    this.freightApiService.GetPowerBiReport(powerBISettings).subscribe((result: EmbedConfig) => {

      this.embedConfig = result;
      spinner.dismiss();
           // Report’s Secured Token
          // tslint:disable-next-line:max-line-length
          const accessToken = this.embedConfig.EmbedToken.token; // 'H4sIAAAAAAAEAB2Wxc7FXI5F3-WfpqQwlVSDMDPfWZiZ0-p3769rblk-y95L53_-sdN3mNPin3__Y89LK2FNNM4SSzebx3zIT-fTReQmq5MRRUXM7uV8Wpc8jXLTRtXYfjzHU7BTLhvSk-Ek-V777KmgJR62Eq-ogOfBANIre36NFNPM2W8Q_iSf2YkteGj9rTsdbsNHceUNi7ZTIeQybRH8fA4mPcvamCgW9WjeGwtBm1qLB3k_UkeVgHQwp-37rmEw9CyUUyobhGyxWbOCpgBuL1g2CcMTwX887OFl7CamiA6548Ao612yMCXsHDXyWXlL4t5FMaM5OnvY4PjlUzPV8KdY9zvgm1so5dzicPZIEKdJqbVIriHaC40135BE1-9oHvgTYkibWUlMHSXufRRq21ETM_l-H66PbZXPBcKRWCShoI1Vy7ex_0bW-YavW-YsxUnkWCnG-HXHp_v79qID8TnWl_hlGq7dqACRA_fG0SN5kqbBTQGwDcZkOkfTG0xXI0joIkobO4IjPCpTyU6IZRLTDuGjTOmmDhW07Ufq7FdEFOk-NDWBVNDavShP-MU_6enaGsR6PG6RuUBaxnxHG6EsdJEJh5p2KwmpJo_lIGj6xqXkZbwKpLLVt1S_Q2dRQV2PnlsgWWZj6EKa-5LjGEgKrPmiLpQaY-6yamaGlh9BNt8KPlHCISxzyhc5w2GBJMst-Bs6VLOLEkKdJMKtF8llHVlSq_pIyn5FRgz-kHxsar2pdNUuP0bgH87iLr7EeCSAhY-rTcO6fpWt0Omd9dyPvrx6PwDCz8_g0URtL0TfZltLCGHxSxO0Z7V-nhleDumNjaKzW9WFXt28NdipLAnu7nA4Fyb-xUlsjzdl1cFQz8ENGCsV2TIxlS6zqhHeBEjg3hE9z_5w-K_pey7EZKeM9hSxCuui974BeHiC_h34D8iPUwIdQ2iH8WtUEOrvr2gZOc0jSYxinbDIn37C8jc1-5ffZBQG9wKbMk3_aM3Q5rG9uaerN7gawrwQ9u_4EA8y72ykw8okRd43PBBfe1fAIrOucLk4S8ohWaU4bCFPgJ__CD3DnEzBNlGGkTWemtokjFtzNxV54nWAe45Rr4Sznx2N9pnTX1Y8z4qYHiVMo4NcW8Se4InDVhwTem_PhTCntDHkJRDV_AT1ToGGqVAx2X9CH_wGSziVEqXr43rCB2zzQ9jp6VnnOK7eS7hr72WKVGJVPLqd5Dt2s5fAE56yHmiwyXfCIhU-O4Pg2SG6s4Bi4Gq8C63YpWS1biwUa6P-HGXglqHM3NNnvMc6roWRT2CfKjV3ld_0Qav-pS7N2L-5r3eyGQGUo1UMiPyomL8IP8HgXvEyMr_DMNeEBj23NWHqEWgpvBlSJC2vadY1iiKCX26rhg2Y32YGSDRZb2109wjStI6xh_lh8XGGKr3qWxcZUOZpaOI6oKjjvAXRj51RdGEN1kbIXM7v1iFmKe2M_4NF5pdvYUP2hm-8Di2qKXTPnDyGBfBipQAssPIRrwT0F37k2fXaZU2hPs9ck8ZAWQgBdFJSgbKj117mwwekKHp-knCcSSx0fppKbw-YyKuwa9n73nwSc0GkQUbcmWyQexiFUHBQVDdA7MArjvpeqnuU-xmFpALGXFRntz2hcrMC6dNDHr1JKwdU19eXaSr72qjcKyeNFdLAxlbfzeXBpu9J7APJ3PiohJ_CxY2OZxM8glVs99gz3hlOrl4IOsmxm0BJquYrmwXALvoVrPsiCu08WfGhp2npaHA9OPxCKVqlRAxm1GGd_kbl85TfkGxy09oBxDiGo734MuUQfx9CTSxzjw4JLZHEnWePzSceMnD9Y1PrNw5i49er8ekKZfq3AA8qd1MKqKTbLWG0WSs5tOCmAOAovLFP8wFEd0G31FD0Fp8ZGsP-vYgoqLMhTUH_KIzm3aGYbuvCu00yZijaBptR--ZQFARg-Dd2hiq9mKyuolV42sUJ0mJdcYr5sgR8Pyj_J6ioJGzLoOtkbc2D7mrQDGy3ybI8WbIuUpnR_DGDJBhTOzLcuO07lPGcDPWO2BHREe0ggzR4iqqurLDL9H7ERk1WkS3MRdylQ0y8-3NaQEHYu3U-PO2kryW_LmECv-QQTJ-bhfG5Fk2dACetx8zFGTjYDFhTXHDLF0Nm41dfuwG76hBm2Qohx9E0itdQdxNDzmgGLJIDggOISBgqGVVnSn41ggucYPddhxkMTf8nb5FtgXAQi7SQYWESgolk-h0fDFVKyxaxr2geZf-O4Q2UaDYNPC1mgOxErkd6hnaO29LG-NY96c51D749zalg3GiobceO9KJLB8TxPebtCNXtN2cIxd2Q5uXIA7c9olC8EYoMLeO303HxiWNuSZKqIRh35zlxIvCBrBM4KRpIDWzbjDJ5azUsbhRgpqSZcviR5apnVCy_A_QbUlAdUmrjCnTCArCJG13eZkj5k21tcLj6kxE01Qr3xAI6u3UGLAvslRSFuiif-s8___qH297lmLXy_ft6uaLe2SynoU2NsQ65L8dvnCAW_YtEvNZqpeJOlbE6fXioRAbkXnne3U8f7tBqUmOlOLyfGPcs-m3G7TXi5j7KSCu397CtZrHnFHMSNaKD5krrqzmAahYwHI0KOnG5_IMnBQ26ymGWJVJsNM14Abg_gsgUxVrx5g7w7MJKlHKNwMp4ooxG1emMFVvBdLkn0pvaG9obinnpSw5lcxqnpL0g99EF7YNLD6Xbn7fiQ_sWyAssBAmr0t6WMthou4x2gTvRkX3f-nurOZ0NnBzM5gprjJzLEDRoYeCwmVGUj7_-NVfCnUSkkL2l48fOb1eZ7JWk_aQif1tVjAVZdvCz3FE5B6P-z38xv0tTbkr4R1l9DWWcwRY9Ox5TBmgr8D_p_7fKa-spPc6t_Ct7_t7LluUX1z-6MA7NWNejw6LDB0VNT8FX8hTuqPK32yHeg9PaxkT7F_1saqeZ8ftznPdAMtXwzRWzRp0X835YB6XmDWyQTFnBuw5Di5_T9h5CFltbvyI_Kxv_uYHOzUfCYjnakF3Nl9I3dzJj4K2dpnY-Esg0cKXnokqV9oPJjOxyY3LrHQZKvm7svbpqfIcNGJNu69lqFEUjXDQ31ySlW0ndeautjbMNl1TKZNydlryAJ0FZK5XKRPNgaAoBheRHtua3Wkpp9gjYuXS5_Qa9MdfRXIhKuRhnt_WxBKMuyvmytsDvWSXNd54hMck4KUKJ57GLKLb9fvoAKwRSPoZtR_8f8__-H1uQ9kJuDAAA';
          console.log(this.embedConfig.EmbedToken.token);
          console.log(accessToken);
          // Embed URL
          // tslint:disable-next-line:max-line-length
          const embedUrl = this.embedConfig.EmbedUrl; // 'https://app.powerbi.com/reportEmbed?reportId=164339c4-59d3-4f79-a31b-e4235807369f&groupId=0605ad47-8f86-435d-b6d8-63dc5842ee07&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQifQ%3d%3d';
          // Report ID
          const embedReportId = this.embedConfig.Id; // '164339c4-59d3-4f79-a31b-e4235807369f';
          const models = pbi.models;
          const permissions = models.Permissions.All;

          // Configuration used to describe the what and how to embed.
          // This object is used when calling powerbi.embed.
          // This also includes settings and options such as filters.
          // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
          const config = {
              type: 'report',
              accessToken: accessToken,
              embedUrl: embedUrl,
              permissions: permissions,
              id: embedReportId,
              tokenType: models.TokenType.Embed,
              //          ,
              // settings: {
              //     filterPaneEnabled: true,
              //     navContentPaneEnabled: true
              // }
          };
          // Grab the reference to the div HTML element that will host the report.
          const reportContainer = <HTMLElement>document.getElementById('reportContainer');
          // Embed the report and display it within the div container.
         const powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        // let report = powerbi.embed(reportContainer, config);
        // powerbi.reset(reportContainer);
         const report = <pbi.Report>powerbi.embed(reportContainer, config);
       //  var report = powerbi.embed(reportContainer, config);


        //  Report.off removes a given event handler if it exists.
         report.off('loaded');
        //  Report.on will add an event handler which prints to Log window.
         report.on('loaded', function() {
              console.log('Loaded');
          });
          report.on('error', function(event) {
            console.log('Me : ' + event.detail);

          report.off('error');
        });
    }, error =>  spinner.dismiss());
  });



}


}

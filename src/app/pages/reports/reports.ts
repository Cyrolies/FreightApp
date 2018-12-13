import * as pbi from 'powerbi-client';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-about',
  templateUrl: 'reports.html',
  styleUrls: ['./reports.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportsPage {
  conferenceDate = '2047-05-17';
  hideMe = false;

  constructor() {
    this.hideMe = false;
   }
 // constructor(public popoverCtrl: PopoverController) { }

 onOpenReport(rep: string) {
  this.hideMe = true;
  // Report’s Secured Token
      // tslint:disable-next-line:max-line-length
      const accessToken = 'H4sIAAAAAAAEAC2WxQ7siBEA_-VdHclMkfZgj5mZbuYxM0b590xWe-9Ll1TV_Z8_Vvr0U1r8-fcfOuBYPtLrdy5WEJPO-x1mKyoDzZhUaWpSCoM5IlZTh0FBCbgvDQE2Agcim_yWohuBZyehmFzqAWjK1yhh5uCRFZekh5lgfH6I4RuJSfTlPq8TggHZXxvMacMWLkd8EudwjUDdXVILQ7pY7NA7r-Jq40-B1SU6puF8tRFUpHpoGuYrCqDdw0cWxDKUIZ-AoiMyVpXtkbkzA7_IJCgq9nmjXa7MKIIiOLC-ispoAK32GnlltVrWcG9g17V-lHB6SjVrEr_B9-QKKRGC6Y0e1rEwKOJS0yijrUqYKUrmxtMvN23w8itX98Pvk1H1CzUaYu_raWU_DWnhc436UjNiGNHqFYpkNrp9Q6T6Gu_sY-wxwQFTA9JwvbBIy_Kz1kAgJUx3FRUZZ0RUCUcHv_zEnkKNoR6IAN9Axk3b-YHmkDUFjLLy4f74NF_rsn1dxzRRq_QmOZcJaww1kDFpeEkH09LmlCeUm6CHo-un74_eyuPghHiDoZcXZCqjqA6gG-xw4HxVtYAhZ3g01sk7iKnTVHzXMRw-P_MbIUxt2W-CwUiABUqUShnhlbqBOQxB9qxWI2liI2Xdatcv6CULP7afaz7r5HxEBOoGS1afsoTIi_K0q-6rgsNXvm4kvDC-4IYhMCggbQp6o77Np0TSCz6C1CDWxKKB6IknbwKgsdSbbd5PRCgBXK3ysXR-ZkGIOSyqpk7xUZKh6MQzW12Mi4WEWLhvdRl4kMBiI6FVvrdhaJgQjchWpGdPw17OxQk8s4mjAyHdMXMGNfNI-qnLVrOpjD5_nRR1Ik0AyBCYuCt-EPTXDqh2iZj-7EcnRS59t1Zk-9CTndS6XgUhCrIBhsVhvbdSlvgs7621Fz2eQPRJQG01--UQCNL4nFKsob-OrnyNy4s4Icu5ReOH5WadLT41R3HsIA9SWhIo0TRnmnfu8i2BLjdcauKY_PH8N5yBLL64FML3jjwYD-s3QoK2Q0qwuDpvSJmDy52i1BB78YxDQuRsf9--PZlE4KFj-xQkqhgsOfryJi13o4UZgElv-S7dXrSGki2VRbO31ITttvq0iww13gkzAwgxaDNe7f5OStd-jgPVZwttIWp5qQ94jILC318oEtIiDGYQ5WHySVvtbFEm8c7Sob6MY39CPtkzpKYcFL6fUOeT7OfpYrQhf6A13PIYF74-4V3LuE44Tj-jA3jV4t-QTq7XZ2MnAmO84Y7t8R3qACKIjtBPCSF_ktkXnrtHshE1rz6W-yPHEJgCWK-OwHO81Vk0HoxMCb86TPpPNj-f2e_mGzepHFU55SqGY2G89Tyc9_QvLVn46DtxuyZeo5Hw8LPq9gI9ib8dYMuRtyPGku9tHhdJlFJYZse1Y1d95ypsHV0cbEqFRJDIUlHmDGFsqXpWCwHr5EBUktpahpPPsdbNM0COpr4oDrdOSzUb1R8Sfbx6Zi0TvN7hOEd3xljEzOgF9LxFDSZ8QuSx2HK3874nwLJLKrw_rYA4cc3koliX-9lXCrvhwPV3Wxx3oRiGePRBGh9ZXxYucr0Svad0jJK95Fu6AurpY-ZEUQ29Bd8YQHVc8eSntM2JIGAa9Emggt3bXIDwO9ZsWVUnOi502d4UfL56gFq5NRmrmpFfqZou7JUUgh8ptwKR3llOwXDDz1BYp2PzvJ26eabewLxOtbw_5xCLTAweSYWFkcSSFNFyYSQClZuynL0Hgu3RNxwh7KjCjh4OC7M2fbfGEPUMFIRIKL0qDFg1Gxn8-MiJ5cL4t3tkfEj37xNCJFaGfG5CqSm0W2SjeZ1Egdet-NTGCYGZy165kp3ezpf4Ukp0JtSdgkh-m-DcSwWC9tOC7v2txouaiisgIMe4IxI7iP04xfT1Jq5uZ4yAFy-AZXc5vJ8ynfL9tR3dRbfEwZCTAJFy-_g7v5Xmgzyv3FUdqex7O_Zxul6_21UllijADExGieiP7qs6-M9eQgWwq0MkQr-6tIGA6KtsIBRmB3a7700hyZWbC0Rz1MBt0qJkmJzzeAKswu0LcFYf86ciUzyqmIMDeBy1Cz0iGGXeVCLqQNrL1DItQ0BiI6IckX03O4Kn1C-OJTomD19OJ1hQLsTPa5KCPRWvPI_YZeQfYnr3Vr2jGM0-w62FmuUeGcrJ-THW3cuAdRdVkCNdvrvd2VA9cDjHyJxCAwmERIf4Tb2aTtUApjNfruMdR5-C2F7SS_giGK9QCT6Ihie8BUrh8-hZBvSLzmIUIiTiUgDPm4S5ZA20wm2zqvK5wrCS9fGKLLCBxMixEmssFeVObCfvK1Go2QDp2FqKd5h7bwbioNgal8UyB0TOM4ll7KOTutp-REjyoqvJR42a-_p8fTCaFNotaMo_LVspvjg8Y3Ppk1-p4D7pI2KcNNL0GykQ-cyPYaYMbiWdKtWR_ddff_7157M-8z6p5fN7s3rWW5VPR9Ax_HEByJSbjhOxrrxJKRkzapUrwSEg4PVxpuP7hgEVA8oy852Pi6thbC2pT2XU2XyGgNuAjp9MgM31Sc9MXfnEuilLluNr0GuWKpVzcN9RDGVDCzbZ9S-l-pCV-CgVt8Qq91iKDDQSRb5g3wErJ-VTt5IuoOGlzoKUZPFp-4quTZ1V6GmYHoiblmkrbC32cnoDCeG86UlVVP50siGLzjm0edxpIm7kdtgNidkzGmWrArXdbGay0WR77Vn2IZtMLtmRVi93lsbYTnJzjCrKUC3OgFHRmxZ_J2CC5ZSVJ7u3Ga6i3-lR0INTGQE40WxJ525C0PlhWpSqrZXgH8zP_C1XOfhR5nVvgZHJ58eLQl2d-Qb-cNd_T7lNPab7sZa_sS7fRHNrzslyY2aZFVsUq_0O2YS126UKymzY5uO8stI8ysU83YABDJuh5i33up6kfWuzcsY2NPKQmzbJviv1aXhwire350aQIO33AruAJDat7mGeJoC7bWANvhp4e4aLNyAcXk3W6gOIoVxS1_aAhzefbXZAwQCNC8YZtoBmDw83OAn594r17-Ucd3GFnM25VlXPm_YAb4Jb5dEoc4i2ddlIhBI-kmfbY2G_ury-8efwYsvTbk4e4lu1zMIevz6wuyTzK0unrLL5wDoOiwrPz9514opOwEyP6tD66MgF14Du_e6R-nmxTcIrEs9P8Fx4uP_xNmEzEMwdOt2s-2olyfrs_zH_938pkGNtWgwAAA==';
      // Embed URL
      // tslint:disable-next-line:max-line-length
      const embedUrl = 'https://app.powerbi.com/reportEmbed?reportId=164339c4-59d3-4f79-a31b-e4235807369f&groupId=0605ad47-8f86-435d-b6d8-63dc5842ee07&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQifQ%3d%3d';
      // Report ID
      const embedReportId = '164339c4-59d3-4f79-a31b-e4235807369f';

      // Configuration used to describe the what and how to embed.
      // This object is used when calling powerbi.embed.
      // This also includes settings and options such as filters.
      // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
      const config = {
          type: 'report',
          accessToken: accessToken,
          embedUrl: embedUrl,
          permissions: 1,
          id: embedReportId
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
     powerbi.reset(reportContainer);
     const report = <pbi.Report>powerbi.embed(reportContainer, config);


    //  Report.off removes a given event handler if it exists.
     report.off('loaded');
    //  Report.on will add an event handler which prints to Log window.
     report.on('loaded', function() {
          console.log('Loaded');
      });
      report.on('error', function(event) {
        console.log('Me : ' + event.detail);

      //  report.off("error");
    });
}
}

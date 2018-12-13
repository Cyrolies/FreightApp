import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-shipment-detail',
  templateUrl: 'shipment-detail.html',
  styleUrls: ['./shipment-detail.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShipmentDetailPage {
  speaker: any;

  constructor(
    private dataProvider: ConferenceData,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      const speakerId = this.route.snapshot.paramMap.get('id');
      if (data && data.speakers) {
        for (const speaker of data.speakers) {
          if (speaker && speaker.id === speakerId) {
            this.speaker = speaker;
            break;
          }
        }
      }
    });

  }

  goToSessionDetail(session: any) {
    this.router.navigateByUrl(`app/tabs/(schedule:session/${session.id})`);
  }
}

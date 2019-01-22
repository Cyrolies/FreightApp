import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    template: `

    <ion-fab vertical="top" horizontal="end" slot="fixed">
        <ion-fab-button (click)="onDismiss()" mini translucent>
            <ion-icon name="close"></ion-icon>
        </ion-fab-button>
    </ion-fab>
    

    <ion-list>
        <ion-item *ngFor="let item of items" text-wrap 
            style="--border-style: none;--min-height: 0;">

            <ion-label position="stacked" color="primary">{{item.key}}</ion-label>
            <ion-item style="align-self: flex-start; --border-style: none; margin-top: 0!important; --min-height: 0;" >
                {{item.value || '-'}}
            </ion-item>
        </ion-item>
    </ion-list>
    `,
})

export class MapPopover {

    items: { key: string, value: string}[] = [];

    constructor(private popoverCtrl: PopoverController) {

    }

    async onDismiss() {
        try {
            await this.popoverCtrl.dismiss();
        } catch (e) {
            // If click more than one time popover throws error, so ignore...
        }

    }
}

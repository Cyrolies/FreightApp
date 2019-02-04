import { forEach } from '@angular/router/src/utils/collection';
import { FreightMilestone, MilestonesNext, Milestone, EventTopic } from './freight-api.service';
import { Injectable } from '@angular/core';
import { ToastOptions } from '@ionic/core';
import { formatDate } from '@angular/common';

export enum EventCode {
    ADD = 0,
    IRP = 1,
    DEP = 2,
    ARV = 3,
    CLR = 4,
    DCA = 5,
    DCF = 6
}

@Injectable({
    providedIn: 'root'
})
export class GlobalService { 
    
    public isDevice: boolean;

    public readonly availableMilestoneImages: string[] = []; // Set in constructor.
    // public readonly availableMilestoneImages: string[] = [
    //     'ADD',
    //     'IRP',
    //     'DEP',
    //     'ARV',
    //     'CLR',
    //     'DCA',
    //     'DCF'
    // ];

    public isMilestoneImageAvailable(eventCode: string) {

        if (!eventCode) { 
            return false;
        }

        return this.availableMilestoneImages.indexOf(
            this.getMilestoneImageKey(eventCode)) >= 0;
    }

    public getMilestoneImageKey(eventCode: string) { // TODO: Review mapping of codes to images, and to displayed codes.
        
        return eventCode;
        
        // switch (eventCode) {
        //     case 'DEP':
        //         return 'ATD';
        //     case 'IRP':
        //         return 'PCK';
        //     case 'ARV':
        //         return 'POD';
        //     case 'DCF':
        //         return 'ATA';
        //     default:
        //         return eventCode;
        // }
    }

    public getMilestoneImageUrl(eventCode: string, isEventLate: boolean): string {
        if (!this.isMilestoneImageAvailable(eventCode)) {
            return null;
        }

        const imageKey = this.getMilestoneImageKey(eventCode);

        const suffix = isEventLate ? 'Orange' : '';

        return `assets/img/${imageKey}${suffix}.png`;
    }

    
    public getToastConfiguration(toastMessage: string, requireDismissal = false): ToastOptions {
        
        let toastConfig: ToastOptions;
        if (!requireDismissal) {
            toastConfig = {
                message: toastMessage,
                duration: 5000,
                position: 'bottom',
                showCloseButton: false
            };
        } else {
            toastConfig = {
                message: toastMessage,
                position: 'bottom',
                showCloseButton: true
            };
        }

        return <ToastOptions> toastConfig;                
    }

    // From: https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    public toProperCase(str: string) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    public formatNullableDate(theDate: any, placeholder: string): string {
        if (!this.isValidDate(theDate)) {
            return placeholder;
        } else {
            return formatDate(theDate, 'yyyy-MM-dd', 'en-US');
        }
    }

    // Based on: https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
    public isValidDate(d: any) {
        if (!d) { return false; }
        return d instanceof Date && !isNaN(d.getTime()) && d.getFullYear() > 1000;
    }

    /*
    * Enables list string to broken across multiple lines according to css wordwrap properties.
    */
    public ensureCommasSeperatedListIsSpaced(text: string) {
        const spaced = text.split(new RegExp(',(?=\\S)')).join(', ');
        // const spaced = text.replace(new RegExp(',(?=\\S)', 'g'), ', ');
        return spaced;
    }

    public compareCodes(code1: number, code2: number): number {
        // To assist in functions that sort objects by a property that maps to a numeric code (like enums).

        if (code1 === undefined && code2 === undefined) {
            return 0;
        } else if (code1 === undefined) {
            // Move code1 object to end:
            return 1;
        } else if (code2 === undefined) {
            // Move code2 object to end:
            return -1;
        } else {
            return code1 - code2;
        }
    }

    constructor() {

        const enumLength = Object.keys(EventCode).length / 2;

        for (let keyindex = 0; keyindex < enumLength; keyindex++) {
            const eventCodeAsString = EventCode[keyindex];   
            this.availableMilestoneImages.push(eventCodeAsString);     
        }
    }
}

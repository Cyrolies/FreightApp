import { Injectable } from '@angular/core';
import { ToastOptions } from '@ionic/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {  
    
    public isDevice: boolean;

    public readonly availableMilestoneImages: string[] = [
        'ADD',
        'ATA',
        'ATD',
        'CLR',
        'DCA',
        'PCK',
        'POD'
    ];

    public isMilestoneImageAvailable(eventCode: string) {

        if (!eventCode) { 
            return false;
        }

        return this.availableMilestoneImages.indexOf(
            this.getMilestoneImageKey(eventCode)) >= 0;
    }

    public getMilestoneImageKey(eventCode: string) { // TODO: Review mapping of codes to images, and to displayed codes.
        
        switch (eventCode) {
            case 'DEP':
                return 'ATD';
            case 'IRP':
                return 'PCK';
            case 'ARV':
                return 'POD';
            case 'DCF':
                return 'ATA';
            default:
                return eventCode;
        }
    }

    public getMilestoneImageUrl(eventCode: string, isEventLate: boolean): string {
        if (!this.isMilestoneImageAvailable(eventCode)) {
            return null;
        }

        const imageKey = this.getMilestoneImageKey(eventCode);

        const suffix = isEventLate ? 'Orange' : '';

        return `assets/img/${imageKey}${suffix}.png`;
    }

    public getToastConfiguration(toastMessage: string): ToastOptions {
        
        const toastConfig = {
            message: toastMessage,
            duration: 5000,
            position: 'bottom',
            showCloseButton: false
        };

        return <ToastOptions> toastConfig;                
    }


            
    constructor() {
    }
}

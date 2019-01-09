import { forEach } from '@angular/router/src/utils/collection';
import { FreightMilestone, MilestonesNext } from './freight-api.service';
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

        return this.availableMilestoneImages.indexOf(eventCode) >= 0;
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

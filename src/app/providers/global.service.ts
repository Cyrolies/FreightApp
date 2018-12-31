import { Injectable } from '@angular/core';
import { ToastOptions } from '@ionic/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {  
    
    public isDevice: boolean;

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

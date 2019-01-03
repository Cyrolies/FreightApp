// This service is based on code provided at:
//  https://forum.ionicframework.com/t/ionic-3-network-connectivity-check-how-to-implement-for-all-pages-components/122677/22

// This service will only provide meaningful information when Cordova is loaded i.e. on a device, not in a browser.

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

import { Network } from '@ionic-native/network/ngx';

export enum ConnectionStatus {
    Online,
    Offline
}

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class NetworkService {

    private _status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(null);

    constructor(
        private network: Network
    ) {  }

    public initializeNetworkEvents(): void {

        // For devices.

        /* OFFLINE */
        this.network.onDisconnect().subscribe(() => {
            if (this._status.value === ConnectionStatus.Online) {
                this.setStatus(ConnectionStatus.Offline);
            }
        });

        /* ONLINE */
        this.network.onConnect().subscribe(() => {
            if (this._status.value === ConnectionStatus.Offline) {
                this.setStatus(ConnectionStatus.Online);
            }
        });
    }

    public getNetworkType(): string {
        return this.network.type;
    }

    public isOnline() {
        return this.network.type !== 'none';
    }

    public getNetworkStatus(): Observable<ConnectionStatus> {
        return this._status.asObservable();
    }

    private setStatus(status: ConnectionStatus) {

        console.log(`Network status changed to: ${status.toString()}.`);

        this._status.next(status);
    }
}

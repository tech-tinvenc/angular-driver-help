import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { CrisisRequestService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'viewrequests.component.html' })
export class ViewRequestsComponent implements OnInit {
    currentUser: User;
    latitude: String;
    longitude: String;
    crisisInfos = [];

    constructor(
        private authenticationService: AuthenticationService,
        private crisisRequestService: CrisisRequestService,
    ) {


    }

    ngOnInit() {
        this.loadAllRequests();
    }

    deleteUser(id: number) {
        this.crisisRequestService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllRequests());
    }

    private loadAllRequests() {
        this.crisisRequestService.getAll()
            .pipe(first())
            .subscribe(crisissInfos => this.crisisInfos = crisissInfos.crisisRequests);
    }
}

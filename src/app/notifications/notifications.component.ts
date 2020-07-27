import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { NotificationInfoService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'notifications.component.html' })
export class NotificationsComponent implements OnInit {
    currentUser: User;
    latitude: String;
    longitude: String;
    notifications = [];

    constructor(
        private authenticationService: AuthenticationService,
        private notificationService: NotificationInfoService,
    ) {

    }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue
        this.loadAllRequests(this.currentUser.username);
    }



    private loadAllRequests(id: String) {
        this.notificationService.getAll(id)
            .pipe(first())
            .subscribe(notifications => this.notifications = notifications.notifications);
    }
}

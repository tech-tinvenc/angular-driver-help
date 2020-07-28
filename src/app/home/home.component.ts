import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { timer, of, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { User,CrisisRequest } from '@/_models';
import { AlertService, UserService, AuthenticationService, LocationService, CrisisRequestService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    crisisPostForm: FormGroup;
    crisisRequest: CrisisRequest;
    loading = false;
    submitted = false;
    latitude: String;
    longitude: String;
    pretext: String;
    pretextEnabled: boolean;
    users = [];
    urgencyLevels = [
    {level: "Very Urgent", pretext: "Expect help within 30 minutes"},
    {level: "Urgent", pretext: "Expect help within one hour"},
    {level: "Medium", pretext: "Expect help within to 3 hours"},
    {level: "Low", pretext: "Expect help within 6 hours"}
    ]
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private locationService: LocationService,
        private crisisRequestService: CrisisRequestService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.getLocation();


    }

    ngOnInit() {
        this.crisisPostForm = this.formBuilder.group({
            request: ['', Validators.required],
            urgency: ['', Validators.required]
        });
        this.currentUser = this.authenticationService.currentUserValue;
        this.getLocation();
        this.pretextEnabled = false;
        this.pretext = "this is the text";
    }

    get f() { return this.crisisPostForm.controls; }

    getLocation(){
      this.locationService.populateLatLong().then(pos=>
      {
       this.latitude = pos.lng;
       this.longitude = pos.lat;
      });
    }

    onSubmit() {
    console.log("submit reached")
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.crisisPostForm.invalid) {
            return;
        }

        this.loading = true;
        this.crisisRequest = new CrisisRequest();
        this.crisisRequest.userId = this.currentUser.id+"";
        this.crisisRequest.deviceId= this.currentUser.token;
        this.crisisRequest.message = this.crisisPostForm.value.request;
        this.crisisRequest.messageType = "Request";
        this.crisisRequest.urgency = this.crisisPostForm.value.urgency;
        this.crisisRequest.userName = this.currentUser.firstName+" "+this.currentUser.lastName;

        this.crisisRequestService.save(this.crisisRequest)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Request Posted to group.', true);
                    this.router.navigate(['/']);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    // Kill subject to stop all requests for component
    private killTrigger: Subject<void> = new Subject();
    private publishLocation$: Observable<any> = this.locationService.getPosition(this.currentUser);

    private refreshInterval$: Observable<any> = timer(0, 1000)
    .pipe(
      // This kills the request if the user closes the component
      takeUntil(this.killTrigger),
      // switchMap cancels the last request, if no response have been received since last tick
      switchMap(() => this.publishLocation$),
      // catchError handles http throws
      catchError(error => of('Error'))
    );
    public statustext$: Observable<any> = this.refreshInterval$;

    ngOnDestroy(){
      this.killTrigger.next();
    }

}

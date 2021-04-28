import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';
//import {ConfirmedValidator} from '@app/_services/confirmed.validator';
import { MustMatch } from '@app/_services/must-match.validator';
//import { HttpClient } from '@angular/common/http';
import {  ViewChild, ElementRef } from '@angular/core';
//import * as _ from 'lodash';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

//for image uploading
//@ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  
//   fileInputLabel: string;
//   imageData: string;


 

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
       
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['',Validators.required],
        }, {
            validator: MustMatch('password', 'confirmPassword')
        }
        
        );

        // ({
        //    uploadedImage: ['']
        //   }
          
        //   );
        
    }

    //file select event

    // 
    
    

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {

       
    

        this.submitted = true;

        
        this.alertService.clear();

       
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
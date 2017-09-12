import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { Home } from './home';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private http: Http,private appService: AppService,private router: Router) {}
    
    public question:any;
    public data:Home[];
    public selectedTest:Home;
    test:any={body:{}};
    result:any;
    // status='Attend';
    
    statusClick(data:any){
        if(data.test_status == null){
            this.appService.selectedTest.body.test_id = data.test_id;
            this.appService.selectedTest.body.total_questions = data.total_questions;
            this.appService.selectedTest.body.question_bank_id = data.question_bank_id;
            this.appService.selectedTest.body.user_id = 3;
            this.appService.resumeFlag = false;
            this.router.navigate(['/Test']);
        }
        else if(data.test_status == "Pending"){
            this.appService.ResumeTest.body.question_bank_id = data.question_bank_id;
            this.appService.ResumeTest.body.total_questions = data.total_questions;
            this.appService.ResumeTest.body.test_id = data.test_id;
            this.appService.ResumeTest.body.user_id = 3;
            console.log(this.appService.ResumeTest)
            this.appService.resumeFlag = true;
            this.router.navigate(['/Test']);
        }
    }

    getResult(data:any){
        this.test.body.question_bank_id = 101;
        this.test.body.test_session_id = 12393;
        this.appService.postSubmitTest(this.test).subscribe(res=>{
            this.result = res
            console.log(res)
        });
    }

    ngOnInit(){ 
        $('body').css('background-color','white');
        this.appService.postBody.body.user_id=3;
        this.appService.getTestData().subscribe(res=>{
            this.data = res
            console.log(res)
        });

    }

}
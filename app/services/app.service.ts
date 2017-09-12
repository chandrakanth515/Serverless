import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router'

@Injectable()
export class AppService {

    constructor(private http: Http, private router: Router) {}

    public  headers = new Headers();
    public resumeFlag:boolean = false;
    public data:any;
    public question:any;
    public selectedTest:any={
        body:{
            test_id:'',
            user_id:'',
            question_bank_id:'',
            total_questions:''
        }
    };
    public summary:any[]=[];

    public nextQuestion:any={
        "body": {
            "test_session_id": '',
            "question_bank_id":'',
            "question_id": '',
            "selected_option":'',
            "question_seq": '',
            "navigatorValue":'',
            "review_flag":''
        }
    }

    public postBody:any={
        "body":{}
    }
    
    public ResumeTest:any={
        "body":{
            
        }
    }

    getTestData(){
        this.headers.append('Content-Type', 'application/json');
        return this.http.post("https://h4otjkif0g.execute-api.us-east-1.amazonaws.com/prod/landing-page",this.postBody,this.headers)
            .map(res => res.json())
            .map(data => {
                return data;
            });
    }

    getFirstQuestion(){
        this.headers.append('Content-Type', 'application/json');
        return this.http.post('https://h4otjkif0g.execute-api.us-east-1.amazonaws.com/prod/start-test', this.selectedTest, this.headers)
            .map(res => res.json())
            .map(data => {
                return data;
            });
    }
  
 


    postFetchNextQuestion(){
        this.headers.append('Content-Type', 'application/json');
        return this.http.post('https://h4otjkif0g.execute-api.us-east-1.amazonaws.com/prod/fetch-next-question',this.nextQuestion, this.headers)
            .map(res => res.json())
            .map(data => {
                console.log(data)
                return data;
            });
    }

    postResumeTest(){
        this.headers.append('Content-Type', 'application/json');
        return this.http.post('https://h4otjkif0g.execute-api.us-east-1.amazonaws.com/prod/resume-test', this.ResumeTest, this.headers)
            .map(res => res.json())
            .map(question => {
                return question;
            });
    }

    postSummaryPage(){
        this.headers.append('Content-Type', 'application/json');
        return this.http.post(' https://h4otjkif0g.execute-api.us-east-1.amazonaws.com/prod/view-summary',this.postBody, this.headers)
            .map(res => res.json())
            .map(data => {
                return data;
            });
        
    }

    postSubmitTest(test:any){
        this.headers.append('Content-Type', 'application/json');
        return this.http.post('https://h4otjkif0g.execute-api.us-east-1.amazonaws.com/prod/submit-test', test, this.headers)
            .map(res => res.json())
            .map(data => {
                return data;
            });
    }

}
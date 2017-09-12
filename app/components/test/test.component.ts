import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { Question } from './question';

@Component({
    moduleId: module.id,
    selector: 'test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit{

@ViewChild('testForm') testForm

public question:any;
public selected_option:string[]=[];
public counter:number;
public total_questions:number;
public progress:number=0;
public navigatorValue:number;
public review:boolean = false;
option_A:boolean = false;
option_B:boolean = false;
option_C:boolean = false;
option_D:boolean = false;

constructor(private http: Http,private appService: AppService,private router: Router){}
    
    selectedOption(element: HTMLInputElement){
        if(element.checked){
            this.selected_option.push(element.value);
            this.selected_option.sort();
        }else{
            this.selected_option.splice(this.selected_option.indexOf(element.value),1)
            this.selected_option.sort();
        }
    }

    selectReview(element:HTMLInputElement){
        if(element.checked){
            this.appService.nextQuestion.body.review_flag = "true"
        }
    }

    onNext(){
        $(".prevBtn").show();
        this.progress= this.progress + 20;
        this.option_A = false;
        this.option_B = false;
        this.option_C = false;
        this.option_D = false;
        this.review = false;
        if(this.question.question_sequence < this.total_questions){
            this.appService.nextQuestion.body.selected_option= this.selected_option.toString();
            
            this.appService.nextQuestion.body.test_session_id= this.question.test_session_id;
            this.appService.nextQuestion.body.question_bank_id= this.question.question_bank_id;
            this.appService.nextQuestion.body.question_seq= this.question.question_sequence;
            this.appService.nextQuestion.body.question_id= this.question.question_id;
            this.appService.nextQuestion.body.navigatorValue = 1;
            this.selected_option = [];
            console.log(this.appService.nextQuestion)
            this.appService.postFetchNextQuestion().subscribe(res=>{
                console.log(res.response_question[0]);
                this.question= res.response_question[0];
                if(this.question.selected_option != null){
                    this.selected_option = this.question.selected_option.split(',');
                        console.log(this.selected_option)
                        for(var i=0;i<this.selected_option.length;i++){
                            if(this.selected_option[i]=="option_A"){
                                this.option_A = true;
                            }
                            if(this.selected_option[i]=="option_B"){
                                this.option_B = true;
                            }
                            if(this.selected_option[i]=="option_C"){
                                this.option_C = true;
                            }
                            if(this.selected_option[i]=="option_D"){
                                this.option_D = true;
                            }
                        }
                }
            });
        }
        else if(this.question.question_sequence == this.total_questions){
            this.appService.nextQuestion.body.selected_option= this.selected_option.toString();
            this.appService.nextQuestion.body.test_session_id= this.question.test_session_id;
            this.appService.nextQuestion.body.question_bank_id= this.question.question_bank_id;
            this.appService.nextQuestion.body.question_seq= this.question.question_sequence;
            this.appService.nextQuestion.body.question_id= this.question.question_id;
            this.appService.nextQuestion.body.navigatorValue = 1;
            this.selected_option = [];
            console.log(this.appService.nextQuestion)
            this.appService.postFetchNextQuestion().subscribe(res=>{
                console.log(res);
                this.appService.summary= res;
                this.router.navigate(['/Summary']);
            });
        }
    }

    onPrevious(){
        this.progress= this.progress - 20;
        this.option_A = false;
        this.option_B = false;
        this.option_C = false;
        this.option_D = false;
        this.review = false;
        if(this.question.question_sequence>1){
            this.appService.nextQuestion.body.selected_option= this.selected_option.toString();
            this.appService.nextQuestion.body.test_session_id= this.question.test_session_id;
            this.appService.nextQuestion.body.question_bank_id= this.question.question_bank_id;
            this.appService.nextQuestion.body.question_seq= this.question.question_sequence;
            this.appService.nextQuestion.body.question_id= this.question.question_id;
            this.appService.nextQuestion.body.navigatorValue = -1;
            this.selected_option = [];
            this.appService.postFetchNextQuestion().subscribe(res=>{
                console.log(res.response_question[0]);
                this.question= res.response_question[0];
                this.selected_option = this.question.selected_option.split(',');
                console.log(this.selected_option)
                for(var i=0;i<this.selected_option.length;i++){
                    if(this.selected_option[i]=="option_A"){
                        this.option_A = true;
                    }
                    if(this.selected_option[i]=="option_B"){
                        this.option_B = true;
                    }
                    if(this.selected_option[i]=="option_C"){
                        this.option_C = true;
                    }
                    if(this.selected_option[i]=="option_D"){
                        this.option_D = true;
                    }
                }
            });
        }else if(this.question.question_sequence==1){
            $(".prevBtn").hide();
        }
    }
    
    ngOnInit(){
        $('body').css('background-color','black');
        if(!this.appService.resumeFlag){
            $(".prevBtn").hide();
            this.appService.getFirstQuestion().subscribe(res=>{
                console.log(res)
                this.question= res[0];
                this.total_questions = this.appService.selectedTest.body.total_questions;
                this.progress = (this.question.question_sequence-1)*20;
            });
        }else{
            this.appService.postResumeTest().subscribe(res=>{
                this.question= res[0];
                console.log(this.question)
                this.total_questions = this.appService.ResumeTest.body.total_questions;
                console.log(res)
                if(this.question.question_sequence == 1){
                    $(".prevBtn").hide();
                }
                this.progress = (this.question.question_sequence-1)*20;
            });
        }
    }
}


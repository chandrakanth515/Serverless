import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

@Component({
    moduleId:module.id,
    selector:'Summary',
    templateUrl:'summary.component.html',
    styleUrls:['summary.component.css']
})

export class SummaryComponent{
   
    constructor(private http: Http,private appService: AppService,private router: Router){}
    public selected_option:any[]=[];
    public question:any;
    public questions:any[]=[];
    public test:any={
        body:{}
    };
    public result:any={
        final_score:''
    };
    
    selectedOption(element: HTMLInputElement){
        if(element.checked){
            this.selected_option.push(element.value);
            this.selected_option.sort();
            console.log(this.selected_option)
        }else{
            this.selected_option.splice(this.selected_option.indexOf(element.value),1)
            this.selected_option.sort();
            console.log(this.selected_option)
        }
    }

    onSubmitTest(){
        this.test.body.question_bank_id = this.appService.summary[0].question_bank_id;
        this.test.body.test_session_id = this.appService.summary[0].test_session_id;
        this.appService.postSubmitTest(this.test).subscribe(res=>{
            console.log(res)
            this.result = res;
        });
        $(".ept").empty();
        $("#resultModal").modal("show");
    }

    ngOnInit(){
        $('body').css('background-color','black')
        this.appService.postBody.body.test_session_id=12341;
        this.appService.postSummaryPage().subscribe(res=>{
            this.questions = res;
            console.log(this.questions)
            // this.questions = this.appService.summary;
            for(var i=0;i<this.questions.length;i++){
                this.questions[i].selected_option = this.questions[i].selected_option.split(",option_").join().substring(7,12);
                console.log(this.questions[i].selected_option)
            }
        $(".fa").parent().css({"background-color":"red"});
            
        });
        $(".fa").parent().css({"background-color":"red!important"});
        
    }


}
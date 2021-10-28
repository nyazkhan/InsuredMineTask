import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { LoginService } from 'src/app/core/service/login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // @Input() mentionPromptTemplate!: TemplateRef<any>
  // @Input()
  // showMentionPrompt!: any;
  // showMessageTemplate:any
   mentionConfig:any  = {
    items: Array,
    triggerChar: String,
   
}
loadHtml = false
   constructor(private loginService : LoginService) {  
    this.loginService.getJSON().subscribe(data => {
      this.mentionConfig.items = data.map((e: any) => e.username);
      console.log(this.mentionConfig.items);
      
      this.mentionConfig.triggerChar = '@';
      this.loadHtml = true;
    });
   }

  ngOnInit() {
  }
  onClickThisClick(ev:any){

  }
}

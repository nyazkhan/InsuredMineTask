import { Component, OnInit } from '@angular/core';
// import * as abcJS from '/autocomplete.js';
declare const initiate: any;

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  module:any
  constructor() {

    (function () {
      const allScripts = Array.from(document.getElementsByTagName('script'));
      let autocomplete: boolean = true;
      for (let i = 0; i < allScripts.length; i++) {
        if (allScripts[i].src.includes('js/autocomplete')) {
          autocomplete = false;
          break;
        }
      }
      // if (autocomplete) {
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = 'assets/js/autocomplete.js';

        var entry = document.getElementsByTagName('script')[0];
        entry.parentNode? entry.parentNode.insertBefore(script, entry):'';
      // console.log(initiate);
        
      // }

    })();
   }

  ngOnInit(): void {
  }

}

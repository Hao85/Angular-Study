import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'title-case',
  templateUrl: './title-case.component.html',
  styleUrls: ['./title-case.component.css']
})
export class TitleCaseComponent implements OnInit {
  inputText: any;
  outputText: string;
  rules: string[] = ["of", "the"];

  onKeyUp(value: string) {
    // convert string to array with all lower-case
    const str = value.toLowerCase();
    const words = str.split(" ");
    // map: rules
    const newWords = words.map((word, idx) => 
       (this.rules.includes(word) && idx > 0) ? 
          word : word.substring(0, 1).toUpperCase() + word.substring(1, word.length).toLowerCase()
    );
    // convert array to string to display
    this.outputText = newWords.join(" ");
  }

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'title-case',
  templateUrl: './title-case.component.html',
  styleUrls: ['./title-case.component.css']
})
export class TitleCaseComponent implements OnInit {
  // solution two: two-way biding and pipe
  title: string;
  // *******
  // below is solution one, 
  // if deleted, 
  // not facted the sulotion two
  // *******
  // solution one
  inputText: any;
  outputText: string;

  onKeyUp(value: string) {
    // validation
    if (!value) return this.outputText = null;
    // prepositions
    const prepositions= [
      "the", 
      "of"
    ];
    // convert string to array with all lower-case
    const str = value.toLowerCase();
    const words = str.split(" ");
    // map: rules
    const newWords = words.map((word, idx) => 
       (prepositions.includes(word) && idx > 0) ? 
          word : word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
    );
    // convert array to string to display
    this.outputText = newWords.join(" ");
  }

  constructor() { }

  ngOnInit() {
  }

}

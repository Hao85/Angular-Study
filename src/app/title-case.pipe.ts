import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string): any {
    // validation
    if (!value)
      return null;
    // convert string to array with all lower-case
    const str = value.toLocaleLowerCase();
    const words = str.split(" ");
    // map: rules
    const newWords = words.map((word, idx) => 
      (this.isPreposition(word) && idx > 0) ? word : this.toTitleCase(word));
    // convert array to string to display
    return newWords.join(" ");
  }

  private toTitleCase(word: string): string {
    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
  }

  private isPreposition(word: string): boolean {
    // prepositions
    const prepositions= [
      "the", 
      "of"
    ];

    return prepositions.includes(word);
  }

}

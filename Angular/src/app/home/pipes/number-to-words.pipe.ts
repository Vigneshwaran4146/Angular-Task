import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {

  private ones: string[] = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
  ];

  private teens: string[] = [
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];

  private tens: string[] = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];

  private thousands: string[] = [
    '', 'thousand', 'million', 'billion', 'trillion'
  ];

  transform(value: number): string {
    if (value === 0) return 'zero';
    return this.convertNumberToWords(value);
  }

  private convertNumberToWords(value: number): string {
    let words: string[] = [];
    let numStr = value !== null && value !== undefined ? value.toString() : ''; 
    let numLength = numStr.length;
    let groupCount = Math.ceil(numLength / 3); 

    for (let i = 0; i < groupCount; i++) {
      let groupValue = parseInt(numStr.substring(numLength - 3 * (i + 1), numLength - 3 * i) || '0', 10); 
      if (groupValue) {
        let groupWords = this.convertGroupToWords(groupValue); 
        if (this.thousands[i]) {
          groupWords += ` ${this.thousands[i]}`;
        }
        words.unshift(groupWords);
      }
    }

    return words.join(' ').trim();
  }

  private convertGroupToWords(value: number): string {
    let words: string[] = [];

    if (value >= 100) {
      words.push(this.ones[Math.floor(value / 100)]);
      words.push('hundred');
      value %= 100;
    }

    if (value >= 20) {
      words.push(this.tens[Math.floor(value / 10)]);
      value %= 10;
    }

    if (value >= 10) {
      words.push(this.teens[value - 10]);
    } else if (value > 0) {
      words.push(this.ones[value]);
    }

    return words.join(' ');
  }
}

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
    '', 'thousand', 'lakh', 'crore'
  ];

  /**
   * Transforms a number into words representation followed by "rupees".
   * @param value - The number to transform.
   * @returns The words representation of the number with "rupees".
   */
  transform(value: number): string {
    if (value === 0) return 'zero rupees';
    return `(${this.convertNumberToWords(value) + ' rupees'})`;
  }

  /**
   * Converts a number into its words representation.
   * @param value - The number to convert.
   * @returns The words representation of the number.
   */
  private convertNumberToWords(value: number): string {
    let words: string[] = [];
    let numStr: string = value.toString();
    let length: number = numStr.length;

    if (length > 7) {
      let crore: number = Math.floor(value / 10000000);
      value -= crore * 10000000;
      if (crore > 0) {
        words.push(this.convertGroupToWords(crore));
        words.push('crore');
      }
    }

    if (length > 5) {
      let lakh: number = Math.floor(value / 100000);
      value -= lakh * 100000;
      if (lakh > 0) {
        words.push(this.convertGroupToWords(lakh));
        words.push('lakh');
      }
    }

    if (length > 3) {
      let thousand: number = Math.floor(value / 1000);
      value -= thousand * 1000;
      if (thousand > 0) {
        words.push(this.convertGroupToWords(thousand));
        words.push('thousand');
      }
    }

    if (length > 2) {
      let hundred: number = Math.floor(value / 100);
      value -= hundred * 100;
      if (hundred > 0) {
        words.push(this.ones[hundred]);
        words.push('hundred');
      }
    }

    if (value > 0) {
      if (words.length > 0) {
        words.push('and');
      }
      if (value < 10) {
        words.push(this.ones[value]);
      } else if (value < 20) {
        words.push(this.teens[value - 10]);
      } else {
        words.push(this.tens[Math.floor(value / 10)]);
        if (value % 10 > 0) {
          words.push(this.ones[value % 10]);
        }
      }
    }

    return words.join(' ').trim();
  }

  /**
   * Converts a group of three digits into its words representation.
   * @param value - The group value to convert.
   * @returns The words representation of the group.
   */
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

    if (value >= 10 && value < 20) {
      words.push(this.teens[value - 10]);
    } else if (value > 0) {
      words.push(this.ones[value]);
    }

    return words.join(' ');
  }
}

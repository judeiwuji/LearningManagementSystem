import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'letterLabel' })
export class LetterLabel implements PipeTransform {
  transform(value: number): string {
    return String.fromCharCode(value + 65);
  }
}

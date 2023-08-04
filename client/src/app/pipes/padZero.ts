import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'padZero' })
export class PadZero implements PipeTransform {
  transform(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}

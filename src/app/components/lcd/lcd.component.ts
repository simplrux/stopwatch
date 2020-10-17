import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lcd',
  templateUrl: './lcd.component.html',
  styleUrls: ['./lcd.component.scss']
})
export class LcdComponent implements OnInit {

  _number: number = 0;

  /*number to display
  default 0*/
  @Input() set number(v) {
    this._number = v;
    this.showNumber();
  }

  @Input() backgroundColor = '#000';


  @Input() width = '20px';


  @Input() height = '40px';


  @Input() activeColor = 'rgb(243, 0, 0)';

  @Input() disabledColor = 'rgb(60, 0, 0)';

  @Input() maxNumberLength: number | null = null;

  @Input() minNumberLength: number | null = null;

  reg1 = /[1,4]/;
  reg2 = /[1-3,7]/;
  reg3 = /[5,6]/;
  reg4 = /[0,1,7]/;
  reg5 = /[1,3-5,7,9]/;
  reg6 = /[2]/;
  reg7 = /[1,4,7]/;

  displayValue: string;

  constructor() { }

  showNumber() {

    this.displayValue = this._number.toString();

    if ((this.minNumberLength > this.maxNumberLength) && this.maxNumberLength !== null) {
      throw new Error('min number can\'t be higher than max');
    }

    if (this.minNumberLength && this.displayValue.length < this.minNumberLength) {

      const count = this.minNumberLength - this.displayValue.length;

      for (let i = 0; i < count; i++) {
        this.displayValue = `0${this.displayValue}`;
      }

    }

    if (this.maxNumberLength && this.displayValue.length > this.maxNumberLength) {

      let output = '';

      for (let i = 0; i < this.maxNumberLength; i++) {
        output += '9';
      }

      this.displayValue = output;

    }

  }

  ngOnInit() {

    this.showNumber();

  }


}

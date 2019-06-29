import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  public userInfo: FormGroup;

  public gender = ['female', 'male'];

  constructor() { }

  ngOnInit() {
    this.userInfo = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(5)]),
      age: new FormControl('', [Validators.required, Validators.max(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required)
    });

    this.userInfo.controls['gender'].valueChanges.subscribe((value) => {
      let nameRemoveControl ='';
      let nameAddControl ='';


      this.userInfo.controls['age'].clearValidators();

      if (value === 'male') {
        this.userInfo.controls['age'].setValidators([Validators.required, Validators.max(40)]);

        nameRemoveControl ='pet';
        nameAddControl ='proffesion';
      }
      else if (value === 'female') {
        this.userInfo.controls['age'].setValidators([Validators.required, Validators.max(30)]);

        nameRemoveControl ='proffesion';
        nameAddControl ='pet';
      }

      this.userInfo.controls['age'].updateValueAndValidity();

      
      if (this.userInfo.controls[nameRemoveControl] !== undefined &&
      this.userInfo.controls[nameRemoveControl] !== null) {
        this.userInfo.removeControl(nameRemoveControl);
      }

      this.userInfo.addControl(nameAddControl, new FormControl('', Validators.required));
    });
  }

  public onClickSubmit(value: UserInfo): void {
    debugger;
  }
}

export class UserInfo {
  public name: string;
  public age: string;
  public email: string;
  public gender: string;

  public pet: string; 
  public proffesion: string;
}

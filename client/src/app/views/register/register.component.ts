import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rForm: FormGroup;
  post: any;
  description: string = '';
  name: string = '';
  nameAlert: string = 'This field is required';

  constructor(private fb: FormBuilder) {

    this.rForm = fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'validate': ''
    });

  }

  ngOnInit() {
    // We will subscribe to event of changing checkbox value
    // after that we get name input ang change his Validators rules
    this.rForm.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == 1) {
          this.rForm.get('name').setValidators([ Validators.required, Validators.minLength(3) ]);
          this.nameAlert = 'You need to specify at least 3 charactetrs';
        }
        else {
          this.rForm.get('name').setValidators([ Validators.required ]);
          this.nameAlert = 'This field is required';
        }
        this.rForm.get('name').updateValueAndValidity();
      }
    );
  }

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }

}

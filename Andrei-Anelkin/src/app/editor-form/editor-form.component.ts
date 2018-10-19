import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NameValidator} from '../validators/user-name.directive';
import {AgeValidator} from '../validators/age.directive';
import {DateValidator} from '../validators/date.directive';
import {User} from '../models/User';
import {UserService} from '../user.service';

@Component({
  selector: 'app-editor-form',
  templateUrl: './editor-form.component.html',
  styleUrls: ['./editor-form.component.scss']
})
export class EditorFormComponent implements OnInit {
  user = {'name': 'Desout',
    'age': '18',
    'dateOfBirth': '2018/11/11',
    'dateOfFirstLogin': '2018/11/11',
    'dateNextNotification': '2018/11/11',
    'information': 'infoinfo'};
  userForm: FormGroup;
  submitted = false;
  constructor(private userNameValidator: NameValidator,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'name': new FormControl(this.user.name, {
        validators: [Validators.required, Validators.minLength(4)],
        asyncValidators: [this.userNameValidator.validate.bind(this)],
        updateOn: 'blur'
      }),
      'age': new FormControl(this.user.age, [Validators.required, AgeValidator]),
      'dateOfBirth': new FormControl(this.user.dateOfBirth, [Validators.required, DateValidator]),
      'dateOfFirstLogin': new FormControl(this.user.dateOfFirstLogin, [Validators.required, DateValidator]),
      'dateNextNotification': new FormControl(this.user.dateNextNotification, [Validators.required, DateValidator]),
      'information': new FormControl(this.user.information, [Validators.required, Validators.minLength(4)])

  });
  }
  onSubmit() {
    this.submitted = true;
    const exportUser: User = this.getUserFromForm();
    this.userService.addUser(exportUser).subscribe();
  }
  getUserFromForm(): User {
    return new User(this.name.value,
      'empty',
      this.dateOfBirth.value,
      this.dateOfFirstLogin.value,
      this.dateNextNotification.value,
      this.information.value);
  }
  get name() { return this.userForm.get('name'); }
  get age() { return this.userForm.get('age'); }
  get dateOfBirth() { return this.userForm.get('dateOfBirth'); }
  get dateOfFirstLogin() { return this.userForm.get('dateOfFirstLogin'); }
  get dateNextNotification() { return this.userForm.get('dateNextNotification'); }
  get information() { return this.userForm.get('information'); }
}


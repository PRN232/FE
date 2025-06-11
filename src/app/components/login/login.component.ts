import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, NzButtonModule, NzInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  username = '';
  password = '';

  submitLogin(): void {
    if (this.username && this.password) {
      this.loginSuccess.emit();
    } else {
      console.log('Please fill in both fields');
    }
  }
}

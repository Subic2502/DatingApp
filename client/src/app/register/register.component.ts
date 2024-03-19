import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  model: any = {}
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService:AccountService){}
  ngOnInit(): void {
  }

  register(){
    console.log("Debug: ")
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => console.log(error)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}

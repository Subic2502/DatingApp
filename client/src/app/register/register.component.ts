import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Register } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  username!: string;
  password! :string;
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private accountService:AccountService,
    private toastr:ToastrService){}

  ngOnInit(): void {
  }

  register(){
    console.log("Debug: ")
    console.log(this.username);
    console.log(this.password);
    this.accountService.register({username : this.username, password : this.password} as Register).subscribe(()=>{
        this.cancel();
    },error =>{
      this.toastr.error(error.error);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}

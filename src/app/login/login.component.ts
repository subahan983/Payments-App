import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BackendConnService } from '../backend-conn.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title='Login';
  constructor(private bes : BackendConnService, private router:Router) { }

  ngOnInit(): void {}

  uname = "";
  upswd = "";
  onSubmit() {
    if(this.uname=="" || this.upswd=="")
      alert("Username or Password cannot be blank");
    else if(this.bes.validateLogin(this.uname, this.upswd)!=null) {
        this.bes.validateLogin(this.uname,this.upswd).subscribe(data => {
        if(this.uname!=null && this.uname==data.uname && this.upswd==data.pswd) this.router.navigate(['/home']);
        else alert("Entered username and/or password is incorrect.");
      },
      (error) => {
        console.error('error caught in component')
      });
    }
    else 
      this.router.navigate(['']);
  }
  forgot() {
    alert("This action is temporarily disabled.");
  }

}
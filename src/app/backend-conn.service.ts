import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Customers } from './Models/customers';
import { map, Observable } from 'rxjs';
import { Banks } from './Models/banks';
import { Message } from './Models/message';
import { Transactions } from './Models/transactions';
import { Login } from './Models/login';

@Injectable({
  providedIn: 'root'
})
export class BackendConnService {

  constructor(private httpcli: HttpClient) { }

  private url:string = "http://localhost:8083/";

  validateLogin(uname:string, pswd:string):Observable<Login> {
    return this.httpcli.get<Login>(this.url+"loginapi/login/"+uname).pipe(map(response => response));
  }

  getCustDetails(cId:string):Observable<Customers> {
    return this.httpcli.get<Customers>(this.url+"customersapi/customers/"+cId).pipe(map(response => response));
  }

  updateCustomerBal(custo:Customers):Observable<Customers>{
    return this.httpcli.put<Customers>(this.url+"customersapi/customersupdate",custo).pipe(map(response => response));
  }

  getBankDetails(bic:string):Observable<Banks> {
    return this.httpcli.get<Banks>(this.url+"banksapi/banks/"+bic).pipe(map(response => response));
  }

  chkSanc(name:string):Observable<boolean> {
    return this.httpcli.get<boolean>(this.url+"sanctionsapi/sanc/"+name).pipe(map(response => response));
  }

  getMsgCodes():Observable<Message[]> {
    return this.httpcli.get<Message[]>(this.url+"messageapi/message").pipe(map(response => response));
  }

  TransactionsList:String[]=[];
  getTransacs(cid:string):Observable<Transactions[]> {
    return this.httpcli.get<Transactions[]>(this.url+"transactionsapi/transactions/"+cid).pipe(map(response => response));
  }
  submitTransaction(transaction:Transactions, TrnsStmt:string):Observable<Object[]> {
    this.TransactionsList.push(TrnsStmt);
    return this.httpcli.post<Object[]>(this.url+"transactionsapi/transactioned",transaction);
  }

}

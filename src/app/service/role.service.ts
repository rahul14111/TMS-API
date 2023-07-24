import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  role :string|null= "";
  secretKey = "This is Secret Key";
  userId : string|null ='';
  constructor() {}

  setRole(role:string) {
     //used encyptes text to store User-Role in localstorage
    const cipherRole = CryptoJS.AES.encrypt(role, this.secretKey).toString();
    localStorage.setItem('role', cipherRole);
    this.role = role;
  }
  getRole(): string | null {
    var encryptedRole:string |null = localStorage.getItem('role')
    if(encryptedRole!=null){
      const decryptedText = CryptoJS.AES.decrypt(encryptedRole, this.secretKey).toString(CryptoJS.enc.Utf8);
      return decryptedText;
    }
    return '';
  }

  setUserId(data:number){
    //used encyptes text to store UserId in localstorage
    const cipherUserId = CryptoJS.AES.encrypt(data.toString(), this.secretKey).toString();
    localStorage.setItem('userId', cipherUserId);
    this.userId = cipherUserId;
  }

  getUserId(): string | null {
    var encryptedUserId:string |null = localStorage.getItem('userId')
    if(encryptedUserId!=null){
      const decryptedUserId = CryptoJS.AES.decrypt(encryptedUserId, this.secretKey).toString(CryptoJS.enc.Utf8);
      return decryptedUserId;
    }
    return '';
  }

  clearRoleUserId(){
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
  }
}

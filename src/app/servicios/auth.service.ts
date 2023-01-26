import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../entidades/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authFirebase: AngularFireAuth
  ) { }

  login(correo: string, password: string){
    return this.authFirebase.signInWithEmailAndPassword(correo,password)
  }

  logout(){
    this.authFirebase.signOut()
  }

  registerUser(datos: User){
    return this.authFirebase.createUserWithEmailAndPassword(datos.email,datos.password)
  }

  stateUser(){
    return this.authFirebase.authState
  }

  async getUid(){
    const user = await this.authFirebase.currentUser
    if (user) {
      return user?.uid
    }else{
      return null
    }
  }
}

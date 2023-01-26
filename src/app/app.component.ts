import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from './entidades/Doctor';
import { User } from './entidades/User';
import { AuthService } from './servicios/auth.service';
import { FirestoreService } from './servicios/firestore.service';
import { InteractionService } from './servicios/interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  login: boolean = false

  rol: 'visitante' | 'admin' = 'admin'


  uid: any = null

  updateDoc: any

  info!: User


  constructor(
    private auth: AuthService,
    private interaction: InteractionService,
    private firestore: FirestoreService,
    private router: Router,
    private authService: AuthService
  ) {
    this.auth.stateUser().subscribe( res => {
      if(res){
        console.log('Esta Logeado');
        this.login = true
        this.getUser(res.uid)
      }else{
        console.log('No esta logeado');
        this.login = false
      }
    })
  }

  LoginApp() {

  }

  logout() {
    this.auth.logout()
    this.interaction.presentToast('Sesión finalizada')
    this.router.navigate(['/login'])
  }

  getUser(id: string){
    const path = 'Doctores'
    const uid = id
    this.firestore.getDoc<User>(path, id).subscribe( res =>{
      console.log(res);
      if(res){
        this. rol = res.perfil
      }
      
    })
  }

  async getUid() {
    const uid = await this.authService.getUid()
    if (uid) {
      this.uid = uid
      console.log('id: ', uid)
      localStorage.setItem('idDoc', uid)
      this.getInfoUser()
    } else {
      console.log('no existe id')
    }
  }

  getInfoUser() {
    const path = 'Doctores'
    const id = this.uid
    this.firestore.getDoc<User>(path, id).subscribe(res => {
      if (res) {
        this.info = res
      }

    })
  }
}

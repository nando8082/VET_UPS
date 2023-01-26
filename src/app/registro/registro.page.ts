import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entidades/User'
import { AuthService } from '../servicios/auth.service';
import { FirestoreService } from '../servicios/firestore.service';
import { InteractionService } from '../servicios/interaction.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  uid: any

  datos: User = {
    id: '',
    nombre: null,
    apellido: null,
    empresa: 'UPS',
    email: null,
    telefono: null,
    direccion: null,
    password: null,
    perfil: 'visitante'
  }
  constructor(
    private auth: AuthService,
    private interaction: InteractionService,
    private firestore: FirestoreService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async registrar(){
    this.interaction.presentLoading('Guardando...')
    console.log('datos ->', this.datos);
    const res = await this.auth.registerUser(this.datos).catch( error =>{
      this.interaction.closeLoading()
      this.interaction.presentToast('Error inesperado Intente nuevamente')
    })
    if (res){
      const path = 'Doctores'
      this.uid = res.user?.uid
      this.datos.id = this.uid
      this.datos.password = null
      await this.firestore.createDoc(this.datos,path,this.uid)
      this.interaction.closeLoading()
      this.interaction.presentToast('Usuario regitrado correctamente')
      this.router.navigate(['/login'])
    }
  }
}

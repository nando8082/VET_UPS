import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Doctor } from '../entidades/Doctor';
import { FirestoreService } from '../servicios/firestore.service';
import { InteractionService } from '../servicios/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  path: string = 'Doctores'
  resultado: Doctor[] = []

  constructor(
    private firestore: FirestoreService,
    private router: Router,
    private interaction: InteractionService
  ) { }

  ngOnInit() {
    this.getDoctores()
  }

  getDoctores() {
    this.firestore.getCollection<Doctor>(this.path).subscribe(res => {
      console.log('datos: ', res);
      this.resultado = res
    })
  }

  updateDoctor(doctor: Doctor) {
    //console.log(doctor.id);
    const id = doctor.id
    localStorage.setItem('idDoc', id)
    localStorage.setItem('empresa', doctor.empresa)
    localStorage.setItem('email', doctor.email)
    localStorage.setItem('password', doctor.password)
  }

  getDoctorId(doctor: Doctor){
    const id = doctor.id
    localStorage.setItem('idDoc', id)
  }

  deleteDoctor(doctor: Doctor) {
    this.interaction.presentLoading('Eliminando...')
    const id = doctor.id
    this.firestore.deleteDoc(this.path, id).then(res => {
      this.interaction.closeLoading()
    this.interaction.presentToast('Eliminado con éxito')
    })
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cita } from '../entidades/Cita';
import { Doctor } from '../entidades/Doctor';
import { FirestoreService } from '../servicios/firestore.service';

@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.page.html',
  styleUrls: ['./listar-citas.page.scss'],
})
export class ListarCitasPage implements OnInit {

  id: any
  resultado: Cita[] = []

  constructor(
    private firestore: FirestoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCitas()
  }

  getCitas() {
    this.id = localStorage.getItem('idDoc')
    localStorage.clear()
    const path = 'Doctores/' + this.id + '/Pacientes'
    console.log(path);
    this.firestore.getCollection<Cita>(path).subscribe(res => {
      console.log(res)
      this.resultado = res
    })
  }

}

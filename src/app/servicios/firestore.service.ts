import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  doctor = {
    nombre: '',
    apellido: '',
  }

  constructor(
    private firestore: AngularFirestore
  ) { }

  getId() {
    return this.firestore.createId()
  }

  createDoc(data : any, path: string, id: string) {
    const collection = this.firestore.collection('Doctores')
    return collection.doc(id).set(data)
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }

  updateDoc1(path: string, id: string, data: any){

  }


  getDoc<tipo>(path: string, id: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  }

}

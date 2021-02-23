import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  login(){
    /**nota: para navegar para outra página, sem empilhá-la, deve-se utilizar
     * o método setRoot no lugar do método push
     */
    this.navCtrl.setRoot('CategoriasPage');
  }

}

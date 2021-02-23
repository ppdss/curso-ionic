import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(   
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService : CategoriaService
    ) {
  }

  ionViewDidLoad() {
    /* 
    Em uma chamada Assincrona, é necessário se inscrever 
    para esperar a resposta, no angular utiliza-se o método subscribe()
    que pode ter uma função de callback ou erro.
    */
    this.categoriaService.findAll().subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';
import { ProdutosPage } from '../produtos/produtos';

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

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  itens: CategoriaDTO[];

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
     this.itens = response; 
    },
    error => {
      
    });
  }
  showProducts(categoria_id: string) {
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});
  }
}

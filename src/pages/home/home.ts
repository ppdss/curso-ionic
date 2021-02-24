import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public menuController: MenuController) {

  }
  // evento de lifecycle do ionic para quando a página for entrar executar uma ação
  ionViewWillEnter(){
    this.menuController.swipeEnable(false);
  }
  // evento de lifecycle do ionic para quando sair da página executar uma ação
  ionViewDidLeave(){
    this.menuController.swipeEnable(true);
  }
  
  login(){
    console.log(this.creds);
    
    /**nota: para navegar para outra página, sem empilhá-la, deve-se utilizar
     * o método setRoot no lugar do método push
     */
    this.navCtrl.setRoot('CategoriasPage');
  }

}

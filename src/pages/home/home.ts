import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    public navCtrl: NavController, 
    public menuController: MenuController,
    public auth: AuthService
    ) {

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
   
    
    this.auth.authenticate(this.creds)
    .subscribe(response =>{
      this.auth.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {}
    )
    
  }

}

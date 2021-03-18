import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        nome: ['Pedro',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['pp@gmail.com',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        tipo:['1', [Validators.required]],
        cpfOuCnpj:['71002178061', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha:['123', [Validators.required]],
        logradouro:['Rua 2', [Validators.required]],
        numero:['25', [Validators.required]],
        complemento:['Ap 203'],
        bairro:['Copacabana', [Validators.required]],
        cep:['31210650', [Validators.required]],
        telefone1:['91225564', [Validators.required]],
        telefone2:[],
        telefone3:[],
        estadoId:[null, [Validators.required]],
        cidadeId:[null, [Validators.required]]      
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signupUser(){
    console.log("Usuario Registrado");
    
  }
}

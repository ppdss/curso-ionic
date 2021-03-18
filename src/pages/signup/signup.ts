import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { EstadoService } from '../../services/domain/estado.service';

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

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtr: AlertController,

    ) {

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
        cep:['31210650', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        telefone1:['91225564', [Validators.required]],
        telefone2:[],
        telefone3:[],
        estadoId:[null, [Validators.required]],
        cidadeId:[null, [Validators.required]]      
      })

  }

  ionViewDidLoad() {
   this.estadoService.findAll()
   .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    }, 
    error => {});
  }
  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response =>{
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    })
  }
  signupUser(){
    this.clienteService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
    },
    error=>{}
    )
    
  }
  showInsertOk(){
    let alert = this.alertCtr.create({
      title:'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: ()=> {
            this.navCtrl.setRoot('HomePage');
          }
        }
      ]
    })
    alert.present();
  }

}

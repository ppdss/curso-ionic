import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";


// ESTA CLASSE FUNCIONA COMO UM FILTRO DAS REQUISIÇÕES
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {    

    constructor(
        public storage: StorageService,
        public alertCtrl: AlertController
    ){} 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req)
        .catch((error,caught) => {
            let errorObj = error;
            if(errorObj.error) {
                errorObj = errorObj.error;
            }
            if(!errorObj.status) { // status é um campo que obrigatóriamente vem se o objeto for JSON
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo filtro:");
            console.log(errorObj);

            switch(errorObj.status) {
                case 401:
                    this.handle401();
                    break;
                case 403: 
                    this.handle403();
                    break;
                case 404: 
                this.handle404();
                    break;
                default:
                    this.handlerDefaultError(errorObj);
            }

            return Observable.throw(error);
        }) as any;
    }
    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha de autenticação!',
            message: 'Email ou senha incorretos.',
            enableBackdropDismiss: false, // para sair do alert clicar no X, não fora do alert
            buttons: [
                
                {
                        text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handle403(){
        this.storage.setLocalUser(null);
        let alert = this.alertCtrl.create({
            title: 'Sessão finalizada',
            message: 'Sessão finalizada, por favor refaça login.',
            enableBackdropDismiss: false, // para sair do alert clicar no X, não fora do alert
            buttons: [
                
                {
                        text: 'Ok'
                }
            ]
        });
        alert.present();
        
    }

    handle404(){
        let alert = this.alertCtrl.create({
            title: '404 Not Found',
            message: 'Erro 404, recurso não encontrado! ',
            enableBackdropDismiss: false, // para sair do alert clicar no X, não fora do alert
            buttons: [
                
                {
                        text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handlerDefaultError(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro ' +errorObj.status + ': '+ errorObj.error ,
            message: errorObj.message,
            enableBackdropDismiss: false, // para sair do alert clicar no X, não fora do alert
            buttons: [
                
                {
                        text: 'Ok'
                }
            ]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi: true,
}
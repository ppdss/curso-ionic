import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "../services/storage.service";


// ESTA CLASSE FUNCIONA COMO UM FILTRO DAS REQUISIÇÕES
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();
        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl; // testando se a req é para a minha api porque se nao for nao pode auterar o header;
        if(localUser && requestToAPI) {
            // se existir o token no localStorage, inserir cabeçalho da req
            // clonando a requisição
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearear ' + localUser.token)}) 
            return next.handle(authReq);
        }

        return next.handle(req);
        
    }
}

export const AuthInterceptorProvider = {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi: true,
}
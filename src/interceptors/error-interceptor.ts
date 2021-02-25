import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


// ESTA CLASSE FUNCIONA COMO UM FILTRO DAS REQUISIÇÕES
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error,caught) => {
            let errorObj = error;
            if(errorObj.error) {
                errorObj - errorObj.error;
            }
            if(!errorObj.status) { // status é um campo que obrigatóriamente vem se o objeto for JSON
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo filtro:");
            console.log(errorObj);
            return Observable.throw(error);
        }) as any;
    }
}

export const ErrorInteceptorProvider = {
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi: true,
}
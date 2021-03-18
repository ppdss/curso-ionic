import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {

    }
    // chamada AJAX utilizando Observable com o verbo tipado
    findAll(estado_id: string): Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}
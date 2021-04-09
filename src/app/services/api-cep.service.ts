import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnderecoDto } from '../model/EnderecoDto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCepService {
  API_CEF = "https://viacep.com.br/ws/";

  constructor(private httpCliente: HttpClient) { }

  buscaCep(cep: string): Observable<EnderecoDto> {
    return this.httpCliente.get<EnderecoDto>(this.API_CEF + cep + '/json').pipe(
      map(obj => obj)
    );
  }
}
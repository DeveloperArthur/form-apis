import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CpfDto } from '../model/CpfDto';

@Injectable({
  providedIn: 'root'
})
export class ApiCpfService {
  API_CPF = "http://localhost:9000/api/";

  constructor(private httpCliente: HttpClient) { }

  validaCpf(cpf: string): Observable<CpfDto> {
    return this.httpCliente.get<CpfDto>(this.API_CPF + 'cpf/' + cpf).pipe(
      map(obj => obj)
    );
  }
}
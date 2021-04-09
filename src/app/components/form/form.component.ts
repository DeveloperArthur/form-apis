import { Component, OnInit } from '@angular/core';
import { CpfDto } from 'src/app/model/CpfDto';
import { EnderecoDto } from 'src/app/model/EnderecoDto';
import { Usuario } from 'src/app/model/Usuario';
import { ApiCepService } from 'src/app/services/api-cep.service';
import { ApiCpfService } from 'src/app/services/api-cpf.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  endereco: EnderecoDto = { bairro: '', localidade: '', logradouro: '' };
  usuario: Usuario = { nome: '', cep: '', cpf: '', endereco: this.endereco };
  cpfDto: CpfDto;

  constructor(private apiCpfService: ApiCpfService, private apiCepService: ApiCepService) { }

  ngOnInit(): void {
  }

  buscaCep() {
    this.apiCepService.buscaCep(this.usuario.cep).subscribe(endereco => {
      this.usuario.endereco = endereco;
    });
  }

  salva() {
    var camposOk = this.validaCampos();
    if (camposOk) {
      
      this.apiCpfService.validaCpf(this.usuario.cpf).subscribe(cpfDto => {
        this.cpfDto = cpfDto;
        var cpfValido = this.cpfDto.result;
        if (!cpfValido) alert('CPF inválido');
        else alert('Usuário cadastrado com sucesso!');
      });

    } else {
      alert('Preencha todos os campos!');
    }
  }

  validaCampos() {
    if (this.usuario.cep == '' || this.usuario.cpf == '' || this.usuario.nome == ''
      || this.usuario.endereco.bairro == '' || this.usuario.endereco.localidade == ''
      || this.usuario.endereco.logradouro == '') {
      return false;
    } else {
      return true;
    }
  }
}

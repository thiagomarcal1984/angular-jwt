import { TokenService } from './../../core/services/token.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  titulo: string = 'Olá '
  textoBotao: string = 'ATUALIZAR'

  perfilComponent: boolean = true

  token = ''
  nome = ''
  cadastro! : PessoaUsuaria
  form! : FormGroup<any> | null

  constructor(
    private tokenService: TokenService,
    private cadastroService: CadastroService,
    private formularioService: FormularioService,
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken()
    this.cadastroService.buscarCadastro(this.token).subscribe(
      cadastro => {
        this.cadastro = cadastro
        this.nome = this.cadastro.nome
        this.carregarFormulario()
      }
    )
  }

  carregarFormulario () {
    this.form = this.formularioService.getCadastro()
    this.form?.patchValue({
      nome: this.cadastro.nome,
      nascimento: this.cadastro.nascimento,
      cpf: this.cadastro.cpf,
      telefone: this.cadastro.telefone,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      genero: this.cadastro.genero,
      cidade: this.cadastro.cidade,
      estado: this.cadastro.estado,
    })
  }

  deslogar () {
    console.log('Log out realizado com sucesso.')
  }
  atualizar () {
    console.log('Cadastro atualizado com sucesso.')
  }
}

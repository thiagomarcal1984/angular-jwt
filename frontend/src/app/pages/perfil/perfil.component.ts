import { UserService } from './../../core/services/user.service';
import { Router } from '@angular/router';
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
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken()
    this.cadastroService.buscarCadastro().subscribe(
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
    this.userService.logout()
    this.router.navigate(['/login'])
  }

  atualizar () {
    const dadosAtualizados =  {
      nome: this.form?.value.nome,
      nascimento: this.form?.value.nascimento,
      cpf: this.form?.value.cpf,
      telefone: this.form?.value.telefone,
      email: this.form?.value.email,
      senha: this.form?.value.senha,
      genero: this.form?.value.genero,
      cidade: this.form?.value.cidade,
      estado: this.form?.value.estado,
    }

    this.cadastroService.editarCadastro(dadosAtualizados).subscribe({
      next: () => {
        alert('Cadastro editado com sucesso.')
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.error('Erro ao atualizar cadastro.', err)
      }
    })
  }
}

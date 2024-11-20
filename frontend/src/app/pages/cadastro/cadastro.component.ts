import { Router } from '@angular/router';
import { PessoaUsuaria } from 'src/app/core/types/type';
import { CadastroService } from './../../core/services/cadastro.service';
import { FormularioService } from './../../core/services/formulario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  perfilComponent = false
  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
    private router: Router,
  ) {}

  cadastrar() {
    const formCadastro = this.formularioService.getCadastro()
    if (formCadastro?.valid) {
      const novoCadastro = formCadastro.getRawValue() as PessoaUsuaria
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
          console.log('Cadastro realizado com sucesso.', value)
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.error('Erro ao realizar cadastro: ', err)
        }
      })
    }
  }
}

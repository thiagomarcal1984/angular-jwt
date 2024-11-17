import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  // Note o operador de asserção de não-nulo,
  // representado pelo ponto de exclamação
  // depois do nome da variável.
  loginForm!: FormGroup

  // Use o construtor apenas para injeção de
  // dependências e inicializações simples.
  constructor(
    // Novidade: o serviço FormBuilder do Angular.
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router,
  ) {}

  // A implementação da interface OnInit (método ngOnInit)
  // serve para inicializações mais complexas, como
  // inscrição em Observables. Este método é executado
  // APÓS a execução de `constructor`.
  ngOnInit(): void {
    // A criação do formulário com o serviço
    // FormBuilder.group é semelhante a usar
    // diretamente a classe FormGroup. A diferença é
    // que com o FormGroup é necessário inicializar
    // cada FormControl, e com o serviço FormBuilder
    // o FormControl é criado automaticamente.
    this.loginForm = this.formBuilder.group({
      email: [null],
      // Entre colchetes, definimos o valor padrão.
      senha: [null],
    })
  }

  login() {
    const email = this.loginForm.value.email
    const senha = this.loginForm.value.senha

    // A API tem pré-cadastrados o e-mail vinicios@alura.com,
    // com a senha 'megadificil'. Vamos testar o serviço assim.
    this.authService.autenticar(email, senha).subscribe({
      next: (value) => {
        console.log('Login realizado com sucesso.', value)
        // Redirecionamento para a rota raiz.
        // this.router.navigate(['/'])
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        console.log('Erro no login', err)
      }
    })
  }
}

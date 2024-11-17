import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private formBuilder: FormBuilder
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
    console.log(
      'Login realizado com sucesso.',
      this.loginForm.value
  )
}
}

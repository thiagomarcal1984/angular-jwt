# Criando a tela de login
## Preparando o ambiente
- [Github do projeto-base do frontend](https://github.com/alura-cursos/3213-jornada-milhas/tree/projeto-base)
- [Download do .zip do projeto-base do frontend](https://github.com/alura-cursos/3213-jornada-milhas/archive/refs/heads/projeto-base.zip)
- [Layout no Figma](https://www.figma.com/community/file/1416571124509342695)
- [Github da API do projeto](https://github.com/alura-cursos/jornada-milhas-api)
- [Download do .zip da API](https://github.com/alura-cursos/jornada-milhas-api/archive/refs/heads/main.zip). O caminho para a API será http://localhost:8080/api, conforme definido no arquivo `main.ts` do projeto da API.
- [Imagens estáticas para o projeto](https://cdn3.gnarususercontent.com.br/3213-angular-controle-sessao-usuario/imagens.zip). Mova o conteúdo para a pasta `assets/imagens`.

Execute o comando `npm install` nos dois projetos (na API e no frontend). E na API, execute o comando `npm run start:dev`, conforme determinado no arquivo `package.json` na seção de scripts.

## Tela de login
Criação do componente da tela de login:
```bash
ng g c pages/login
CREATE src/app/pages/login/login.component.html (20 bytes)
CREATE src/app/pages/login/login.component.spec.ts (552 bytes)
CREATE src/app/pages/login/login.component.ts (199 bytes)
CREATE src/app/pages/login/login.component.scss (0 bytes)
UPDATE src/app/app.module.ts (3300 bytes)
```

Vamos acrescentar mais uma rota no Angular para o componente `LoginComponent`, modificando o arquivo `app-routing.module`:
```TypeScript
// frontend\src\app\app-routing.module.ts
// Resto do código
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  // Resto do código
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Definição do HTML do componente:
```HTML
<!-- frontend\src\app\pages\login\login.component.html -->
<app-banner
  src="assets/imagens/banner-login.png"
  alt="Banner da tela de login"
>
</app-banner>
<section class="login-component">
  <mat-card class="login">
    <div class="image-container">
      <figure>
        <img
          src="assets/imagens/simbolo-bussola.png"
          alt="Símbolo de uma bússola laranja"
        >
      </figure>
    </div>
    <div class="form-container">
      <mat-card-header>
        <mat-card-title>Login</mat-card-title>
      </mat-card-header>
      <form>
        <mat-card-content>
          <!--
            Note que o componente MatFormFieldComponent envolve
            outros dois componentes: o MatLabel e o campo com a
            propriedade matInput.
           -->
          <mat-form-field appearance="outline">
            <mat-label>E-mail</mat-label>
            <input matInput type="email" placeholder="Digite seu e-mail">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Senha</mat-label>
            <input matInput type="password" placeholder="Digite sua senha">
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions>
          <button mat-flat-button color="primary">
            ACESSAR MINHA CONTA
          </button>
        </mat-card-actions>
        <p>
          Ainda não possui conta?
          <a><strong><u>Clique aqui para se cadasrtrar</u></strong></a>
        </p>
      </form>
    </div>
  </mat-card>
</section>
```
## Controlando o formulário reativo
Mudanças no TypeScript do componente `LoginComponent`:
```TypeScript
// frontend\src\app\pages\login\login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  // Resto do código
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
```
Vamos fazer 3 coisas no HTML do componente `LoginComponent`:
1. Amarrar o `FormGroup` criado ao elemento HTML `form`, usando a propriedade `[formGroup]`;
2. Referenciar o nome do `FormControl` para cada campo do `FormGroup` usando a propriedade `formControlName`; e
3. Amarrar o método `login()` ao evento `(click)`.

```HTML
<!-- Resto do código -->
<form [formGroup]="loginForm">
    <mat-card-content>
        <!--
        Note que o componente MatFormFieldComponent envolve
        outros dois componentes: o MatLabel e o campo com a
        propriedade matInput.
        -->
        <mat-form-field appearance="outline">
            <mat-label>E-mail</mat-label>
            <input matInput type="email"
                formControlName="email"
                placeholder="Digite seu e-mail"
            >
        </mat-form-field>
        <mat-form-field appearance="outline">
            <mat-label>Senha</mat-label>
            <input matInput type="password"
                formControlName="senha"
                placeholder="Digite sua senha"
            >
        </mat-form-field>
    </mat-card-content>
    <mat-card-actions>
        <button mat-flat-button
            color="primary"
            (click)="login()"
        >
        ACESSAR MINHA CONTA
        </button>
    </mat-card-actions>
    <!-- Resto do código -->
</form>
<!-- Resto do código -->
```

## Serviço de autenticação
Criação do serviço de autentiação:
```bash
ng g s core/services/autenticacao
CREATE src/app/core/services/autenticacao.service.spec.ts (387 bytes)
CREATE src/app/core/services/autenticacao.service.ts (141 bytes)
```
O arquivo gerado de especificação de testes será excluído (`autenticacao.service.spec.ts`).

Implementação do serviço `AutenticacaoService`:

```TypeScript
// frontend\src\app\core\services\autenticacao.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
  ) { }

  autenticar(email: string, senha: string) : Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, {email, senha})
  }
}
```
> Note que o método `http.post` recebe dois parâmetros: a URL e o payload. Além disso, note que o retorno desse método é um `Observable`. A definição do método `subscribe` do `Observable` cabe a cada componente que o recebe, não ao serviço.

Modificações no componente `LoginComponent`:
```TypeScript
// frontend\src\app\pages\login\login.component.ts
// Resto do código
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  // Resto do código
})
export class LoginComponent implements OnInit{
  //  Resto do código
  
  // Use o construtor apenas para injeção de
  // dependências e inicializações simples.
  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router,
  ) {}

  // Resto do código

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
```
## Validando o login
Vamos incluir o link para a rota `/login` usando a propriedade `routerLink` no HTML do componente `HeaderComponent`:
```HTML
<!-- frontend\src\app\shared\header\header.component.html -->
<!-- Resto do código -->
    <button routerLink="/login" mat-stroked-button>LOGIN</button>
<!-- Resto do código -->
```

Em seguida, vamos colocar validações nos campos de e-mail e senha no TypeScript do componente `LoginComponent`:

```TypeScript
// frontend\src\app\pages\login\login.component.ts
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Resto do código
export class LoginComponent implements OnInit{
    // Resto do código
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email]],
        senha: [null, Validators.required],
        })
    }

}
```
> Perceba que dentro da classe `Validators` há vários validadores. Aqui estamos usando apenas o `email` e `required`.

Vamos controlar a exibição das mensagens de erro no HTML do componente `LoginComponent` caso eles existam:
```HTML
<!-- frontend\src\app\pages\login\login.component.html -->
<!-- Resto do código -->
<form [formGroup]="loginForm">
    <mat-card-content>
        <mat-form-field appearance="outline">
            <mat-label>E-mail</mat-label>
            <input matInput type="email"
                formControlName="email"
                placeholder="Digite seu e-mail"
            >
            <mat-error *ngIf="loginForm.get('email')?.errors?.['required']">
                E-mail obrigatório.
            </mat-error>
            <mat-error *ngIf="loginForm.get('email')?.errors?.['email']">
                Formato de e-mail inválido.
            </mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
            <mat-label>Senha</mat-label>
            <input matInput type="password"
                formControlName="senha"
                placeholder="Digite sua senha"
            >
            <mat-error *ngIf="loginForm.get('senha')?.errors?.['required']">
                Senha é obrigatória
            </mat-error>
        </mat-form-field>
    </mat-card-content>
    <mat-card-actions>
        <button mat-flat-button
        color="primary"
        (click)="login()"
        [disabled]="loginForm.invalid"
        >
        ACESSAR MINHA CONTA
        </button>
    </mat-card-actions>
    <!-- Resto do código -->
</form>
<!-- Resto do código -->
```

Pontos de destaque no código HTML:
1. Para cada componente `MatErrorComponent` usamos a diretiva `*ngIf` para evitar que a mensagem de erro apareça quando os campos forem válidos;
2. A propriedade `errors` de cada `FormControl` pode ou não ter erros de validação, assim como o próprio `FormControl` pode não ter erros. Por isso, é necessário usar o **operador de encadeamento opcional / operador de acesso seguro / operador de propagação nula / ponto de interrogação (?)**;
3. Os validadores referenciados pela propriedade `errors` são identificados por strings, cujos conteúdos correspondem aos nomes dos validadores que estão no TypeScript do componente. Neste exemplo, usamos os validadores `Validators.email` e `Validators.required` (respectivamente as strings seriam `email` e `required`);
4. O botão pode ter seu status de habilitado/desabilitado modificado em função do status do formulário. No exemplo, usamos o data-bind `[disabled]` e fornecemos para ele a propriedade booleana `invalid` do formulário `loginForm`.

# Cadastro
## Formulário base
Criando o componente com o Angular CLI:
```bash
ng g c shared/form-base
CREATE src/app/shared/form-base/form-base.component.html (24 bytes)
CREATE src/app/shared/form-base/form-base.component.spec.ts (574 bytes)
CREATE src/app/shared/form-base/form-base.component.ts (214 bytes)
CREATE src/app/shared/form-base/form-base.component.scss (0 bytes)
UPDATE src/app/app.module.ts (3482 bytes)
```

## Desafio: criação do formulário base
Vamos criar uma rota para testar o componente:
```TypeScript
// frontend\src\app\app-routing.module.ts
// Resto do código
import { FormBaseComponent } from './shared/form-base/form-base.component';

const routes: Routes = [
  // Resto do código
  {
    path: 'cadastro',
    component: FormBaseComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Em seguida, vamos alterar o TypeScript de `FormBaseComponent`:
```TypeScript
// frontend\src\app\shared\form-base\form-base.component.ts
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UnidadeFederativa } from 'src/app/core/types/type';

@Component({
  // Resto do código
})
export class FormBaseComponent implements OnInit{
  cadastroForm!: FormGroup
  estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required)

  constructor (
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, [Validators.required]],
      nascimento: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      genero: ['outro'],
      telefone: [null, [Validators.required]],
      estado: this.estadoControl,
      email: [null, [Validators.required, Validators.email]],
      confirmarEmail: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(3)]],
      aceitarTermos: [null, [Validators.requiredTrue]],
    })
  }
}
```
> Note a declaração de `estadoControl`: é um `FormControl` cujo tipo é da interface `UnidadeFederativa`. Os seus parâmetros são o valor default (no exemplo é `null` e a lista de validadores). Note também que dentro do método `ngOnInit` o controle se chamada `estado`, e esse controle recebeo próprio `estadoControl`. Mal explicado o porquê dessa gambiarra.

O HTML gigante do componente `FormBaseComponent`:
```HTML
<!-- frontend\src\app\shared\form-base\form-base.component.html -->
<app-container>
  <mat-card>
    <form [formGroup]="cadastroForm">
      <mat-card-title>
        Crie sua conta
      </mat-card-title>
      <section>
        <div class="acoesPerfil">
          <h2>Dados pessoais</h2>
          <button mat-stroked-button color="primary">
            <mat-icon>logout</mat-icon>
            DESLOGAR
          </button>
        </div>
      </section>
      <mat-card-content>
        <div class="grid-container">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Nome</mat-label>
            <input matInput type="text" formControlName="nome" placeholder="Nome">
            <mat-error *ngIf="cadastroForm.get('nome')?.errors?.['required']">
              Nome é obrigatório
            </mat-error>
          </mat-form-field>
          <div class="grid-item">
            <mat-form-field appearance="outline">
              <mat-label>Data de nascimento</mat-label>
              <input matInput
                formControlName="nascimento"
                [matDatepicker]="nascimento"
                placeholder="Data de Nascimento"
              >
              <mat-datepicker-toggle matSuffix [for]="nascimento"></mat-datepicker-toggle>
              <mat-datepicker #nascimento></mat-datepicker>
              <mat-error *ngIf="cadastroForm.get('nascimento')?.errors?.['required']">
                Data de nascimento é obrigatória
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>CPF</mat-label>
              <input matInput formControlName="cpf" placeholder="Digite seu CPF">
              <mat-error *ngIf="cadastroForm.get('cpf')?.errors?.['required']">
                CPF é obrigatório
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Cidade</mat-label>
              <input matInput formControlName="cidade" placeholder="Digite sua cidade">
              <mat-error *ngIf="cadastroForm.get('cidade')?.errors?.['required']">
                Cidade é obrigatória
              </mat-error>
            </mat-form-field>
          </div>
          <div class="grid-item">
            <div class="radio-group">
              <mat-label>Gênero</mat-label>
              <!-- Não é necessário aninhar o MatRadioGroup num MatFormField -->
              <mat-radio-group formControlName="genero" color="primary">
                <mat-radio-button value="feminino">Feminino</mat-radio-button>
                <mat-radio-button value="masculino">Masculino</mat-radio-button>
                <mat-radio-button value="outro">Prefiro não informar</mat-radio-button>
              </mat-radio-group>
            </div>
            <mat-form-field appearance="outline">
              <mat-label>Telefone</mat-label>
              <input matInput formControlName="telefone" placeholder="+xx xxxx-xxxx">
              <mat-error *ngIf="cadastroForm.get('telefone')?.errors?.['required']">
                Telefone é obrigatório
              </mat-error>
            </mat-form-field>
            <app-dropdown-uf
              label="Estado"
              placeholder="Estado"
              [control]="estadoControl"
            >
          </app-dropdown-uf>
          <mat-error *ngIf="cadastroForm.get('estado')?.errors?.['required'] && estadoControl?.touched">
            Estado é obrigatório
          </mat-error>
          </div>
        </div>
      </mat-card-content>
      <mat-divider></mat-divider>
      <div class="acessoPerfil">
        <h2>Dados de acesso</h2>
      </div>
      <mat-card-content>
        <div class="grid-container">
          <div class="grid-item">
            <mat-form-field appearance="outline">
              <mat-label>E-mail</mat-label>
              <input matInput formControlName="email" placeholder="Digite seu e-mail">
              <mat-error *ngIf="cadastroForm.get('email')?.errors?.['required']">
                E-mail é obrigatório
              </mat-error>
              <mat-error *ngIf="cadastroForm.get('email')?.errors?.['email']">
                E-mail inválido
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Senha</mat-label>
              <input matInput formControlName="senha" type="password" placeholder="Digite sua senha">
              <mat-error *ngIf="cadastroForm.get('senha')?.errors?.['required']">
                Senha é obrigatória
              </mat-error>
              <mat-error *ngIf="cadastroForm.get('senha')?.errors?.['minlength']">
                Senha deve ter pelo menos 3 caracteres
              </mat-error>
            </mat-form-field>
          </div>
          <div class="grid-item">
            <mat-form-field appearance="outline">
              <mat-label>Confirmar E-mail</mat-label>
              <input matInput formControlName="confirmarEmail" placeholder="Digite seu e-mail">
              <mat-error *ngIf="cadastroForm.get('confirmarEmail')?.errors?.['required']">
                Confirmação de E-mail é obrigatório
              </mat-error>
              <mat-error *ngIf="cadastroForm.get('confirmarEmail')?.errors?.['email']">
                E-mail inválido
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Confirmar Senha</mat-label>
              <input matInput formControlName="confirmarSenha" type="password" placeholder="Digite sua senha">
              <mat-error *ngIf="cadastroForm.get('confirmarSenha')?.errors?.['required']">
                Confirmação de Senha é obrigatória
              </mat-error>
              <mat-error *ngIf="cadastroForm.get('confirmarSenha')?.errors?.['minlength']">
                Senha deve ter pelo menos 3 caracteres
              </mat-error>
            </mat-form-field>
          </div>
        </div>
        <mat-checkbox formControlName="aceitarTermos" color="primary" class="full-width">
          Li e aceito os termos e condições deste cadastro *
        </mat-checkbox>
        <mat-error *ngIf="cadastroForm.get('aceitarTermos')?.errors?.['required'] && cadastroForm.get('aceitarTermos')?.touched">
          Você precisa aceitar os termos e condições para efetuar o cadastro
        </mat-error>
      </mat-card-content>
      <mat-card-actions align="start">
          <button  mat-flat-button
            [disabled]="cadastroForm.invalid"
            color="primary"
          >
            CADASTRAR
          </button>
      </mat-card-actions>
    </form>
  </mat-card>
</app-container>
```
O arquivo `app.module.ts` precisou importar uns módulos referenciados nesse HTML gigante para que os componentes fossem usáveis:
```TypeScript
// frontend\src\app\app.module.ts
// Resto do código
import { FormBaseComponent } from './shared/form-base/form-base.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  // Resto do código
  imports: [
    // Resto do código
    MatRadioModule,
    MatDividerModule,
    MatCheckboxModule,
  ],
  // Resto do código
})
export class AppModule { }
```
## Integrando o código
O componente de estado (`DropdownUfComponent`) está com uma formatação ruim. Vamos ajustar.

```TypeScript
// frontend\src\app\shared\form-busca\dropdown-uf\dropdown-uf.component.ts
// Resto do código
export class DropdownUfComponent implements OnInit {
  // Resto do código
  @Input() placeholder: string = '';
  // Resto do código
}
```

Vamos atualizar o HTML do componente `DropdownUfComponent`:
```HTML
<!-- frontend\src\app\shared\form-busca\dropdown-uf\dropdown-uf.component.html -->
<mat-form-field class="input-container" appearance="outline">
    <mat-label>{{ label }}</mat-label>
    <mat-icon matPrefix *ngIf="iconePrefixo">
        {{ iconePrefixo }}
    </mat-icon>
    <input
        matInput
        [placeholder]="placeholder"
        [formControl]="control"
        [name]="label"
        ngDefaultControl
        [matAutocomplete]="auto">
    <!-- Resto do código -->
</mat-form-field>
```
> As mudanças foram na exibição condicional de `iconePrefixo` e no placeholder, que agora contém um property-binding com a variável `placeholder` do TypeScript do componente.

Atualização do SCSS do componente `DropdownUfComponent`:
```SCSS
// frontend\src\app\shared\form-busca\dropdown-uf\dropdown-uf.component.scss
.input-container {
    margin-bottom: -1.25em;
}
.mat-mdc-form-field {
    width: 100%;
}
```
> Essa modificação é necessária para ajustar a largura de `DropdownUfComponent` no HTML do componente `FormBaseComponent`, mas ela impacta num outro componente: o `FormBuscaComponent`. Vamos modificar o HTML e o SCSS desse componente.

Mudança no HTML do componente `FormBuscaComponent`:
```HTML
<!-- frontend\src\app\shared\form-busca\form-busca.component.html -->
<!-- Resto do código -->
    <div class="flex-container">
      <div class="drop-container">
        <app-dropdown-uf
          label="Origem"
          iconePrefixo="flight_takeoff"
          [control]="formBuscaService.obterControle('origem')"
          placeholder="Origem"
        />
      </div>
      <!-- Resto do código -->
      <div class="drop-container">
        <app-dropdown-uf
          label="Destino"
          placeholder="Destino"
          iconePrefixo="flight_land"
          [control]="formBuscaService.obterControle('destino')"
        />
      </div>
<!-- Resto do código -->
```
> Note a aplicação da propriedade `placeholder` nos componentes `DropdownUfComponent`, assim como o envelopamento deles nas divs de classe `drop-container`. Essa classe ainda será criada no arquivo SCSS do componente `FormBuscaComponent`.

Mudança no SCSS do componente `FormBuscaComponent`:
```SCSS
// frontend\src\app\shared\form-busca\form-busca.component.scss
.form-busca {
    // Resto do código
    .drop-container {
        max-width: 230px;
    }
}
```

Finalmente, vamos mover o componente `DropdownUfComponent` do diretório atual (`frontend\src\app\shared\form-busca`) para a pasta `frontend\src\app\shared\`, pois o componente `DropdownUfComponent` não é mais limitado ao componente `FormBuscaComponent`. O import também precisa ser atualizado no arquivo `app.module.ts`.

```TypeScript
// frontend\src\app\app.module.ts
// Resto do código

// Antes
// import { DropdownUfComponent } from './shared/form-busca/dropdown-uf/dropdown-uf.component';

// Depois
import { DropdownUfComponent } from './shared/dropdown-uf/dropdown-uf.component';
// Resto do código
```

## Componente cadastro
Criando o componente/página de cadastro: 

```bash
PS D:\alura\angular-jwt\frontend> ng g c pages/cadastro      
CREATE src/app/pages/cadastro/cadastro.component.html (23 bytes)
CREATE src/app/pages/cadastro/cadastro.component.spec.ts (573 bytes)
CREATE src/app/pages/cadastro/cadastro.component.ts (211 bytes)
CREATE src/app/pages/cadastro/cadastro.component.scss (0 bytes)
UPDATE src/app/app.module.ts (3825 bytes)
```

O componente `CadastroComponent` será o pai do componente `FormBaseComponent`. A ideia é que `CadastroComponent` reaja a eventos do componente `FormBaseComponent`. Para isso:
1. O filho `FormBaseComponent`, no TypeScript, deve fornecer externamente o emissor de eventos da classe `EventEmitter` por meio de um parâmetro de saída `@Output()`. No exemplo, o evento será chamado `acaoClique()`. Também é necessário implementar um outro método para emitir o evento (neste caso, o método será `executarAcao()`);
2. O filho `FormBaseComponent` precisa disparar esse evento (neste exemplo, será um click) referenciando-o em seu HTML. Isso é feito com `<button ... (click)="executarAcao()">`;
3. O pai `CadastroComponent` implementa um método qualquer (neste exemplo, o método será `cadastrar()`) que reagirá ao evento emitido pelo filho `FormBaseComponent`.
4. O HTML do pai `CadastroComponent` declara o event binding para o evento do mesmo tipo definido pelo filho `FormBaseComponent` (no exemplo, o evento será `acaoClique()`) e atribui ao evento o método implementado para resposta (`cadastrar()`).

Começando pelo filho:

```TypeScript
// frontend\src\app\shared\form-base\form-base.component.ts

// Resto do código
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Resto do código
export class FormBaseComponent implements OnInit{
  // Resto do código
  // O pai vai setar a variável perfilComponent para exibir ou não certos elementos.
  @Input() perfilComponent!: boolean 
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>()
  // Resto do código
  executarAcao() {
    this.acaoClique.emit()
  }
}
```

```HTML
<!-- frontend\src\app\shared\form-base\form-base.component.html -->
 
<!-- Resto do código -->
  <div class="acoesPerfil" *ngIf="perfilComponent">
    <!-- Resto do código -->
  </div>
  <!-- Resto do código -->
  <mat-divider *ngIf="perfilComponent"></mat-divider>
  <!-- Resto do código -->

  <mat-card-actions align="start">
      <button  mat-flat-button
        [disabled]="cadastroForm.invalid"
        color="primary"
        (click)="executarAcao()"
      >
        CADASTRAR
      </button>
  </mat-card-actions>
<!-- Resto do código -->
```
> Perceba que o método `executarAcao()` é o responsável por emitir/propagar o evento para o componente pai.

Mudanças no componente pai:
```TypeScript
// frontend\src\app\pages\cadastro\cadastro.component.ts

// Resto do código
export class CadastroComponent {
  // perfilComponent é responsável por ocultar elementos do HTML do filho.
  perfilComponent = false 

  // cadastrar() é o método que vai responde ao evento personalizado `acaoClique()`
  cadastrar() {
    console.log('Cadastro realizado com sucesso.')
  }
}
```

```HTML
<!-- frontend\src\app\pages\cadastro\cadastro.component.html -->

<!-- Resto do código -->
<app-form-base [perfilComponent]="perfilComponent" (acaoClique)="cadastrar()" />
```
> Note que o componente pai `CadastroComponent` 
> 1. _envia_ para o parâmetro `@Input() perfilComponent` do filho `FormBaseComponent` o seu booleano `perfilComponent` para ocultar/exibir certos elementos. 
> 2. _recebe_ do filho `FormBaseComponent` o parâmetro `@Output() acaoClique` por meio do event binding `(acaoClique)` e dispara o seu próprio tratamento do evento (no caso, o método `cadastrar()`).

Agora a rota `cadastro` deve aponstar para `CadastroComponent` ao invés de `FormBaseComponent`: 
```TypeScript
// frontend\src\app\app-routing.module.ts

// Resto do código
import { CadastroComponent } from './pages/cadastro/cadastro.component';

const routes: Routes = [
  // Resto do código
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  // Resto do código
];
```

E finalmente, o `HeaderComponent` precisa atualiar o link para a nova rota: 
```HTML
<!-- frontend\src\app\shared\header\header.component.html -->

<!-- Resto do código -->
  <button routerLink="/cadastro" mat-raised-button color="primary">CADASTRE-SE</button>
<!-- Resto do código -->
```

## Service e interface
```bash
ng g s core/services/formulario --skip-tests
# Output
CREATE src/app/core/services/formulario.service.ts (139 bytes)
```
> Note a flag `--skip=tests`: ela impede a criação dos arquivos `spec.ts`, que contérão os testes unitários.

O serviço vai conter apenas um `FormGroup` encapsulado, além do getter e do setter dele:
```TypeScript
// frontend\src\app\core\services\formulario.service.ts

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  cadastroForm: FormGroup | null = null

  getCadastro(): FormGroup | null {
    return this.cadastroForm
  }
  setCadastro(form: FormGroup) {
    this.cadastroForm = form
  }
}
```

O serviço será injetado no componente "abstrato" `FormBaseComponent`, e FormGroup `cadastroForm` será atribuído à propriedade `cadastroForm` no `FormularioService`:

```TypeScript
// frontend\src\app\shared\form-base\form-base.component.ts

import { FormularioService } from 'src/app/core/services/formulario.service';
// Resto do código
export class FormBaseComponent implements OnInit{
  cadastroForm!: FormGroup
  // Resto do código
  constructor (
    private formBuilder: FormBuilder,
    private formularioService: FormularioService,
  ) {}

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      // Resto do código
    })
    // Resto do código
    this.formularioService.setCadastro(this.cadastroForm)
  }
  // Resto do código
}
```

O serviço também será injetado no componente `CadastroComponent`. Ele apenas vai usar o formulário `cadastroForm` de `FormularioService`, que foi inicializado pelo componente `FormBaseComponent`:
```TypeScript
// frontend\src\app\pages\cadastro\cadastro.component.ts

import { FormularioService } from './../../core/services/formulario.service';
import { Component } from '@angular/core';

@Component({
  // Resto do código
})
export class CadastroComponent {
  perfilComponent = false
  constructor(private formularioService: FormularioService) {}

  cadastrar() {
    const formCadastro = this.formularioService.getCadastro()
    // Impressão do formCadastro para teste.
    console.log('Cadastro realizado com sucesso.', formCadastro) 
  }
}
```

Finalmente, vamos acrescentar (para uso futuro) mais uma interface ao arquivo `type.ts` para a rota `/auth/cadastro` da API:
```TypeScript
// frontend\src\app\core\types\type.ts

// Resto do código
export interface PessoaUsuaria {
  nome: string,
  nascimento: string,
  cpf: string,
  telefone: string,
  email: string,
  senha: string,
  genero: string,
  cidade: string,
  estado: UnidadeFederativa,
}
```

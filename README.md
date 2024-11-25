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

## Desafio: criação do service de cadastro

```bash
PS D:\alura\angular-jwt\frontend> ng g s --skip-tests core/services/cadastro
# Output
CREATE src/app/core/services/cadastro.service.ts (137 bytes)
```

Implementação do serviço:
```TypeScript
// frontend\src\app\core\services\cadastro.service.ts

import { PessoaUsuaria } from './../types/type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
  ) { }

  cadastrar(pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    return this.http.post<PessoaUsuaria>(`${this.apiUrl}/auth/cadastro`, pessoaUsuaria)
  }
}
```

## Erro 500 ao cadastrar
Vamos mudar o `CadastroComponent` para que ele use o `CadastroService`:

```TypeScript
// frontend\src\app\pages\cadastro\cadastro.component.ts

import { PessoaUsuaria } from 'src/app/core/types/type';
import { CadastroService } from './../../core/services/cadastro.service';
// Resto do código

export class CadastroComponent {
  perfilComponent = false
  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
  ) {}

  cadastrar() {
    const formCadastro = this.formularioService.getCadastro()
    if (formCadastro?.valid) {
      const novoCadastro = formCadastro.getRawValue() as PessoaUsuaria
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
          console.log('Cadastro realizado com sucesso.', value)
        },
        error: (err) => {
          console.error('Erro ao realizar cadastro: ', err)
        }
      })
    }
  }
}
```
> A novidade é o uso do método `getRawValue()` do formulário de cadastro da classe `FormGroup` localizado em `CadastroService`. Na mesma linha, há um cast do retorno desse métod para a interface `PessoaUsuaria`.

Mas... ao sumetermos o formulário, o seguinte erro aparece no console:
```TypeScript
{
    "headers": {
        "normalizedNames": {},
        "lazyUpdate": null
    },
    "status": 500,
    "statusText": "Internal Server Error",
    "url": "http://localhost:8080/auth/cadastro",
    "ok": false,
    "name": "HttpErrorResponse",
    "message": "Http failure response for http://localhost:8080/auth/cadastro: 500 Internal Server Error",
    "error": {
        "statusCode": 500,
        "message": "Internal server error"
    }
}
```
Na próxima aula será visto como resolver isso.

## Ajustando o componente dropdown
O valor do dropdown de Unidades Federativas é uma string com o nome do estado. Mas a API espera um objeto complexo como uma Unidade Federativa: 
```JSON
{
  // Resto do código JSON do payload esperado pela API
  "estado": {
    "id": 0,
    "nome": "string",
    "sigla": "string"
  }
}
```

Segue a correção do código de `DropdownUfComponent`:
```TypeScript
// frontend\src\app\shared\dropdown-uf\dropdown-uf.component.ts
// Resto do código
export class DropdownUfComponent implements OnInit {
  // Resto do código
  filtrarUfs(value: string | UnidadeFederativa): UnidadeFederativa[] {
    const nomeUf = typeof value === 'string' ? value.toLowerCase() : value?.nome;
    const valorFiltrado = nomeUf?.toLowerCase();
    const result = this.unidadesFederativas.filter(
      estado => estado.nome.toLowerCase().includes(valorFiltrado)
    )
    return result
  }
  // Resto do código
}
```
> Antes o método `filtrarUfs` só aceitava strings; agora ela aceita tanto strings quanto a interface `UnidadeFederativa`. Para fazer o filtro, é necessário primeiro saber qual o tipo do parâmetro fornecido; depois pegar o nome do estado (seja da string, seja do atributo nome da interface `UnidadeFederativa`).

A documentação do Angular sobre o `MatAutocompleteComponent` diz que é possível mudar o texto de exibição do objeto selecionado. Para isso, definimos uma função que retorna a string e usamos um data-binding com a propriedade `displayWith`:

```HTML
<!-- frontend\src\app\shared\dropdown-uf\dropdown-uf.component.html -->

<!-- Resto do código -->
  <mat-autocomplete [displayWith]="displayFn" autoActiveFirstOption #auto="matAutocomplete">
    <mat-option *ngFor="let estado of filteredOptions$ | async" [value]="estado">
      {{estado.nome}}
    </mat-option>
  </mat-autocomplete>
<!-- Resto do código -->
```

Agora vamos fazer a implementação da função que batizamos de `displayFn` em `DropdownUfComponent`:
```TypeScript
// frontend\src\app\shared\dropdown-uf\dropdown-uf.component.ts
// Resto do código
export class DropdownUfComponent implements OnInit {
  // Resto do código
  displayFn(estado: UnidadeFederativa): string {
    return estado && estado.nome ? `Selecionado ${estado.nome} (${estado.sigla})` : '';
  }
}
```
> Note que a implementação de `displayFn` muda a maneira como **o valor selecionado** é exibido no `MatAutocompleteComponent`. Isso não tem nada a ver com o texto exibido na lista de sugestões do `MatAutocompleteComponent`, cujos valores estão em cada uma das opções (componente `<mat-option>`)
> 
> Por exemplo: a lista vai exibir o nome do estado (ex.: *"Acre"*), mas depois de selecionado, o autocomplete vai exibir o texto *"Selecionado Acre (AC)"*.

## Validações personalizadas
A classe `Validators` do módulo `@angular/forms` fornecem apenas validações básicas. Para validações mais complexas, precisamos criar um TypeScript separado.

Vamos criar um novo arquivo que vai conter uma validação de igualdade entre dois campos:

```TypeScript
// frontend\src\app\shared\form-validations.ts

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidations {
  static equalTo(otherField: string) : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldValue = control.value
      const otherFieldValue = control.root.get(otherField)?.value
      if (fieldValue !== otherFieldValue) {
        return {equalTo: true}
      }
      return null
    }
  }
}
```
> 1. `AbstractControl` é a superclasse dos controles do `FormGroup`.
> 2. `ValidationErrors` é um tipo estruturado de erro semelhante a um dicionário do Python. Esse tipo será retornado caso a validação falhe.
> 3. `ValidationFn` é uma interface com uma estrutura key-value pair `(control: AbstractControl): ValidationErrors | null;`.
> Ou seja: o método estático `equalTo` retorna uma outra função de validação cujo retorno é um tipo `ValidationErrors` ou `null`.

Vamos inserir a validação recém-criada no componente `FormBaseComponent`:
```TypeScript
// frontend\src\app\shared\form-base\form-base.component.ts

import { FormValidations } from '../form-validations';
// Resto do código

export class FormBaseComponent implements OnInit{
  // Resto do código
  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      // Resto do código
      email: [null, [Validators.required, Validators.email]],
      confirmarEmail: [
        null,
        [
          Validators.required,
          Validators.email,
          FormValidations.equalTo('email') // Nova validação.
        ]
      ],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      confirmarSenha: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          FormValidations.equalTo('senha') // Nova validação.
        ]
      ],
      aceitarTermos: [null, [Validators.requiredTrue]],
    })

    this.formularioService.setCadastro(this.cadastroForm)
  }
}
```

Com a validação implementada, vamos exibir as mensagens de erro no HTML de `FormBaseComponent`:
```HTML
<!-- frontend\src\app\shared\form-base\form-base.component.html -->

<!-- Resto do código -->
  <mat-form-field appearance="outline">
    <mat-label>Confirmar E-mail</mat-label>
    <input matInput formControlName="confirmarEmail" placeholder="Digite seu e-mail">
    <!-- Resto das mensagens de erro -->
    <mat-error *ngIf="cadastroForm.get('confirmarEmail')?.errors?.['equalTo']">
      E-mails não coincidem
    </mat-error>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Confirmar Senha</mat-label>
    <input matInput formControlName="confirmarSenha" type="password" placeholder="Digite sua senha">
    <!-- Resto das mensagens de erro -->
    <mat-error *ngIf="cadastroForm.get('confirmarSenha')?.errors?.['equalTo']">
      Senhas não coincidem
    </mat-error>
  </mat-form-field>
<!-- Resto do código -->
```

# Autenticação
## JWT e TokenService
Visite: https://jwt.io para saber sobre o JSON Web Token (JWT).

Para usar o JWT neste projeto, precisaremos instalar a dependência `jwt-decode`:
```bash
npm i jwt-decode
```
> Note que o arquivo `package.json` foi atualizado com a dependência `jwt-decode`.

Vamos criar o serviço que vai manipular o JSON Web Token: 
```bash
PS D:\alura\angular-jwt\frontend> ng g s core/services/token --skip-tests
# Output
CREATE src/app/core/services/token.service.ts (134 bytes)
```

Implementação do serviço `TokenService`:
```TypeScript
// frontend\src\app\core\services\token.service.ts

import { Injectable } from '@angular/core';

const KEY = 'token'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  salvarToken(token: string) {
    return localStorage.setItem(KEY, token)
  }

  excluirToken() {
    localStorage.removeItem(KEY)
  }

  retornarToken() {
    return localStorage.getItem(KEY)
  }

  possuiToken() {
    // Duas exclamações seguidas converte o valor em booleano.
    return !!this.retornarToken()
  }
}
```
> Note que todos os métodos implementados usam o `localStorage` do navegador.

## UserService com BehaviorSubject
Vamos criar um outro serviço para controlar usuários logados:

```bash
ng g s core/services/user --skip-tests
# Output
CREATE src/app/core/services/user.service.ts (133 bytes)
```

Implementação de `UserService` recém-criado:
```TypeScript
// frontend\src\app\core\services\user.service.ts
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { PessoaUsuaria } from '../types/type';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null)

  constructor(
    private tokenService : TokenService,
  ) {
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT()
    }
  }

  decodificarJWT() {
    const token = this.tokenService.retornarToken()
    const user = jwtDecode(token) as PessoaUsuaria
    this.userSubject.next(user) // Emite o usuário decodificado do token.
  }

  retornarUser() {
    // Retornar o userSubject como um Observable.
    return this.userSubject.asObservable()
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token)
    this.decodificarJWT()
  }

  logout() {
    this.tokenService.excluirToken()
    this.userSubject.next(null) // Emite usuário nulo.
  }

  estaLogado() {
    this.tokenService.possuiToken()
  }
}
```
> Dois métodos interessantes dos objetos de classe `BehaviorSubject`:
> 1. `next(valor)` comunica aos assinantes do objeto o seu novo valor;
> 2. `asObservable()` retorna um `Observable` do `BehaviorSubject`.

Pequena mudança no `TokenService`:
```TypeScript
// frontend\src\app\core\services\token.service.ts
// Resto do código 
export class TokenService {
  // Resto do código 
  retornarToken() {
    return localStorage.getItem(KEY) ?? ""
    // Retorna o token ou uma string vazia se o token não existir.
  }
  // Resto do código 
}
```

## Autenticação
Mudanças em `AutenticacaoService`:

```TypeScript
// frontend\src\app\core\services\autenticacao.service.ts

import { UserService } from './user.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// Resto do código

interface AuthResponse {
  access_token : string,
}

// Resto do código
export class AutenticacaoService {
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  autenticar(email: string, senha: string) :
    Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/login`,
      { email, senha },
      { observe: 'response' }
    ).pipe(
      tap(response => {
        const authToken = response.body?.access_token || ''
        this.userService.salvarToken(authToken)
      })
    )
  }
}
```
Pontos de interesse:
1. O método `http.post` passou a ser tipado com a nova interface `AuthResponse` definida no próprio `AutenticacaoService`;
2. O método `http.post` também recebeu um terceiro parâmetro (`{ observe: 'response' }`);
3. O `UserService` foi injetado em `AutenticacaoService` para fazer os controles de usuário;
4. A função `tap` do rxjs, encadeado pela função `pipe`, vai pegar a resposta (que é do tipo `AuthResponse`) e executar efeitos colaterais (no caso, salvar o token usando o `UserService`).

# Criando e editando o perfil
## Tela de perfil

Vamos criar o componente de perfil:

```bash
ng g c pages/perfil --skip-tests
# Output
CREATE src/app/pages/perfil/perfil.component.html (21 bytes)
CREATE src/app/pages/perfil/perfil.component.ts (203 bytes)  
CREATE src/app/pages/perfil/perfil.component.scss (0 bytes)  
UPDATE src/app/app.module.ts (3915 bytes)
```

E em seguida criaremos mais uma rota para o novo `PerfilComponent`:
```TypeScript
// frontend\src\app\app-routing.module.ts

// Resto do código
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  // Resto do código
  {
    path: 'perfil',
    component: PerfilComponent
  },
];
// Resto do código
```

Vamos flexibilizar o `FormBaseComponent` para que exiba diferentes elementos a depender dos parâmetros fornecidos pelos seus elementos-pai:

```TypeScript
// frontend\src\app\shared\form-base\form-base.component.ts

// Resto do código
export class FormBaseComponent implements OnInit{
  @Input() perfilComponent = false
  @Input() titulo: string = 'Crie sua conta'
  @Input() textoBotao: string = 'CADASTRAR'
  // Resto do código
}
```

> A variável `perfilComponent` agora está setada como `false` por default. Logo, o HTML do `CadastroComponent` não precisa mais desse data-binding para ser ocultado em `PerfilComponent`:
> ```HTML
> <!-- frontend\src\app\pages\cadastro\cadastro.component.html -->
> <app-banner
>   src="assets/imagens/banner-cadastro.png"
>   alt="Banner da tela de cadastro"
> >
> </app-banner>
> <app-form-base
>   (acaoClique)="cadastrar()"
> >
> </app-form-base>
> ```

E adaptaremos o HTML de `FormBaseComponent`:
```HTML
<!-- frontend\src\app\shared\form-base\form-base.component.html -->

<!-- Resto do código  -->
  <mat-card-title>
    {{ titulo }}
  </mat-card-title>
  <!-- Resto do código  -->
  <mat-checkbox *ngIf="!perfilComponent" formControlName="aceitarTermos" color="primary" class="full-width">
    Li e aceito os termos e condições deste cadastro *
  </mat-checkbox>
  <!-- Resto do código  -->
  <mat-card-actions align="start">
      <button  mat-flat-button
        [class.perfil-button]="perfilComponent"
        ... outras propriedades....
      >
        {{ textoBotao }}
      </button>
  </mat-card-actions>
<!-- Resto do código  -->
```
> Note o data-binding `class.perfil-button`: ele aplica o estilo SCSS `perfil-button` caso o booleano atribuído a esse databinding seja verdadeiro. No caso, o booleano `perfilComponent` vai dizer se o estilo `perfil-button` será aplicado.

Agora vamos estruturar o novo `PerfilComponent`:

TypeScript:
```TypeScript
// frontend\src\app\pages\perfil\perfil.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  titulo: string = 'Olá Pessoa'
  textoBotao: string = 'ATUALIZAR'

  perfilComponent: boolean = true
}
```

HTML: 
```HTML
<!-- frontend\src\app\pages\perfil\perfil.component.html -->
<app-banner
  src="assets/imagens/banner-perfil.png"
  alt="Banner da tela de Perfil"
/>
<app-form-base
  [titulo]="titulo"
  [textoBotao]="textoBotao"
  [perfilComponent]="perfilComponent"
/>
```

SCSS:
```SCSS
// frontend\src\app\pages\perfil\perfil.component.scss
:host ::ng-deep .perfil-button {
  width: 100%;
}
```
## Comunicação entre componentes
`FormBaseComponent` é filho de `PerfilComponent`. Vamos fazer `FormBaseComponent` emitir um evento `deslogar()` quando clicamos no botão de deslogar. Esse evento `deslogar()` será propagado para o pai `PerfilComponent`.

```TypeScript
// frontend\src\app\shared\form-base\form-base.component.ts

// Resto do código
export class FormBaseComponent implements OnInit{
  @Output() sair: EventEmitter<any> = new EventEmitter<any>()
  // Resto do código
  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      // Resto do código
      aceitarTermos: [null, [Validators.requiredTrue]],
    })

    if (this.perfilComponent) { 
      // Se `perfilComponent`, vamos remover o validador do campo `aceitarTermos`
      this.cadastroForm.get('aceitarTermos')?.setValidators(null)
    } else {
      // Em outras páginas vamos usar os mesmos validadores do campo `aceitarTermos`.
      this.cadastroForm.get('aceitarTermos')?.setValidators([Validators.requiredTrue])
    }
    // campo?.updateValueAndValidity() repete a validação após remoção/inclusão das validações.
    this.cadastroForm.get('aceitarTermos')?.updateValueAndValidity()
    // Resto do código
  }

  executarAcao() {
    this.acaoClique.emit()
  }

  deslogar () {
    this.sair.emit()
  }
}
```

```HTML
<!-- frontend\src\app\shared\form-base\form-base.component.html -->

<!-- Resto do código -->
  <button (click)="deslogar()" mat-stroked-button color="primary">
    <mat-icon>logout</mat-icon>
    DESLOGAR
  </button>
<!-- Resto do código -->
```

Agora o código do pai `PerfilComponent` para tratar o evento personalizado:
```TypeScript
// frontend\src\app\pages\perfil\perfil.component.ts

// Resto do código
export class PerfilComponent {
  // Resto do código
  deslogar () {
    console.log('Log out realizado com sucesso.')
  }
  atualizar () {
    console.log('Cadastro atualizado com sucesso.')
  }
}
```

```HTML
<!-- frontend\src\app\pages\perfil\perfil.component.html -->
<!-- Resto do código -->
<app-form-base ... (sair)="deslogar()" (acaoClique)="atualizar()" />
```
> Perceba que o pai `PerfilComponent` imprime no console como reação aos eventos emitidos/disparados pelo componente filho `FormBaseComponent`.

## Novos métodos no cadastro service
O `CadastroService` receberá mais dois métodos para recuperar e modificar o perfil do usuário:

```TypeScript
// frontend\src\app\core\services\cadastro.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';

// Resto do código
export class CadastroService {
  // Resto do código

  buscarCadastro(token: string): Observable<PessoaUsuaria> {
    const header = new HttpHeaders({
      'Authorization' : `Bearer ${token}`,
    })
    return this.http.get<PessoaUsuaria>(
      `${this.apiUrl}/auth/perfil`,
      { headers : header },
    )
  }

  editarCadastro(token: string, pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    const header = new HttpHeaders({
      'Authorization' : `Bearer ${token}`,
    })
    return this.http.patch<PessoaUsuaria>(
      `${this.apiUrl}/auth/perfil`,
      pessoaUsuaria,
      { headers : header },
    )
  }
}
```
> Note o método `HttpClient.patch`: ele possui 3 parâmetros:
> 1. URL;
> 2. Payload; e
> 3. Dicionário com dados adicionais (como os cabeçalhos HTTP).
>
> O método `HttpClient.get` só tem a URL e o dicionário. Note que nos dois casos o cabeçalho usado é da classe `HttpHeaders` (no plural).

## Carregando os dados do perfil
O foco do código desta aula é apenas recuperar os dados de perfil e colocá-los no formulário.

```HTML
<!-- frontend\src\app\pages\perfil\perfil.component.html -->
<!-- Resto do código -->
<app-form-base
  [titulo]="titulo + nome"
  ...
/>
```

```TypeScript
// frontend\src\app\pages\perfil\perfil.component.ts

import { TokenService } from './../../core/services/token.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

// Resto do código
export class PerfilComponent implements OnInit {
  // Resto do código

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
      cadastro => { // Lembre-se: cadastro é uma PessoaUsuaria.
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
  // Resto do código
}
```
> Basicamente ocorre o seguinte: 
> 1. Declaramos uma `PessoaUsuaria` batizada de `cadastro` na página `PerfilComponent`;
> 2. Usamos o `TokenService` para buscar o token que será usado ao buscar a `PessoaUsuaria`;
> 3. Usamos o `CadastroService` para buscar a `PessoaUsuaria` e carregar o formulário com seus dados;
> 4. Usamos o `FormularioService` para buscar o formulário de cadastro chamado `form`, e preenchemos esse form com os dados da `PessoaUsuaria` batizada de `cadastro` e recuperada pelo `CadastroService`.

Na próxima aula vamos atualizar o perfil.

## Editando o perfil
```TypeScript
import { UserService } from './../../core/services/user.service';
import { Router } from '@angular/router';
// Resto do código

export class PerfilComponent implements OnInit {
  // Resto do código
  form! : FormGroup<any> | null

constructor(
    // Resto do código
    private router: Router,
    private userService: UserService,
  ) {}

  // Resto do código
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

    this.cadastroService.editarCadastro(this.token, dadosAtualizados).subscribe({
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
```
O método `deslogar` é o mais fácil de explicar: depois que injetamos os serviços, `UserService` é usado para fazer o logout e `Router` é usado para redirecionar o navegador para a tela de login. 

Já o método `atualizar` recupera os dados de todos os campos do formulário (um `FormGroup` chamado `form`) e os submete para o método `CadastroService.editarCadastro`, que retorna um `Observable`. Se o carregamento for bem sucedido, ele emite um alerta e redireciona o navegador para a raiz da aplicação.

# Interceptor e guarda de rotas
## Interceptando requisições
Vamos criar um Interceptor com a Angular CLI para modificar as requisições HTTP da aplicação:

```bash
ng g interceptor core/interceptors/autenticacao --skip-tests
# Output
CREATE src/app/core/interceptors/autenticacao.interceptor.ts (417 bytes)
```

E vamos também provê-la em `app.module.ts`:
```TypeScript
// frontend\src\app\app.module.ts

// Resto do código
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AutenticacaoInterceptor } from './core/interceptors/autenticacao.interceptor';
@NgModule({
  // Resto do código
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AutenticacaoInterceptor,
    multi: true, // Com multi = true, pode-se usar mais interceptors.
  }],
  // Resto do código
})
```

A implementação do Interceptor é esta: 
```TypeScript
// frontend\src\app\core\interceptors\autenticacao.interceptor.ts
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokenService.possuiToken()) {
      const token = this.tokenService.retornarToken()

      // Vamos clonar a requisição original e incluir o token
      // no cabeçalho da requisição clonada.
      request = request.clone({
        setHeaders: {
          'Authorization' : `Bearer ${token}`,
        }
      })
    }
    return next.handle(request);
  }
}
```

Finalmente, poderemos simplificar a assinatura dos métodos que dependem do uso do token de autenticação:
```TypeScript
// frontend\src\app\core\services\cadastro.service.ts
// Resto do código
export class CadastroService {
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
  ) { }

  // Resto do código

  // Antes
  // buscarCadastro(token: string): Observable<PessoaUsuaria> {
  //   const header = new HttpHeaders({
  //     'Authorization' : `Bearer ${token}`,
  //     {headers : header },
  //   })
  // }
  // Depois
  buscarCadastro(): Observable<PessoaUsuaria> {
    return this.http.get<PessoaUsuaria>(
      `${this.apiUrl}/auth/perfil`,
    )
  }
  
  // Antes
  // editarCadastro(token: string, pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
  //   const header = new HttpHeaders({
  //     'Authorization' : `Bearer ${token}`,
  //     pessoaUsuaria,
  //     {headers : header },
  //   })
  // }
  // Depois
  editarCadastro(pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    return this.http.patch<PessoaUsuaria>(
      `${this.apiUrl}/auth/perfil`,
      pessoaUsuaria,
    )
  }
}
```

```TypeScript
// frontend\src\app\pages\perfil\perfil.component.ts
// Resto do código
export class PerfilComponent implements OnInit {
  ngOnInit(): void {
    // Antes
    // this.token = this.tokenService.retornarToken()
    // this.cadastroService.buscarCadastro(this.token).subscribe(
    //   // Resto do código
    // )
    // Depois
    this.cadastroService.buscarCadastro().subscribe(
      // Resto do código
    )
  }

  atualizar () {
    const dadosAtualizados =  {
      // Resto do código
    }

    // Antes
    // this.cadastroService.editarCadastro(this.token, dadosAtualizados).subscribe({
    // Depois
    this.cadastroService.editarCadastro(dadosAtualizados).subscribe({
      // Resto do código
    })
  }
}
```

## Guarda de rota funcional
Vamos criar um guarda de rota funcional para impedir o acesso a rotas que dependem de o usuário estar logado:

```TypeScript
// frontend\src\app\core\guards\auth.guard.ts

import { inject } from "@angular/core"
import { UserService } from "../services/user.service"
import { Router } from "@angular/router"

export const authGuard = () => {
  const userService = inject(UserService)
  const router = inject(Router)

  if (userService.estaLogado()) {
    return true
  } else {
    router.navigate(['/login'])
    return false
  }
}
```
> Esse código foi escrito do zero. Não há como criá-lo a partir da Angular CLI.
> 
> Outra coisa: o método `UserService.estaLogado()` não estava retornando um booleano, daí foi necessário mudar esse código também: 
> ```TypeScript
> // frontend\src\app\core\services\user.service.ts
> 
> // Resto do código
> export class UserService {
>   // Resto do código
>   // Antes 
>   // estaLogado() {
>   //   this.tokenService.possuiToken()
>   // }
>   // Depois
>   estaLogado() : boolean {
>     return this.tokenService.possuiToken()
>   }
> }
> 
> ```

Mudança no código de `AppRoutingModule` para aplicar a restrição à rota:
```TypeScript
// frontend\src\app\app-routing.module.ts

import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Resto do código
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [ authGuard ],
  },
];
// Resto do código
```
> Note que a função `authGuard` não foi invocada no parâmetro `canActivate`, foi apenas referenciada.

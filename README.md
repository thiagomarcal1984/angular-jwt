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

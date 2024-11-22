import { PessoaUsuaria } from './../types/type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  buscarCadastro(token: string): Observable<PessoaUsuaria> {
    const header = new HttpHeaders({
      'Authorization' : `Bearer ${token}`,
    })
    return this.http.get<PessoaUsuaria>(
      `${this.apiUrl}/auth/perfil`,
      {headers : header },
    )
  }

  editarCadastro(token: string, pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    const header = new HttpHeaders({
      'Authorization' : `Bearer ${token}`,
    })
    return this.http.patch<PessoaUsuaria>(
      `${this.apiUrl}/auth/perfil`,
      pessoaUsuaria,
      {headers : header },
    )
  }
}

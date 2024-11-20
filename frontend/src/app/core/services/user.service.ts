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

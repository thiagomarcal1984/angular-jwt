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
    return localStorage.getItem(KEY) ?? ""
    // Retorna o token ou uma string vazia se o token não existir.
  }

  possuiToken() {
    // Duas exclamações seguidas converte o valor em booleano.
    return !!this.retornarToken()
  }
}

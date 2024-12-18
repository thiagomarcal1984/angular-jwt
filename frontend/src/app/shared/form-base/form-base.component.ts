import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UnidadeFederativa } from 'src/app/core/types/type';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit{
  cadastroForm!: FormGroup
  estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required)

  @Input() perfilComponent = false
  @Input() titulo: string = 'Crie sua conta'
  @Input() textoBotao: string = 'CADASTRAR'
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>()
  @Output() sair: EventEmitter<any> = new EventEmitter<any>()

  constructor (
    private formBuilder: FormBuilder,
    private formularioService: FormularioService,
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
      confirmarEmail: [
        null,
        [
          Validators.required,
          Validators.email,
          FormValidations.equalTo('email')
        ]
      ],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      confirmarSenha: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          FormValidations.equalTo('senha')
        ]
      ],
      aceitarTermos: [null, [Validators.requiredTrue]],
    })

    if (this.perfilComponent) {
      this.cadastroForm.get('aceitarTermos')?.setValidators(null)
    } else {
      this.cadastroForm.get('aceitarTermos')?.setValidators([Validators.requiredTrue])
    }
    this.cadastroForm.get('aceitarTermos')?.updateValueAndValidity()

    this.formularioService.setCadastro(this.cadastroForm)
  }

  executarAcao() {
    this.acaoClique.emit()
  }

  deslogar () {
    this.sair.emit()
  }
}

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UnidadeFederativa } from 'src/app/core/types/type';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit{
  cadastroForm!: FormGroup
  estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required)

  @Input() perfilComponent!: boolean
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>()

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
      confirmarEmail: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(3)]],
      aceitarTermos: [null, [Validators.requiredTrue]],
    })

    this.formularioService.setCadastro(this.cadastroForm)
  }

  executarAcao() {
    this.acaoClique.emit()
  }
}

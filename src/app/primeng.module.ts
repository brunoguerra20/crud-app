import { NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({

    exports: [
        ButtonModule,
        CheckboxModule,
        ConfirmDialogModule,
        InputTextareaModule
    ]

})
export class PrimeNGModule { }
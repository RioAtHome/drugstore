import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from 'src/app/core/services/rest.service';
import { ExtensionValidator } from '../../directive/extension-validator.directive';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent {
  selectedFile: any = null;
  error: string = '';
  startProgress = false;
  disableForm = false;

  console = console
  ALLOWED_EXT : string[] = ['csv'];
  fileForm = new FormGroup({
    file: new FormControl('', [Validators.required, ExtensionValidator(this.ALLOWED_EXT)])
  });
  fileName: string = '';
  formData = new FormData();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {component: string}, public dialogRef: MatDialogRef<UploadFileDialogComponent>, private restClient: RestService) { }

  onCancel(): void { 
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.error = '';
    this.startProgress = true;
    this.fileForm.disable
    console.log(this.data.component)
    if(this.data.component === 'customers'){
      this.importCustomers(this.formData);
      return
    }
    this.importDrugs(this.formData);
  }

  onFileChange(event: any){
      this.error = '';
      const file: File = event.target.files[0];

      if(file) {

        this.fileForm.patchValue({
          file: file?.name
        })
        this.formData.delete('file');
        this.formData.append('file', file);

      }
      this.fileForm.markAsTouched();
      this.fileName = file.name;
      this.console.log(this.fileForm);
    }



    importCustomers(data: FormData){
      this.restClient.importCustomers(data).subscribe(
        (res) => {this.dialogRef.close(true)}, (err) => {
          this.startProgress = false;
          this.error = "Check if Document have the correct format, ie(name, quantity, exp_date, drug_price)";
        })
    }

    importDrugs(data: FormData){
      this.restClient.importDrugs(data).subscribe(
        (res) => {this.dialogRef.close(true)}, (err) => {
          this.startProgress = false;
          this.error = "Check if Document have the correct format, ie(name, quantity, exp_date, drug_price)";
        })
    }

}

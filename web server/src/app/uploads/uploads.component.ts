import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { tokenUserI } from '../core/user/token-user-interface';
import { UploadsService } from  './uploads.service';

@Component({
  selector: 'sus-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  @Input() campaignId: number = 0
  @Input() goalId: number = 1

  @ViewChild("uploadFile", {static: false}) 
  uploadFile: ElementRef;

  uploadFileForm: FormGroup;
  description: string = ''
  files = [];  
  percentDone : number = 0
  count: number = 0
  user: tokenUserI

  constructor(
    private toastr: ToastrService,
    private uploadservice: UploadsService,
    private formBuilder: FormBuilder,
    private location: Location,
    ) {}

  ngOnInit() : void {
   
    this.uploadFileForm = this.formBuilder.group({
      description: ['', 
                      [
                        Validators.required,
                        Validators.maxLength(300)
                      ],
                   ],
    })
  }

  upload(file) {  
    this.description = this.uploadFileForm.get('description').value
    const formData = new FormData();  
    formData.append('campaignId', this.campaignId.toString());  
    formData.append('goalId', this.goalId.toString());  
    formData.append('description', this.description);  
    formData.append('file', file.data); 
    this.uploadservice.uploadFile(formData)
    .subscribe(
      (event: HttpEvent<any>) => {
        if(event.type == HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total)
        } else if (event.type == HttpEventType.Response) {
          this.count++
          this.toastr.success(`${file.data.name} upload completed.`)
        }
      },
        err => {
        console.log(err)
        this.percentDone = 0
        this.toastr.error(`${file.data.name} upload failed.`);
      })
  }

  Files() {  
    this.uploadFile.nativeElement.value = ''
    this.files.forEach(file => {  
      this.percentDone = 0
      this.upload(file)
    })
  }

  clearDescription() {
    this.files = []  
    this.percentDone = 0
    this.uploadFileForm.setValue({description: ''})
  }

  onClick() {  
    this.files = []  
    this.percentDone = 0
    const uploadFile = this.uploadFile.nativeElement;
    uploadFile.onchange = () => {  
      for (let index = 0; index < uploadFile.files.length; index++) {  
        const file = uploadFile.files[index];  
        if (file.size > 1048576 * 3) {
          this.toastr.error(file.name  + ' file size exceeds the allowable limit')
        } else if (file.name.length > 100) {
          this.toastr.error(file.name  + ' file name length exceeds the allowable limit')
        } else {
          this.files.push({ data: file});  
        }
      }  
      this.Files();  
    };  
    uploadFile.click();  
  }

 close(){
    this.location.back()
  }

}
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { IPost } from '../shared/post-viewer.interface';

@Component({
  selector: 'app-edit-post-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './edit-post-dialog.component.html',
  styleUrl: './edit-post-dialog.component.scss'
})
export class EditPostDialogComponent implements OnInit {
  editForm: FormGroup;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPost
  ) {
    this.editForm = this.fb.group({
      title: [data.title || ''],
      body: [data.body || '']
    });
    
    if (data.imageUrl) {
      this.imagePreview = data.imageUrl;
    }
  }

  ngOnInit(): void {
    // Ensure form values are set
    this.editForm.patchValue({
      title: this.data.title || '',
      body: this.data.body || ''
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onRemoveImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
  }

  onSave(): void {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('title', this.editForm.get('title')?.value);
      formData.append('body', this.editForm.get('body')?.value);
      
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.dialogRef.close(formData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

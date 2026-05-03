import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-post-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './add-post-dialog.component.html',
  styleUrl: './add-post-dialog.component.scss',
})
export class AddPostDialogComponent {
  title = '';
  body = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(public dialogRef: MatDialogRef<AddPostDialogComponent>) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onRemoveImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  onSubmit(): void {
    if (!this.title.trim() || !this.body.trim()) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('body', this.body);
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.dialogRef.close(formData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

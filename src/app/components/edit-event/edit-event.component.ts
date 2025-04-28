import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Categorie, Evenement } from '../../../models/evenement';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css',
})
export class EditEventComponent implements OnInit {
  @Input() isUpdate: boolean = false;
  @Input() event: Evenement = new Evenement();
  @Output() submitEvent = new EventEmitter<Evenement>();
  @Output() cancel = new EventEmitter<void>();
  @Output() uploadComplete = new EventEmitter<Evenement>();

  categories = Object.values(Categorie);
  isLoading: boolean = false;
  eventDate: string = '';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  previewUrl?: string;
  imageUrl: string | null = null;
  constructor(
    private fileUploadService: FileUploadService,
    @Inject('BaseURL') public baseUrl: string
  ) {}

  ngOnInit(): void {
    if (this.event.date) {
      const date = new Date(this.event.date);
      this.eventDate = date.toISOString().slice(0, 16);
    }
    if (!this.event.participants) {
      this.event.participants = [];
    }
  }

  ngOnChanges(): void {
    if (this.event.date) {
      const date = new Date(this.event.date);
      this.eventDate = date.toISOString().slice(0, 16);
    }
  }

  getCategoryLabel(category: Categorie): string {
    return category.toString();
  }
  
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          this.message = 'Please select an image file';
          return;
        }
        
        this.currentFile = file;
        this.message = '';
        
        // Create a preview of the selected image
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  
  upload(savedEvent: Evenement): void {
    this.progress = 0;
    this.message = '';
    
    if (this.currentFile && savedEvent.id) {
      this.fileUploadService.upload(this.currentFile, savedEvent.id).subscribe({
        next: (evt: any) => {
          if (evt.type === HttpEventType.UploadProgress && evt.total) {
            this.progress = Math.round(100 * evt.loaded / evt.total);
          } else if (evt instanceof HttpResponse) {
            this.message = 'File uploaded successfully';
            if (savedEvent.image) {
              this.imageUrl = this.fileUploadService.getImageUrl(savedEvent.image);
            }
            this.uploadComplete.emit(savedEvent);
          }
        },
        error: (err: any) => {
          console.error('Upload error:', err);
          this.progress = 0;
          this.message = err.error?.message || 
                        err.error?.error || 
                        'Could not upload the file. Please try again.';
          this.currentFile = undefined;
          this.uploadComplete.emit(savedEvent);
        }
      });
    } else {
      this.uploadComplete.emit(savedEvent);
    }
  }
  
  onSubmit() {
    if (this.eventDate) {
      this.event.date = new Date(this.eventDate);
    }

    // Ensure participants array is initialized
    if (!this.event.participants) {
      this.event.participants = [];
    }

    this.isLoading = true;
    this.submitEvent.emit(this.event);
  }

  onCancel() {
    this.cancel.emit();
  }

  resetForm(): void {
    this.event = new Evenement();
    this.eventDate = '';
    this.currentFile = undefined;
    this.previewUrl = undefined;
    this.progress = 0;
    this.message = '';
  }
}
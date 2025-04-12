import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
})
export class AddEventModalComponent implements OnInit {
  eventForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      maxParticipants: [null, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      cover: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.eventForm.patchValue({ cover: file });

      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = new FormData();
      Object.entries(this.eventForm.value).forEach(([key, value]) =>
        formData.append(key, value as string | Blob)
      );
      console.log('Form data ready to be submitted:', this.eventForm.value);
      this.activeModal.close(this.eventForm.value);
    }
  }
}

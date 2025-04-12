
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, Event } from '../../services/event.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParticipateModalComponent } from '../participate-modal/participate-modal.component';
import { AddEventModalComponent } from '../add-event-modal/add-event-modal.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event: Event | undefined;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(id).subscribe(event => {
      this.event = event;
    });
  }

  openParticipateModal(): void {
    const modalRef = this.modalService.open(ParticipateModalComponent);
    modalRef.componentInstance.eventName = this.event?.name;
  }

  openEventModal(): void {
    const modalRef = this.modalService.open(AddEventModalComponent);
    modalRef.componentInstance.eventName = this.event?.name;
  }
}
import {Component, Input, Output, EventEmitter} from '@angular/core'


@Component({
  selector: "pm-star",
  templateUrl: "./star.component.html",
  styleUrls: ["./star.component.css"]
})

export class StarComponent {
  starWidth: number;
  @Input() rating: number;

  @Output() ratingClicked: EventEmitter<string>=
    new EventEmitter<string>();

  onClick() {
    this.ratingClicked.emit('clicked');
  }

  ngOnChanges(): void {
    this.starWidth = this.rating * 75 / 5;
  }
}

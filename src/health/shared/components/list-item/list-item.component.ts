import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['list-item.component.scss'],
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute()">
        <p class="list-item__name">{{item.name}}</p>
        <p class="list-item__ingredients">
          <span>{{item.ingredients}}</span>
        </p>
      </a>

      <div class="list-item__delete" *ngIf="toggled">
        <p>Delete item?</p>
        <button class="confirm" type="button" (click)="removeItem()">Yes</button>
        <button class="cancel" type="button" (click)="toggle()">No</button>
      </div>

      <button class="trash" type="button" (click)="toggle()">
        <img src="/img/remove.svg">
      </button>
    </div>
  `
})
export class ListItemComponent implements OnInit {
  @Input() item: any;
  @Output() remove = new EventEmitter<any>();

  toggled = false;

  constructor() {}

  ngOnInit() {}

  getRoute() {
    return [`../meals`, this.item.key];
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}

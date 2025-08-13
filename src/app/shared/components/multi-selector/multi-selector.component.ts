import { Component, Input } from '@angular/core';
import { MultiSelectorDTO } from './multi-selector-model';

@Component({
  selector: 'app-multi-selector',
  imports: [],
  templateUrl: './multi-selector.component.html',
  styleUrl: './multi-selector.component.css'
})
export class MultiSelectorComponent {
  @Input({ required: true })
  selected!  : MultiSelectorDTO[];

  @Input({ required: true })
  noSelected!: MultiSelectorDTO[];

  select(element: MultiSelectorDTO, index: number) {
    this.selected.push(element);
    this.noSelected.splice(index, 1);
  }

  unSelect(element: MultiSelectorDTO, index: number) {
    this.noSelected.push(element);
    this.selected.splice(index, 1);
  }

  selectAll() {
    this.selected.push(...this.noSelected);
    this.noSelected.length = 0;
  }

  unSelectAll() {
    this.noSelected.push(...this.selected);
    this.selected.length = 0;
  }
}

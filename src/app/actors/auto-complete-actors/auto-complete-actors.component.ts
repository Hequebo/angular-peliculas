import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ActorAutoCompleteDTO } from '../models/actor';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-auto-complete-actors',
  imports: [
    MatAutocompleteModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatIconModule, 
    FormsModule, 
    MatTableModule, 
    MatInputModule,
    DragDropModule
  ],
  templateUrl: './auto-complete-actors.component.html',
  styleUrl: './auto-complete-actors.component.css'
})
export class AutoCompleteActorsComponent implements OnInit {
  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => {
      if (typeof value === 'string' && value) {
        this.#actorsService.getByName(value).subscribe(actors => {
          this.actors = actors;
        });
      }
    });
  } 

  #actorsService = inject(ActorsService);
  control = new FormControl();

  actors: ActorAutoCompleteDTO[] = [];

  @Input({ required: true })
  selectedActors: ActorAutoCompleteDTO[] = [];

  columnsToShow = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table!: MatTable<ActorAutoCompleteDTO>;

  actorSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedActors.push(event.option.value);
    this.control.patchValue('');

    if (this.table != undefined)
      this.table.renderRows();
  }

  finishDrag(event: CdkDragDrop<any[]>) {
    const previousIndex = this.selectedActors.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex);
    this.table.renderRows();

  }

  remove(actor: ActorAutoCompleteDTO) {
    const index = this.selectedActors.findIndex((a: ActorAutoCompleteDTO) => a.id === actor.id);
    this.selectedActors.splice(index, 1);
    this.table.renderRows();
  }
}

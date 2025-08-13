import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { toBase64 } from '../../functions/to-base-64';

@Component({
  selector: 'app-input-img',
  imports: [MatButtonModule],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css'
})
export class InputImgComponent {
  @Input({ required: true})
  title!: string;

  @Input()
  currentImageURL?: string;

  @Output()
    selectedFile = new EventEmitter<File>();

  base64Image?: string;

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      toBase64(file).then((value: string) => 
        this.base64Image = value
      ).catch(error => 
        console.log(error)
      );

      this.selectedFile.emit(file); 
      this.currentImageURL = undefined;
    }
    
  }
}

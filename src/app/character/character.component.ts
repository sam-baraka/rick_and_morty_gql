import { Component, Input } from '@angular/core';
// Import the Character interface from the service
import { Character } from '../rick-and-morty-service.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent {
  @Input()
  character!: Character;
}

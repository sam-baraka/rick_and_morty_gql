import { Component, inject, OnInit } from '@angular/core';
import { Character, RickAndMortyServiceService } from '../rick-and-morty-service.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})

export class CharacterListComponent implements OnInit {
  // Declare properties to store the characters, loading and error states
  characters: Character[] | null = null;
  loading = false;
  error = '';

  // Inject the service in the constructor
  constructor(private service: RickAndMortyServiceService) {}

  // Define a method to get all characters from the service
  async getCharacters() {
    // Set the loading state to true and reset the error state
    this.loading = true;
    this.error = '';
    try {
      // Use the service method to get all characters and assign them to the property
      this.characters = await this.service.getCharacters();
    } catch (err) {
      // Handle any errors and assign them to the error property
      this.error ='Something went wrong';
    } finally {
      // Set the loading state to false
      this.loading = false;
    }
  }

  // Implement the ngOnInit method to call the getCharacters method when the component is initialized
  ngOnInit() {
    this.getCharacters();
  }
}
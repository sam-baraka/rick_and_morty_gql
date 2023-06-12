// Import Injectable decorator and HttpClient module from Angular core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

// Define the GraphQL endpoint
const endpoint = 'https://rickandmortyapi.com/graphql';

// Define the interface for a character object
interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}

// Define the interface for a characters query response
interface CharactersResponse {
  data: {
    characters: {
      results: Character[];
    };
  };
}

// Define the interface for a character query response
interface CharacterResponse {
  data: {
    character: Character;
  };
}

// Use the Injectable decorator to make the service injectable
@Injectable({
  providedIn: 'root',
})
// Define the class for the service
export class RickAndMortyServiceService {
  // Inject the HttpClient module in the constructor
  constructor(private http: HttpClient) {}

// Define a method to get all characters
getCharacters(): Promise<Character[]> {
  // Define the query string
  const query = `
    query {
      characters {
        results {
          id
          name
          status
          species
          image
        }
      }
    }
  `;
  // Send a POST request with the query and get the response as a promise
  return firstValueFrom(this.http.post<CharactersResponse>(endpoint, { query }))
    .then((response) => {
      // Return the characters array from the response data
      return (response ?? { data: { characters: { results: [] } } }).data.characters.results;
    });
}


  // Define a method to get a character by ID
  getCharacter(id: string): Promise<Character> {
    // Define the query string with a variable
    const query = `
      query ($id: ID!) {
        character(id: $id) {
          id
          name
          status
          species
          image
        }
      }
    `;
    // Define the variables object with the id
    const variables = { id };
    // Send a POST request with the query and variables and get the response as a promise
    return firstValueFrom(this.http.post<CharacterResponse>(endpoint, { query, variables }))
    .then((response) => {
      // Return the character object from the response data
      return (response as CharacterResponse).data.character;
    });
  }

}

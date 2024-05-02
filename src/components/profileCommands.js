export const FETCH_PROFILE = 'FETCH_PROFILE';

export class FetchProfileCommand {
  execute() {
    return fetch('/api/profile').then(response => response.json());
  }
}

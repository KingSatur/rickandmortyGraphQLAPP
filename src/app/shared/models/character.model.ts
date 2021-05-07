export class Character {
  name?: any;
  id?: any;
  status?: any;
  species?: any;
  gender?: any;
  origin?: any;
  location?: any;
  image?: any;
  isFavorite?: boolean;

  static fromJSON(data = {}): Character {
    let character = new Character();
    Object.keys(data).forEach((m) => {
      character[m] = data?.[m];
    });

    return character;
  }
}

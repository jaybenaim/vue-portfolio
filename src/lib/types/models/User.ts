export interface IUser {
  name: string
  email: string
  image: string
  username?: string
}

export class User {
  name: string

  email: string

  image: string

  username?: string

  constructor(user: IUser) {
    this.name = user.name
    this.email = user.email
    this.image = user.image
    this.username = user.username ? user.username : user.name
  }

  isLoggedIn() {

  }
}

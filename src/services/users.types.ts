export type User = {
  id: string,
  gender: "male" | "female"
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  birthdate: string,
  city: string,
  country: string,
  photo?: string
}

export type APIError = {
  error: 1,
  message: string
}
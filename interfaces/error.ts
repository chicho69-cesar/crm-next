export interface GqlError {
  message:    string
  locations:  Location[]
  path:       string[]
  extensions: Extensions
}

export interface Extensions {
  code:       string
  stacktrace: string[]
}

export interface Location {
  line:   number
  column: number
}

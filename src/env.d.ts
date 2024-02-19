/// <reference types="astro/client" />

declare namespace App {

  interface Locals {
    user: {
      id: string
      name: string | null
      email: string
      createdAt: Date
      updatedAt: Date
    } | null
    session: import('@auth/core/types').Session | null
  }
}

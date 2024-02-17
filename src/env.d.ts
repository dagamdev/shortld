/// <reference types="astro/client" />

declare namespace App {

  interface Locals {
    title: string
    session: import('@auth/core/types').Session | null
  }
}

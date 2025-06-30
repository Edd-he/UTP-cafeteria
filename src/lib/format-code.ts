export function extractAdminCode(correo: string): string | null {
  const match = correo.match(/^([Aa]\d{8})@.*utp\.edu\.pe$/i)
  return match ? match[1] : null
}

export function extractStudentCode(correo: string): string | null {
  const match = correo.match(/^([Uu]\d{8})@.*utp\.edu\.pe$/i)
  return match ? match[1] : null
}

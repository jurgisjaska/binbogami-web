import { jwtDecode } from "jwt-decode";

const storageName = "binbogami_token";

export const token = () => {
  const local = localStorage.getItem(storageName)
  if (local) {
    try {
      return jwtDecode(local)
    } catch (e) {
      console.error(e)
      return null
    }
  }
  return null
}

export const persist = (t) => {
  localStorage.setItem(storageName, t)
}
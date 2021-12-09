export const $urlToBase64 = (file: File) => {
  const url: Promise<string|ArrayBuffer|null> | ProgressEvent<FileReader> = new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

  return url
}

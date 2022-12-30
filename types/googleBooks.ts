interface ImagesLinks {
  smallThumbnail: string
  thumbnail: string
}

interface VolumeInfo {
  title: string
  authors: string[]
  imageLinks: ImagesLinks
  infoLink: string
  description: string
}

export interface BookItem {
  id: string
  volumeInfo: VolumeInfo
}

export interface GoogleBooks {
  kind: string
  totalItems: number
  items: BookItem[]
}

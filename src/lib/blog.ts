export type BlogCategory = 'AI vijesti' | 'Analiza'

export type BlogPost = {
  id: number
  slug: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  publishedOn: string
  publishedTime?: string
  category: BlogCategory
  author: string
  avatarUrl: string
  readTime: number
  featured: boolean
}

type PostDateSource = Pick<BlogPost, 'publishedOn' | 'publishedTime'>
type SortablePost = Pick<BlogPost, 'id' | 'publishedOn' | 'publishedTime'>

const DEFAULT_MACHINE_TIME = '08:00'

const padTime = (value: number) => String(value).padStart(2, '0')

const parseDateParts = ({ publishedOn, publishedTime }: PostDateSource) => {
  const [year, month, day] = publishedOn.split('-').map(Number)
  const [hour, minute] = (publishedTime ?? DEFAULT_MACHINE_TIME).split(':').map(Number)

  return { year, month, day, hour, minute }
}

export const getPostMachineDate = (post: PostDateSource) => {
  const { year, month, day, hour, minute } = parseDateParts(post)

  return new Date(Date.UTC(year, month - 1, day, hour, minute))
}

export const getPostIsoDateTime = (post: PostDateSource) => getPostMachineDate(post).toISOString()

export const getPostRssDate = (post: PostDateSource) => getPostMachineDate(post).toUTCString()

export const formatDisplayDate = (publishedOn: string) => {
  const [year, month, day] = publishedOn.split('-').map(Number)

  return `${day}.${month}.${year}.`
}

export const formatDisplayTime = (publishedTime?: string) => {
  if (!publishedTime) {
    return null
  }

  const [hour, minute] = publishedTime.split(':').map(Number)

  return `${padTime(hour)}:${padTime(minute)}`
}

export const formatPostDisplayDate = (post: PostDateSource) => formatDisplayDate(post.publishedOn)

export const formatPostDisplayDateTime = (post: PostDateSource) => {
  const displayDate = formatPostDisplayDate(post)
  const displayTime = formatDisplayTime(post.publishedTime)

  return displayTime ? `${displayDate} u ${displayTime}` : displayDate
}

export const comparePostsByPublishedAt = (left: SortablePost, right: SortablePost) => {
  const timestampDelta = getPostMachineDate(right).getTime() - getPostMachineDate(left).getTime()

  if (timestampDelta !== 0) {
    return timestampDelta
  }

  return right.id - left.id
}

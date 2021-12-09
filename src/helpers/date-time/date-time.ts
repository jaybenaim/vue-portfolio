import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

export const $formatDate = (date: Date, format = 'MMMM Do'): string => dayjs(date).format(format)

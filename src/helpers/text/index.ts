export const shortenText = ''

/**
 *
 * @param text
 * @param length
 */
export const $truncate = (text: string, length: number) => `${text.substring(0, length)}...`

/**
 * Wraps content in a tag
 *
 * @param type
 * @param text
 * @param classNames
 * @returns
 */
export const $createTag = (type: TTagType, text: string, className?: string) => `<${type} class="${className}">${
       text
       }</${type}>`

type TTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span' | 'em'

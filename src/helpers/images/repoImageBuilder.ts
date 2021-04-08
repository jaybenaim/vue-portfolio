import { IImage } from '@/lib/types'

export const $imageBuilder = (name: string, lang?: string, filter?: string) => {
  const images = {
    all: {
      src: 'https://cdn.pixabay.com/photo/2020/03/06/08/17/graduation-hats-4906360_1280.png',
    },
    bitmaker: {
      src: 'https://cdn.pixabay.com/photo/2020/03/06/08/17/graduation-hats-4906360_1280.png',
    },
    bit: {
      src: 'https://cdn.pixabay.com/photo/2020/03/06/08/17/graduation-hats-4906360_1280.png',
    },
    wdi: {
      src: 'https://cdn.pixabay.com/photo/2020/03/06/08/17/graduation-hats-4906360_1280.png',
    },
    angular: {
      src: 'https://img.icons8.com/color/96/000000/angularjs.png',
    },
    tour: {
      src: 'https://img.icons8.com/color/96/000000/angularjs.png',
    },
    react: {
      src: 'https://seeklogo.com/vector-logo/273845/react',
    },
    yelp: {
      src: 'https://img.icons8.com/color/96/000000/javascript.png',
    },
    game: {
      src: 'https://cdn.pixabay.com/photo/2013/07/13/12/38/dices-160005_1280.png',
    },
    tic: {
      src: 'https://cdn.pixabay.com/photo/2013/07/13/12/38/dices-160005_1280.png',
    },
    python: {
      src: 'https://img.icons8.com/color/96/000000/python.png',
    },
    django: {
      src: 'https://img.icons8.com/color/96/000000/python.png',
    },
    free: {
      src: 'https://icons8.com/icons/set/free-code-camp',
    },
    boot: {
      src: 'https://img.icons8.com/color/96/000000/bootstrap.png',
    },
    shop: {
      src: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/shopping-cart-152462_1280.png',
    },
    sell: {
      src: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/shopping-cart-152462_1280.png',
    },
    cookies: {
      src: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/shopping-cart-152462_1280.png',
    },
    store: {
      src: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/shopping-cart-152462_1280.png',
    },
    job: {
      src:
      // eslint-disable-next-line max-len
        'https://cdn.pixabay.com/photo/2018/03/05/16/41/graph-3201151_1280.png',
    },
    backend: {
      src:
      // eslint-disable-next-line max-len
        'https://cdn.pixabay.com/photo/2018/03/05/16/41/graph-3201151_1280.png',
    },
    api: {
      src: 'https://cdn.pixabay.com/photo/2018/03/05/16/41/graph-3201151_1280.png',
    },
    restful: {
      src: 'https://cdn.pixabay.com/photo/2018/03/05/16/41/graph-3201151_1280.png',
    },
    ruby: {
      src:
      // eslint-disable-next-line max-len
        'https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=160777',
    },
    rails: {
      src:
      // eslint-disable-next-line max-len
        'https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=160777',
    },
    java: {
      src: 'https://img.icons8.com/color/96/000000/javascript.png',
    },
    javascript: {
      src: 'https://img.icons8.com/color/96/000000/javascript.png',
    },
    css: {
      src: 'https://img.icons8.com/color/96/000000/css-filetype.png'
    }
  }

  const imageKeys = Object.keys(images)

  const image = imageKeys.filter((key) => {
    lang = lang && lang.toLowerCase()

    return name.toLowerCase().includes(key) || (lang && lang.includes(key) && key)
  })

  const key = image[0]

  const matchedImage = images[key as IImageType] || images[filter as IImageType]

  console.log(name, matchedImage)

  if (!matchedImage) {
    return {
      // Place holder or random image
      src: 'https://cdn.pixabay.com/photo/2017/05/12/15/16/hexagon-2307350_1280.png'
    } as IImage
  }

  return matchedImage as IImage
}

type IImageType =
    'all'|
    'bitmaker'|
    'bit'|
    'wdi'|
    'angular'|
    'tour'|
    'react'|
    'yelp'|
    'tic'|
    'python'|
    'django'|
    'free'|
    'boot'|
    'shop'|
    'sell'|
    'cookies'|
    'store'|
    'job'|
    'backend'|
    'api'|
    'restful'|
    'ruby'|
    'rails'|
    'java'|
    'javascript'

import { IFilter } from '@/lib/types/general/FilterList'

export default [
  {
    name: 'All',
    label: 'All',
    icon: ''
  },
  {
    name: 'Favourites',
    label: 'Favourites',
    icon: 'heart-outline'
  },
  {
    name: 'Deployed',
    label: 'Deployed',
    icon: 'rocket-launch-outline'
  },
  {
    name: 'Languages',
    label: 'Languages',
    icon: 'arrow-down',
    filterType: 'select',
    filters: [
      {
        name: 'JavaScript',
        label: 'JavaScript',
        icon: 'language-javascript'
      },
      {
        name: 'Python',
        label: 'Python',
        icon: 'language-python'
      },
      {
        name: 'Ruby',
        label: 'Ruby',
        icon: 'language-ruby'
      }
    ] as IFilter[]
  }
] as IFilter[]

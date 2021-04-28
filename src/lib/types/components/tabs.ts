export interface ITabProps {
  vertical?: boolean
  expanded?: boolean
  animated?: boolean
  destroyOnHide?: boolean
  size?: 'is-small' | 'is-medium' | 'is-large'
  type: 'is-boxed' | 'is-toggle-rounded'
  multiline: boolean
}

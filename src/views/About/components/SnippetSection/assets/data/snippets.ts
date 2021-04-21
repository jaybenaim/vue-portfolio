import { $createTag } from '@/helpers/text'
import { ISnippetItem } from '@/lib/types'

export const $snippets: ISnippetItem[] = [
  {
    image: {
      src: ''
    },
    title: 'My Favourite ZSH Aliases',
    content:
      // Heading
      `${`${$createTag('h5', 'Clean up old branches that have been merged. (Options: BranchName)', 'alias-heading mt-5')}`

      // Snippet
      + `${$createTag('div',
        // Alias Keyword
        `${$createTag('span', 'alias', 'alias')}`
        // Alias Name
        + `${$createTag('span', 'cleanGit', 'alias-name')}`
        // Alias Text
        + `${$createTag('span',
            '="git branch --merged '
            // Alias option
            + `${$createTag('span', 'master', 'alias-option')}`
            + ' | grep -v "\\*'
            // Alias Option
            + `${$createTag('span', 'master', 'alias-option')}`
            + '" |   xargs -n 1 git branch -d"',
            // Alias Class Name
            'alias-text')}`,
      // Alias Container Class
        'alias-snippet')}`

      // End
      + '<br />'
      // End

      // Heading
      + `${$createTag('h5', 'Remove old <em>node_modules</em> folders from >daysBack. (Options: FilePath, daysBack)', 'alias-heading mt-6')}`}
      ${
      // Snippet container
        $createTag('div',
      // Alias Keyword
        $createTag('span', 'alias', 'alias')
        // Alias Name
        + $createTag('span', 'cleanNodeMods', 'alias-name')
        // Alias Text
        + $createTag('span', `="cd ${
        // Alias Option
          $createTag('span', '~/projects', 'alias-option')
          }; find . -name "node_modules" -type d -mtime +${
        // Alias Option
          $createTag('span', '150', 'alias-option')
          } | xargs rm -rf"`,
        // Alias Class Name
        'alias-text'),
      'alias-snippet')}`
  },
]

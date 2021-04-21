import { $createTag } from '@/helpers/text'
import { ISnippetItem } from '@/lib/types'

export const $snippets: ISnippetItem[] = [
  {
    title: 'My Favourite ZSH Aliases',
    content:
      // Heading
      `${`${`${$createTag('h5', 'Clean up old branches that have been merged. (Options: BranchName)', 'alias-heading mt-5')}`

      // Snippet Container
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
      + `${$createTag('h5', 'Remove old <em>node_modules</em> folders from >DaysBack. (Options: FilePath, daysBack)', 'alias-heading mt-2')}`}
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

      // End
      + '<br />'}${
      // End

      // Alias Heading
       $createTag('h5', 'Create space by cleaning up <em>Disk Utilities</em>', 'alias-heading mt-2')}${

      // Snippet Container
      $createTag('div',
        // Alias Keyword
        $createTag('span', 'alias', 'alias')
        // Alias Name
        + $createTag('span', 'getSpace', 'alias-name')
        // Alias Text
        + $createTag('span', '="/usr/sbin/diskutil info / | grep \'Free Space\'"',
          'alias-text'),
      'alias-snippet')}`
  },
  {
    title: 'My Favourite ZSH Aliases <em>...Continued</em>',
    content:
      // Alias Heading
      `${$createTag('h5', 'Open github from the current repository.', 'alias-heading mt-2')}${

      // Snippet Container
      $createTag('div',
        // Alias Keyword
        $createTag('span', 'alias', 'alias')
        // Alias Name
        + $createTag('span', 'go', 'alias-name')
        // Alias Text
        + $createTag('span', '="git-open"',
          'alias-text'),
      'alias-snippet')}`

      // End
      + '<br />'
      // End

      // Alias Heading
      + `${$createTag('h5',
       'Init Git, Set up Repo on Github and push to master with a README file.'
        // Link to Hub
        + '<a href="https://hub.github.com/" target="_blank"><em> (Requires Hub)</em></a>',
      'alias-heading mt-2')}${

      // Snippet Container
      $createTag('div',
        // Alias Keyword
        $createTag('span', 'alias', 'alias')
        // Alias Name
        + $createTag('span', 'icp', 'alias-name')
        // Alias Text
        + $createTag('span',
        '="hub init -g; git add -A; touch README.md; git add -A; git commit -m \'initial commit\'; hub create; go;"',
          'alias-text'),
      'alias-snippet')}`

      // End
      + '<br />'
      // End

      // Alias Heading
      + `${$createTag('h5',
       'Open ZSH in Visual Studio Code to add more great Aliases',
        // Link to Hub
      'alias-heading mt-2')}${

      // Snippet Container
      $createTag('div',
        // Alias Keyword
        $createTag('span', 'alias', 'alias')
        // Alias Name
        + $createTag('span', 'oz', 'alias-name')
        // Alias Text
        + $createTag('span',
        '="code ~/.zshrc"',
          'alias-text'),
      'alias-snippet')}`
  },
]

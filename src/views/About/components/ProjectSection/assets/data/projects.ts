import { IProject } from '@/lib/types/models/Project'
import cookiesnyum from '@images/cookienyum.png'
import highlyHandy from '@images/highly-handy.png'
import hackerhunter from '@images/hackerhunter.png'
import kinsale from '@images/kinsale.png'

export const $projects: IProject[] = [
  {
    title: 'Cookies & Yum',
    description: 'E-commerce site, with SendGrid Api for email checkout. <br />'
    + '<em>(Name changed and branding removed to protect owners identity)</em>',
    image: {
      src: cookiesnyum
    },
    link: 'https://jaybenaim.github.io/cookiesnyum/'
  },
  {
    title: 'Highly Handy Home Services',
    description: 'Home Service website with admin, booking and payment capabilities',
    image: {
      src: highlyHandy
    },
    link: 'https://highlyhandy.com/#/'
  },
  {
    title: 'Real Estate Landing Page',
    description: 'Made with Bootstrap',
    image: {
      src: kinsale
    },
    link: 'https://kinsaleroad.ca/'
  },
  {
    title: 'Hacker Hunter',
    // eslint-disable-next-line max-len
    description: 'Job Scraper where a user can compile a list of jobs from multiple job platforms, and perform real-time search\'s from a list of platforms.',
    image: {
      src: hackerhunter
    },
    link: 'https://job-finder-web-scraper.herokuapp.com/'
  }
]

import { IProject } from '@/lib/types/models/Project'

export const $projects: IProject[] = [
  {
    title: 'Highly Handy Home Services',
    description: 'Home Service website with admin, booking and payment capabilities',
    image: {
      src: 'https://jacobbenaim.ca/img/highly-handy.jpg'
    },
    link: 'https://highlyhandy.com/#/'
  },
  {
    title: 'Cookies & Yum',
    description: 'E-commerce site, with SendGrid Api for email checkout. <br />'
    + '<em>(Name changed and branding removed to protect owners identity)</em>',
    image: {
      src: 'https://jacobbenaim.ca/img/cookiesnyum.jpg'
    },
    link: 'https://jaybenaim.github.io/cookiesnyum/'
  },
  {
    title: 'Real Estate Landing Page',
    description: 'Made with Bootstrap',
    image: {
      src: 'https://jacobbenaim.ca/img/kinsale.JPG'
    },
    link: 'https://kinsaleroad.ca/'
  },
  {
    title: 'Hacker Hunter',
    // eslint-disable-next-line max-len
    description: 'Job Scraper where a user can compile a list of jobs from multiple job platforms, and perform real-time search\'s from a list of platforms.',
    image: {
      src: 'https://jacobbenaim.ca/img/hacker-hunter.jpg'
    },
    link: 'https://job-finder-web-scraper.herokuapp.com/'
  }
]

import ExpandingCards from './50Dir/ExpandingCards'
import ProgressStep from './50Dir/ProgressStep'
import RotateNavigation from './50Dir/RotateNavigation'
import Home from './Home'

export const FiftyPath = {
  Home: '',
  Day1: 'expanding-cards',
  Day2: 'progress-steps',
  Day3: 'rotate-navigation',
}

export default [
  {
    path: FiftyPath.Day1,
    component: ExpandingCards,
  },
  {
    path: FiftyPath.Day2,
    component: ProgressStep,
  },
  {
    path: FiftyPath.Day3,
    component: RotateNavigation,
  },
  { path: FiftyPath.Home, component: Home },
]

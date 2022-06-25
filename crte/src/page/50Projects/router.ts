import Home from './Home'
import ExpandingCards from './50Dir/ExpandingCards'
import ProgressStep from './50Dir/ProgressStep'
import RotateNavigation from './50Dir/RotateNavigation'
import HiddenSearch from './50Dir/HiddenSearch'
import BlurryLoading from './50Dir/BlurryLoading'

export const FiftyPath = {
  Home: '',
  Day1: 'expanding-cards',
  Day2: 'progress-steps',
  Day3: 'rotate-navigation',
  Day4: 'hidden-search',
  Day5: 'blurry-loading',
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
  {
    path: FiftyPath.Day4,
    component: HiddenSearch,
  },
  {
    path: FiftyPath.Day5,
    component: BlurryLoading,
  },
  { path: FiftyPath.Home, component: Home },
]

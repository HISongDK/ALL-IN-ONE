import Home from './Home'
import ExpandingCards from './50Dir/ExpandingCards'
import ProgressStep from './50Dir/ProgressStep'
import RotateNavigation from './50Dir/RotateNavigation'
import HiddenSearch from './50Dir/HiddenSearch'
import BlurryLoading from './50Dir/BlurryLoading'
import SplitLandingPage from './50Dir/SplitLandingPage'
import ScrollAnimation from './50Dir/ScrollAnimation'
import FormWave from './50Dir/FormWave'
import SoundBoard from './50Dir/SoundBoard'

export const FiftyPath = {
  Home: '',
  Day1: 'expanding-cards',
  Day2: 'progress-steps',
  Day3: 'rotate-navigation',
  Day4: 'hidden-search',
  Day5: 'blurry-loading',
  Day6: 'scroll-animation',
  Day7: 'split-landing-page',
  Day8: 'form-wave',
  Day9: 'sound-board',
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
  {
    path: FiftyPath.Day6,
    component: ScrollAnimation,
  },
  {
    path: FiftyPath.Day7,
    component: SplitLandingPage,
  },
  {
    path: FiftyPath.Day8,
    component: FormWave,
  },
  {
    path: FiftyPath.Day9,
    component: SoundBoard,
  },
  { path: FiftyPath.Home, component: Home },
]

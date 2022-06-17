import ExpandingCards from './50Dir/ExpandingCards'
import ProgressStep from './50Dir/ProgressStep'

// eslint-disable-next-line no-shadow
enum FiftyPath {
  Day1 = 'expanding-cards',
  Day2 = 'progress-steps',
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
]

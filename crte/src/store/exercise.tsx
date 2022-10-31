import React, { useContext, useMemo, useReducer } from 'react'
import { useGetExerciseLogs } from '@api/hooks/exercise'
import { looseObj } from '@/constant'

interface IExerciseContextProps {}

const ExerciseContext = React.createContext<{
  data: any[]
  getLogs: (params: looseObj) => Promise<void>
  getLogsLoading: boolean
  update: any
  dispatchUpdate: () => void
}>({})

const ExerciseContextCom: React.FC<IExerciseContextProps> = ({ children }) => {
  const { getLogs, data = [], loading: getLogsLoading } = useGetExerciseLogs()

  const [update, dispatchUpdate] = useReducer(() => ({}), {})

  return (
    <ExerciseContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        getLogs,
        getLogsLoading,
        update,
        dispatchUpdate,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  )
}

export const useExerciseContext = () => {
  return useContext(ExerciseContext)
}

export default ExerciseContextCom

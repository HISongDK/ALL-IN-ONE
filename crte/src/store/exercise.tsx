import { looseObj } from '@/constant'
import { useGetExerciseLogs } from '@api/hooks/exercise'
import React, { useContext, useMemo, useReducer, createContext } from 'react'

interface IExerciseContext {
  data: any[]
  getLogs: (params: looseObj) => Promise<void>
  getLogsLoading: boolean
  update: any
  dispatchUpdate: () => void
}
const ExerciseContext = createContext<IExerciseContext>({} as IExerciseContext)

const ExerciseContextCom: React.FC = ({ children }) => {
  const { getLogs, data = [], loading: getLogsLoading } = useGetExerciseLogs()

  const [update, dispatchUpdate] = useReducer(() => ({}), {})

  const value = useMemo(
    () => ({
      data,
      getLogs,
      getLogsLoading,
      update,
      dispatchUpdate,
    }),
    [
      data,
      getLogs,
      getLogsLoading,
      update,
      // dispatchUpdate
    ],
  )

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  )
}

export default ExerciseContextCom

export const useExerciseContext = () => useContext(ExerciseContext)

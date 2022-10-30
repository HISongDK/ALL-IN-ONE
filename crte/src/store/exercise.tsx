import React, { useContext, useMemo } from 'react'
import { useGetExerciseLogs } from '@api/hooks/exercise'
import { looseObj } from '@/constant'

interface IExerciseContextProps {}

const ExerciseContext = React.createContext<{
  data: any[]
  getLogs: (params: looseObj) => Promise<void>
  getLogsLoading: boolean
}>({})

const ExerciseContextCom: React.FC<IExerciseContextProps> = ({ children }) => {
  const { getLogs, data = [], loading: getLogsLoading } = useGetExerciseLogs()
  return (
    <ExerciseContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        getLogs,
        getLogsLoading,
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

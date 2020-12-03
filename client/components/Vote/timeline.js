import React from 'react'
import { useDispatch } from 'react-redux'
import { setYear } from '../../redux/reducers/votesMap'
// import Percent from './percent'

const Dummy = (props) => {
  const dispatch = useDispatch()
  const { year } = props
  const classYear = (y) =>
    y === year ? 'text-gray-800 text-xs font-bold -ml-1' : 'text-gray-600 text-xs -ml-1 '
  const classBatton = (b) =>
    b === year
      ? 'absolute h-2 w-1 rounded-full border border-1 border-gray-700 bg-gray-600 hover:bg-gray-500 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-opacity-20'
      : 'absolute h-2 w-1 rounded-full border border-1 border-gray-700 bg-gray-100 hover:bg-gray-500 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-opacity-20'

  return (
    <div className="h-10 flex flex-col bg-gray-100 mx-2">
      <section className=" relative w-full h-8 ">
        <div className="absolute w-full h-1 bg-gray-500">&bsp;</div>
        <div className="w-full flex justify-items-center">
          <div className=" flex justify-center w-1/5 text-gray-500 timeline-article ">
            <button
              type="button"
              onClick={() => {
                dispatch(setYear('2000'))
              }}
              className={classBatton('2000')}
            >
              <div className="flex justify-center mt-2">
                <span className={classYear('2000')}>2000</span>
              </div>
            </button>
          </div>

          <div className="flex justify-center w-1/5 text-gray-500 timeline-article ">
            <button
              type="button"
              onClick={() => {
                dispatch(setYear('2004'))
              }}
              className={classBatton('2004')}
            >
              <div className="flex justify-center mt-2">
                <span className={classYear('2004')}>2004</span>
              </div>
            </button>
          </div>
          <div className="flex justify-center w-1/5 text-gray-500 timeline-article ">
            <button
              type="button"
              onClick={() => {
                dispatch(setYear('2008'))
              }}
              className={classBatton('2008')}
            >
              <div className="flex justify-center mt-2">
                <span className={classYear('2008')}>2008</span>
              </div>
            </button>
          </div>
          <div className="flex justify-center w-1/5 text-gray-500 timeline-article ">
            <button
              type="button"
              onClick={() => {
                dispatch(setYear('2012'))
              }}
              className={classBatton('2012')}
            >
              <div className="flex justify-center mt-2">
                <span className={classYear('2012')}>2012</span>
              </div>
            </button>
          </div>
          <div className="flex justify-center w-1/5 text-gray-500 timeline-article ">
            <button
              type="button"
              onClick={() => {
                dispatch(setYear('2016'))
              }}
              className={classBatton('2016')}
            >
              <div className="flex justify-center mt-2">
                <span className={classYear('2016')}>2016</span>
              </div>
            </button>
          </div>
        </div>
        <div className="timeline-end"> &bsp;</div>
      </section>
      {/* <Percent presidents={presidents} year={year} votesPerYear={votesPerYear} /> */}
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)

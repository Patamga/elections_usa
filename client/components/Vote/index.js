import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { select } from 'd3'
import { geoPath } from 'd3-geo'
import * as d3 from 'd3'
import { setUsTopo } from '../../redux/reducers/votesMap'


const DEFAULT_WIDTH = 960
const DEFAULT_HEIGHT = 600

const draw = (us, votesByState, presidents, year) => {
  const states = votesByState[year]
  const path = geoPath()
  select('#chart').attr('viewBox', '0 0 960 600').style('width', '100%').style('height', 'auto')
  select('#chart')
    .append('g')
    .attr('class', 'counties')
    .selectAll('path')
    .data(states)
    .enter()
    .append('path')
    .attr('fill', (state) =>
      state.properties.votes.percent.dem > state.properties.votes.percent.repub
        ? '#5186e1'
        : '#c63b38'
    )
    .attr('stroke', '#ddd')
    .attr('stroke-width', 0.15)
    .attr('d', path)
    .append('title')
    .text((d) =>
      [
        d.properties.titleName,
        `${d3.format('.0f')(d.properties.votes.percent.dem)} % ${presidents.dem}`,
        `${d3.format('.0f')(d.properties.votes.percent.repub)} % ${presidents.repub}`
      ].join(' – ')
    )
  select('#chart')
    .append('g')
    .attr('class', 'counties')
    .selectAll('path')
    .data(us)
    .enter()
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', '#ddd')
    .attr('stroke-width', 1)
    .attr('d', path)
}

const Vote = () => {
  const dispatch = useDispatch()
  const { us } = useSelector((store) => store.votesMap)
  const { year } = useSelector((store) => store.votesMap)
  const { votesByState } = useSelector((store) => store.votesMap)
  const { presidents } = useSelector((store) => store.votesMap)
  const { votesPerYear } = useSelector((store) => store.votesMap)
  const [width] = useState(DEFAULT_WIDTH)
  const [height] = useState(DEFAULT_HEIGHT)

  useEffect(() => {
    dispatch(setUsTopo())
  }, [])
  useEffect(() => {
    if (us.type !== '' && votesByState.type !== '') {
      draw(us, votesByState, presidents, year)
    }
  }, [year, votesByState, votesPerYear])

  return (
    <div className="w-full h-full flex flex-col bg-gray-100">
      <div className="min-w-screen min-h-screen bg-gray-900 flex flex-wrap content-around justify-center px-5 py-5">
        <div className="bg-gray-100 text-white rounded shadow-xl py-5 px-5 w-full lg:w-10/12 xl:w-3/4">
          <div className="flex flex-col items-end">
            <svg width={width} height={height} viewBox="0 0 975 610" id="chart" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vote

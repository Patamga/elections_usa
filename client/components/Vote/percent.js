import React from 'react'

const Dummy = (props) => {
  const { year } = props
  const { presidents } = props
  const { votesPerYear } = props
  const stileWidth = (data) => {
    if (votesPerYear.type !== '') {
      if (data === 'dem') {
        return `${votesPerYear[year].dem}%`
      }
      if (data === 'repub') {
        return `${votesPerYear[year].repub}%`
      }
      if (data === 'NA') {
        return `${100 - (votesPerYear[year].dem + votesPerYear[year].repub)}%`
      }
    }
    return ''
  }
  const divStyleDem = { width: stileWidth('dem'), backgroundColor: '#5186e1' }
  const divStyleRep = { width: stileWidth('repub'), backgroundColor: '#c63b38' }
  const divStyleNa = { width: stileWidth('NA') }

  return (
    <div className="h-12 flex flex-col bg-gray-100 mx-2">
      <div className="flex justify-between h-8 text-white mt-4 w-full ">
        <div style={divStyleDem} className="flex h-8  colorBlue justify-end">
          <div className=" mx-4 ">{presidents.dem}</div>
          <div className=" mx-4 ">{stileWidth('dem')}</div>
        </div>
        <div style={divStyleNa} className="bg-gray-500">
          &nbsp;
        </div>
        <div style={divStyleRep} className="flex h-8 colorRed ">
          <div className=" mx-4 ">{stileWidth('repub')}</div>
          <div className="mx-4"> {presidents.repub}</div>
        </div>
      </div>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)

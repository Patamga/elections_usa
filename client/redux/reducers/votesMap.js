import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import dataVotesByYears from '../actions/votesByYear'
import votesInMaps from '../actions/votesInMaps'

const SET_US = 'SET_US'
const SET_VOTES = 'SET_VOTES'
const SET_YEAR = 'SET_YEAR'
const SET_VOTE_BY_STATE = 'SET_VOTE_BY_STATE'
const SET_PRESIDENT = 'SET_PRESIDENT'

const presidentData = {
  2000: { dem: 'Al Gore', repub: 'George W. Bush' },
  2004: { dem: 'John Kerry', repub: 'George W. Bush' },
  2008: { dem: 'Barack Obama', repub: 'John McCain' },
  2012: { dem: 'Barack Obama', repub: 'Mitt Romney' },
  2016: { dem: 'Hillary Clinton', repub: 'Donald Trump' }
}

const initialState = {
  us: { type: '' },
  votes: [],
  year: '2016',
  presidents: { dem: 'Hillary Clinton', repub: 'Donald Trump' },
  votesByState: { type: '' }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_US:
      return {
        ...state,
        us: action.us
      }
    case SET_VOTES:
      return {
        ...state,
        votes: action.votes
      }
    case SET_PRESIDENT:
      return {
        ...state,
        presidents: action.presidents
      }
    case SET_VOTE_BY_STATE:
      return {
        ...state,
        votesByState: action.votesByState
      }
    case SET_YEAR:
      return {
        ...state,
        year: action.year
      }
    default:
      return state
  }
}

export function setVotes() {
  return (dispatch, getState) => {
    const { us } = getState().votesMap
    return d3
      .tsv('/api/v1/vote')
      .then((data) => {
        dispatch({ type: SET_VOTES, votes: data })
        return data
      })
      .then((data) => {
        return votesInMaps(data)
      }).then((vote) => {
        return vote
        .map((forState) => {
          const topo = us.find((top) => top.id === forState.id)
          if (topo) {
            return {
              ...topo,
              properties: {
                year: forState.year,
                titleName: `${forState.state} State`,
                state: forState.state,
                state_po: forState.state_po,
                votes: {
                  count: forState.count,
                  percent: {
                    dem: +((forState.count.democrat * 100) / forState.count.total).toFixed(2),
                    repub: +((forState.count.republican * 100) / forState.count.total).toFixed(2),
                    green: +((forState.count.green * 100) / forState.count.total).toFixed(2),
                    NA: +((forState.count.NA * 100) / forState.count.total).toFixed(2)
                  }
                }
              }
            }
          }
          return forState
        })
        .filter((it) => it.id !== '00')
      })
      .then((votesTopo) => {
        const votesByStateByYear = dataVotesByYears(votesTopo)
        dispatch({ type: SET_VOTE_BY_STATE, votesByState: votesByStateByYear })
      })
  }
}
export function setPresidents() {
  return (dispatch, getState) => {
    const { year } = getState().votesMap
    const presidents = presidentData[year]
    dispatch({ type: SET_PRESIDENT, presidents })
  }
}
export function setYear(year) {
  return (dispatch) => {
    dispatch({ type: SET_YEAR, year })
  }
}
export function setUsTopo() {
  return (dispatch) => {
    return fetch('/api/v1/maps')
      .then((res) => res.json())
      .then((data) => {
        const topo = topojson.feature(data, data.objects.states).features
        dispatch({ type: SET_US, us: topo })
        dispatch(setVotes())
      })
  }
}

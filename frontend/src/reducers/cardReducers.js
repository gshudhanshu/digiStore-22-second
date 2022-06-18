import {
  CARD_SCRATCH_REQUEST,
  CARD_SCRATCH_SUCCESS,
  CARD_SCRATCH_FAIL,
  CARD_SCRATCH_RESET,
  CARD_LIST_SCRATCH_MY_REQUEST,
  CARD_LIST_SCRATCH_MY_SUCCESS,
  CARD_LIST_SCRATCH_MY_FAIL,
} from '../constants/cardConstants'

// SCRACH CARD
export const cardScratchReducer = (state = { cardDetails: {} }, action) => {
  switch (action.type) {
    case CARD_SCRATCH_REQUEST:
      return { ...state, loading: true }
    case CARD_SCRATCH_SUCCESS:
      return { loading: false, cardDetails: action.payload }
    case CARD_SCRATCH_FAIL:
      return { loading: false, error: action.payload }
    case CARD_SCRATCH_RESET:
      return { cardDetails: {} }
    default:
      return state
  }
}

// GET MY SCRACH CARDS
export const cardScratchListReducer = (state = { cardListMy: {} }, action) => {
  switch (action.type) {
    case CARD_LIST_SCRATCH_MY_REQUEST:
      return {
        loading: true,
      }
    case CARD_LIST_SCRATCH_MY_SUCCESS:
      return {
        loading: false,
        cards: action.payload,
      }
    case CARD_LIST_SCRATCH_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

import axios from 'axios'
import { toast } from 'react-toastify'
import {
  CARD_SCRATCH_REQUEST,
  CARD_SCRATCH_SUCCESS,
  CARD_SCRATCH_FAIL,
  CARD_LIST_SCRATCH_MY_REQUEST,
  CARD_LIST_SCRATCH_MY_SUCCESS,
  CARD_LIST_SCRATCH_MY_FAIL,
} from '../constants/cardConstants'
import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_ADD_DOLLAS,
} from '../constants/userConstants'

// SCRATCH CARD
export const getScratchCardDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARD_SCRATCH_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/cards`, user, config)

    dispatch({
      type: CARD_SCRATCH_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CARD_SCRATCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addDigiDollas =
  (user, cardDetails) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CARD_SCRATCH_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/cards`,
        { _id: user._id, cardDetails },
        config
      )

      toast(`${data.cardDetails.digiDollas} DigiDollas Added`)
      dispatch({
        type: USER_LOGIN_ADD_DOLLAS,
        payload: data.user.digiDollas,
      })

      localStorage.setItem(
        'userInfo',
        JSON.stringify(getState().userLogin.userInfo)
      )
    } catch (error) {
      dispatch({
        type: CARD_SCRATCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listMyCards = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARD_LIST_SCRATCH_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/cards/mycards`, config)

    dispatch({
      type: CARD_LIST_SCRATCH_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CARD_LIST_SCRATCH_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// STAFF section
export const getStaffScratchCardDetails =
  (user, mobile, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CARD_SCRATCH_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/cards`,
        {
          user,
          mobile,
          image,
        },
        config
      )

      dispatch({
        type: CARD_SCRATCH_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CARD_SCRATCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const saveStaffScratchCard =
  (user, cardDetails) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CARD_SCRATCH_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/cards`,
        { _id: user._id, isStaff: user.isStaff, cardDetails },
        config
      )

      toast(`Yay! You'have won a ${data.cardDetails.product.name}`)
      dispatch({
        type: USER_LOGIN_ADD_DOLLAS,
        payload: data.user.digiDollas,
      })

      localStorage.setItem(
        'userInfo',
        JSON.stringify(getState().userLogin.userInfo)
      )
    } catch (error) {
      dispatch({
        type: CARD_SCRATCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

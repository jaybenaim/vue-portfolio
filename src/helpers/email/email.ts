import { IMessageData } from '@/lib/types'
import { AxiosError } from 'axios'
import BASE_URL from '../api-base-url'

export interface IApiMessageDataResponse {
  success: boolean
  data: IMessageData
}

export type TMessageField = 'name' | 'email' | 'message'
/**
 *
 * @param data - name, email, message
 * @returns
 */
export const $sendEmail = async (data: IMessageData) => await BASE_URL.post('/email', data, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
.then(({ data: messageResponse }) => messageResponse as IApiMessageDataResponse)
.catch((err: AxiosError) => ({
  success: false,
  data: err.response?.data.errors
} as IApiMessageDataResponse
))

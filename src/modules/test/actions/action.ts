'use server'

import soap from 'soap'

import { sleep } from '@/lib/utils'

const WSDL_URL =
  'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL'

export async function getCountries(): Promise<{
  countries: string[]
  error?: string
}> {
  await sleep(4000)

  return new Promise((resolve) => {
    soap.createClient(WSDL_URL, (err, client) => {
      if (err) {
        resolve({ countries: [], error: err.message })
        return
      }

      client.ListOfCountryNamesByName({}, (err: any, result: any) => {
        if (err) {
          resolve({ countries: [], error: err.message })
          return
        }

        const list =
          result.ListOfCountryNamesByNameResult.tCountryCodeAndName || []
        const names = list.map((c: any) => `${c.sISOCode} - ${c.sName}`)
        resolve({ countries: names })
      })
    })
  })
}

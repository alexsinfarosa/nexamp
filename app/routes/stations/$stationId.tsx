import type {LoaderArgs, MetaFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useCatch, useLoaderData} from '@remix-run/react'
import invariant from 'tiny-invariant'
import {getStationList} from '~/models/station.server'
import {stringToSlug} from '~/utils'

export const meta: MetaFunction = () => {
  return {
    title: 'Station Page',
    description: 'Details about a station',
  }
}

export async function loader({params}: LoaderArgs) {
  invariant(params.stationId, 'stationId not found')

  const stations = await getStationList()
  const station = stations.find(
    station => stringToSlug(station.id) === params.stationId,
  )

  if (!station) {
    throw new Response('Not found', {status: 404})
  }

  return json({station})
}

export default function Station() {
  const {station} = useLoaderData<typeof loader>()

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">{station.name}</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Replace with your content */}
        <div className="py-4">
          <pre>{JSON.stringify(station, null, 4)}</pre>
        </div>
        {/* /End replace */}
      </div>
    </>
  )
}

export function ErrorBoundary({error}: {error: Error}) {
  console.error(error)
  return (
    <div className="px-4 sm:px-6 md:px-8">
      An unexpected error occurred: {error.message}
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 404) {
    return <div className="px-4 sm:px-6 md:px-8">Station not found</div>
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

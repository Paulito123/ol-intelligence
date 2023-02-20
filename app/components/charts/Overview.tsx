import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { useLoaderData } from '@remix-run/react';
import { getTokenSupplyListItems } from '~/models/supply.server';
import { classNames } from '~/utils/classes'

// Create our number formatter.
const formatter = {
  number: new Intl.NumberFormat('en-US').format,
  percentage: (num: number) => num < 1 ? (num * 100).toFixed(2) + "%" : (num * 100 - 100).toFixed(2) + "%",
}

const stat = (id: string, name: string, today: number, yesterday: number) => ({
  id,
  name,
  stat: formatter.number(today),
  previousStat: formatter.number(yesterday),
  change: formatter.percentage(today / yesterday),
  changeType: today >= yesterday ? 'increase' : "decrease"
})

const perc = (id: string, name: string, today: number, yesterday: number) => ({
  id,
  name,
  stat: formatter.percentage(today),
  previousStat: formatter.percentage(yesterday),
  change: formatter.percentage(today > yesterday ? today / yesterday : yesterday / today),
  changeType: today >= yesterday ? 'increase' : "decrease"
})

export const loader = async () => {
  const data = await getTokenSupplyListItems({ date: new Date(Date.now() - 24 * 3600 * 1000 * 5) });

  const stats = [
    stat('total', 'Total Supply', data[0].total, data[1].total),
    perc('circulating', 'Circulating Supply', data[0].unlocked / data[0].total, data[1].unlocked / data[1].total),
    perc('inflation', 'Daily Inflation', data[0].total / data[1].total, data[1].total / data[2].total),
  ]

  return { overview: stats };
}

export const Component = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.overview.map((item) => (
            <div
                key={item.id}
                className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
                <Stat key={item.name} item={item} />
            </div>
        ))}
      </dl>
    </>
  )
}

export function Stat({ item }: any) {
  return (
    <>
        <dt className="text-base font-normal text-gray-900">{item.name}</dt>
        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-primary-600">
            {item.stat}
            <span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>
            </div>

            <div
            className={classNames(
                item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
            )}
            >
            {item.changeType === 'increase' ? (
                <ArrowUpIcon
                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                aria-hidden="true"
                />
            ) : (
                <ArrowDownIcon
                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                aria-hidden="true"
                />
            )}

            <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
            {item.change}
            </div>
        </dd>
    </>
  )
}

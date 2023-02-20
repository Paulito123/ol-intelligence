import { json } from "@remix-run/node"; // or cloudflare/deno

import * as TokenLocked from '~/components/charts/TokenLocked';
import * as TokenDistribution from '~/components/charts/TokenDistribution';
import * as Overview from '~/components/charts/Overview';

// import { BarChart } from '~/components/charts/bar';
// import { MapChart, mapData } from '~/components/charts/map';

import Main from '~/templates/main';


// Load all the data for each component on this page
export async function loader() {
  const data = await Promise.all(
    // every loader in this list needs to have the data on a unique key
    // i.e. { tokenLocked: data } , { overview: data }
    // if not there will be conflicts
    // TODO: create a component loader generator that always comes up with a unique key hash to avoid manual work and human error
    [
      TokenLocked,
      TokenDistribution,
      Overview,
    ]
    .map(c => c.loader())
  ).then(
    componentData => componentData.reduce((agg, next) => {
      return {
        ...agg,
        ...next,
      }
    }, {})
  )

  return json(data);
}

export default function Tokenomics() {
  return (
    <Main>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Tokenomics</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

          
          {/* Replace with your content */}
          <div className="px-4 py-8 sm:px-0">
            <Overview.Component />

            <h3 className="mt-5 text-lg font-medium leading-6 text-gray-900">Token Distribution</h3>
            <div className="mt-5 h-96 rounded-lg p-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* <MapChart /> */}
              <TokenLocked.Component />
              <TokenDistribution.Component />
            </div>

            <h3 className="mt-5 text-lg font-medium leading-6 text-gray-900">Token Movement</h3>
            <div className="mt-5 h-96 rounded-lg p-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* <MapChart /> */}
              {/* <BarChart /> */}

              {/* <BarChart /> */}
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </Main>
  )
}

// GOALS

// Nr of active / inactive validators?
// core developers input needed

// Geographic distribution of servers?
// list of validator ips + (https://www.iplocation.net/ip-lookup)

// Tokens distribution by wallet type (community (slow) / validator (slow) / validator? / user / contributor (slow))?
// core developers input needed

// Validator health and performance?
// permission-tree api

// How many tokens are minted per day?
// ol-explorer.io

// What is the total / circulating supply?
// permission-tree api + core developers input needed

// How many tokens are flowing to / from DEX and CEX from / to the chain?
// List with registered CEX and DEX accounts / contracts + permission-tree api

// avg transaction cost
// core developers input needed

// Nakamoto coefficient > Lorenz curve (https://www.minima.global/post/the-nakamoto-coefficient-an-attempt-to-quantify-decentralization)
// core developers input needed
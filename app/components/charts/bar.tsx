// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'
 

export const barData = [
  {
    "exchange": "Binance",
    "inflow": 127,
    "inflowColor": "hsl(243, 70%, 50%)",
    "outflow": 165,
    "outflowColor": "hsl(176, 70%, 50%)",
  },
  {
    "exchange": "Kucoin",
    "inflow": 179,
    "inflowColor": "hsl(309, 70%, 50%)",
    "outflow": 33,
    "outflowColor": "hsl(207, 70%, 50%)",
  },
  {
    "exchange": "Kraken",
    "inflow": 180,
    "inflowColor": "hsl(185, 70%, 50%)",
    "outflow": 171,
    "outflowColor": "hsl(105, 70%, 50%)",
  },
]

export const barData2 = [
  {
    "exchange": "ETH",
    "inflow": 127,
    "inflowColor": "hsl(243, 70%, 50%)",
    "outflow": 165,
    "outflowColor": "hsl(176, 70%, 50%)",
  },
  {
    "exchange": "BNB Chain",
    "inflow": 179,
    "inflowColor": "hsl(309, 70%, 50%)",
    "outflow": 33,
    "outflowColor": "hsl(207, 70%, 50%)",
  },
  {
    "exchange": "0L",
    "inflow": 180,
    "inflowColor": "hsl(185, 70%, 50%)",
    "outflow": 171,
    "outflowColor": "hsl(105, 70%, 50%)",
  },
  {
      "exchange": "Aptos",
      "inflow": 180,
      "inflowColor": "hsl(185, 70%, 50%)",
      "outflow": 171,
      "outflowColor": "hsl(105, 70%, 50%)",
  },
]

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const BarChart = () => (
    <>
      <ResponsiveBar
          data={barData}
          keys={[
            "inflow",
            "outflow"
          ]}
          indexBy="exchange"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          layout="horizontal"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'exchange',
              legendPosition: 'middle',
              legendOffset: 32
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'food',
              legendPosition: 'middle',
              legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
          }}
          legends={[
              {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function(e) { return e.id+": "+e.formattedValue+" in exchange: "+e.indexValue }}
      />
    </>
)

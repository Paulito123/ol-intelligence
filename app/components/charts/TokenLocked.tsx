// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie'
import { useLoaderData } from "@remix-run/react";

const colors = [
  "#FF5959",
  "#1882FF",
  "#FFB800",
  "#0C15D2",
  "#E93FAF",
];

const pieData = [
  {
    "id": "Community - Locked",
    "label": "Community - Locked",
    "value": 0.45,
  },
  {
    "id": "Community - Unlocked",
    "label": "Community - Unlocked",
    "value": 0.07,
  },
  {
    "id": "User - Locked",
    "label": "User - Locked",
    "value": 0.38,
  },
  {
    "id": "User - Unlocked",
    "label": "User - Unlocked",
    "value": 0.045,
  },
].map((item, i) => ({ ...item, color: colors[i] }))

export const loader = async () => {
  return { tokenLocked: pieData };
}

export const Component = () => {
  const data = useLoaderData<typeof loader>();
  
  return (<>
      <ResponsivePie
          data={data.tokenLocked}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      0.2
                  ]
              ]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      2
                  ]
              ]
          }}
          legends={[
            {
                anchor: 'bottom',
                direction: 'column',
                justify: false,
                translateX: 200,
                translateY: 56,
                itemsSpacing: 5,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
      />
    </>
  )
}

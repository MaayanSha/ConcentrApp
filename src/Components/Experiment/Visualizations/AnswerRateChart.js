import { ResponsiveBar } from '@nivo/bar'
import {rgb} from "d3-color";

const AnswerRateChart = ({ data }) => (
    <ResponsiveBar
        data={data}
        keys={["answerRate"]}
        indexBy={"activity"}
        colorBy={"indexValue"}
        margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#FFA733', '#D7E8BA', '#4DA1A9', '#2E5077','#9E2E57']}
        borderColor={{ theme: 'grid.line.stroke' }}
        borderWidth="0.5px"
        axisTop={null}
        axisRight={null}
        motionConfig="slow"
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'activity',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'rate (%)',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                    1.6
                ]
            ]
        }}
        role="application"
    />
)

export default AnswerRateChart;
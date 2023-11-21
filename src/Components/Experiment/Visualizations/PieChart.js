import {ResponsivePie} from "@nivo/pie";


export const PieChart = ({pieData}) => {
    return (
        <div className="col-md-6">
        <ResponsivePie
            data={pieData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            colors={['#FFA733', '#D7E8BA', '#4DA1A9', '#2E5077','#9E2E57']}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["brighter", 2]] }}
        />
        </div>
    );
};
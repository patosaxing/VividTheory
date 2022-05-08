// import React from 'react';
// import { Scatter } from 'react-chartjs-2';
// import 'chartjs-adapter-date-fns';

// const Chart = ({ data, options }) => {

//     console.log(data, 'options')    
//     return <div>
//             <Scatter data = {data} options = {options} />
//         </div>
      
    
// }

// export default Chart;

import React from 'react';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

const Chart = ({ data, options }) => {

    console.log(data, 'options')

    return <div>
        <Scatter data={data} options={options}
        />
    </div>
}

export default Chart;

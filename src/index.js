import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/tree'
import 'echarts/lib/component/tooltip'
import {fetchFamilyData} from './rest.js'
import './main.css'
debugger
let container = document.createElement('div')
container.id = 'chart'
document.body.appendChild(container)
var myChart = echarts.init(container)

function refeshPage () {
  fetchFamilyData('南充', '王').then(data => {
    myChart.setOption({
      tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
      },
      series:[
          {
              type: 'tree',

              data: data,

              left: '2%',
              right: '2%',
              top: '8%',
              bottom: '20%',

              symbol: 'emptyCircle',

              orient: 'vertical',

              expandAndCollapse: true,

              label: {
                  normal: {
                      position: 'top',
                      verticalAlign: 'middle',
                      align: 'right',
                      fontSize: 9
                  }
              },

              leaves: {
                  label: {
                      normal: {
                          position: 'bottom',
                          verticalAlign: 'middle',
                          align: 'left'
                      }
                  }
              },

              animationDurationUpdate: 750
          }
      ]
    })
  })
}

refeshPage()

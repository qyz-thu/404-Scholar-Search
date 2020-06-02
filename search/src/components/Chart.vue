<template>
  <p :id="id" :style="style"></p>
</template>

<script>
  export default {
    name: "Chart",
    data() {
      return {
        chart: '',
      };
    },
    props: {
      id: {
        type: String
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      option: {
        type: Object,
        default() {
          return {
            title: {
              text: 'Vue-Echarts'
            },
            legend: {
              data: ["Paper Number"]
            },
            xAxis: {
              data: ['aaa', 'aaa', 'aaa', 'aaa', 'aaa', 'aaa', 'aaa']
            },
            series: [
              {
                name: "paper number",
                type: 'line',
                data: [0, 0, 0, 0, 0, 0, 0]
              }
            ]
          };
        }
      }
    },
    computed: {
      style() {
        return {
          width: this.width,
          height: this.height,
        };
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init () {
        this.chart = this.$echarts.init(document.getElementById(this.id));
        this.chart.setOption(this.option);

      }
    },
    watch: {
      option: {
        handler(newVal, oldVal) {
          if (this.chart){
            if (newVal)
              this.chart.setOption(newVal);
            else
              this.chart.setOption(oldVal);
          }
          else
            this.init();
        }
      }
    }
  };

</script>

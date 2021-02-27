<template>
  <v-row align="center">
      <v-col>
        <v-sheet
          class='calendar-bar pa-2'
          min-width="290"
          >
          <v-row>
            <v-col cols="10" class=" d-flex justify-start ">
              <v-avatar 
                  class="d-flex"
                  color="secondary"
                  size="35">
                  <v-icon 
                  color="primary" >
                    mdi-calendar-blank
                  </v-icon>
                </v-avatar>
              <span class='calendar-title pl-2 pt-2'>選擇日期</span>
            </v-col>
           <v-col cols="2" class="justify-end d-flex">
              <router-link to="/Calander" style="text-decoration: none;">
              <v-icon>
               mdi-close 
             </v-icon></router-link>
             
           </v-col>
          </v-row>
          <!-- <v-row>
            <v-col>
              <v-row>
                <v-col
                  class="pa-0"
                  v-for="k in 7"
                  :key="k"
                >
                <div class="pa-0">
                  <div class="flex-column">
                  <div>{{weekStr[k-1]}}</div>
                  </div>
                </div>
                </v-col>
                <v-sheet 
                  color="transparent"
                  width="2%">
                </v-sheet>
              </v-row>
              <v-row>
                <v-col  class="pa-3">
                </v-col>
              </v-row>
            </v-col>
          </v-row> -->
          <v-date-picker
            v-model="date"
            no-title
            full-width
            min-width="290"
            class="mt-4"
            color="#7F74B4"
          ></v-date-picker>
          <v-date-picker
            v-model="nextMonth"
            :show-current="false"
            no-title
            full-width
            min-width="290"
            class="mt-4"
            color="#7F74B4"
          ></v-date-picker>
          <v-sheet
            class='calendar-footer pa-2 d-flex justify-center'
            >
            <v-btn
              v-bind="attrs"
              v-on="on"
              class='primary--text ma-1'
              elevation="2"
              rounded
              width="15%"
              color="secondary"
              >選擇
              </v-btn>
          </v-sheet>    
        </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      isMounted:false,
      week:[],
      today:'',
      day:'',
      date:'',
      date2:'',
      nextMonth:'',
      value: '',
      weekStr:['S','M','T','W','T','F','S'],
      current: null,
      events: [
        {
          name: 'Weekly Meeting',
          start: '2021-02-27 09:00',
          end: '2021-02-27 10:00',
        },
        {
          name: `Thomas' Birthday`,
          start: '2021-02-28',
        },
        {
          name: 'Mash Potatoes',
          start: '2021-02-28 12:30',
          end: '2021-02-28 15:30',
        },
         {
          name: 'Mash strawberry',
          start: '2021-02-26 12:30',
          end: '2021-02-26 15:30',
        },
      ],
    }),
    computed: {

    },
    mounted(){
      this.isMounted = true;
      this.addOneMonth();
    },
    methods:{
      addOneMonth(){
        var d = new Date();
        d = d.setMonth(d.getMonth() + 1);
        this.nextMonth = new Date(d).toISOString().substr(0, 10);
        console.log(this.nextMonth);
      },

    },

    
  }
</script>

<style scoped lang="scss">
.dot {
  margin: auto;
  height: 5px;
  width: 5px;
  background-color: lightgreen;
  border-radius: 50%;
}
.v-current-time {
  height: 2px;
  background-color: grey;
  position: absolute;
  left: -1px;
  right: 0px;
  pointer-events: none;

  &.first::before {
    content: '';
    position: absolute;
    background-color: grey;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
  .v-current-time-time {
    display: none;
  }
  
  &.first .v-current-time-time {
    display: block;
    position: absolute;
    left: -60px;
    color: red;
    font-size: 10px;
    padding: 1px;
    background-color: white;
    width: 50px;
    height: 20px;
    text-align: right;
    top: -9px;
  }
}
.calendar-title{
  text-align: left
}
.calendar-bar{
  box-shadow: 0 8px 20px -10px #DDDDDD !important;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: white;
}
.calendar-footer{
  background-image: linear-gradient(to top,  white,transparent);
  
  background-color: white;
}
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>

<style lang="scss">
  

    $calendar-line-width: 12px;
@import '~vuetify/src/components/VCalendar/_variables.scss';

</style>
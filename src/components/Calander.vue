<template>
<div>
    <v-row>
      <v-col>
        <v-sheet
            class='calendar-bar pa-2'
          >
          <v-row>
            <v-col v-if="type=='week'"  class=" d-flex justify-start">
              <span class='calendar-title pl-3 py-2'>預約行事曆</span>
            </v-col>
            <v-col v-if="type=='day'" class=" d-flex justify-start">
               <v-avatar
                  color="grey lighten-2 mt-1"
                  size="15"
                  @click="prev()">
                  <v-icon 
                  color="grey" >
                    mdi-menu-left
                  </v-icon>
                </v-avatar>
              <span class='calendar-title px-4'>{{ today }}</span>
              <v-avatar
                color="grey lighten-2 mt-1"
                size="15"
                @click="next()">
                  <v-icon 
                  color="grey" >
                    mdi-menu-right
                  </v-icon>
                </v-avatar>
            </v-col>
            <v-col class="justify-end d-flex">
              <v-menu offset-y
                open-on-hover
                small
                value="view">
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  v-bind="attrs"
                  v-on="on"
                  class='primary--text ma-1'
                  elevation="2"
                  rounded
                  color="secondary"
                  >{{view}}
                  <v-icon
                    small
                    color="primary"
                    >
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    @click="changeView(item)"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
                </v-menu>
                <v-menu offset-y
                  open-on-hover
                  small
                  value="user">
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  v-bind="attrs"
                  v-on="on"
                  class='primary--text ma-1'
                  elevation="2"
                  rounded
                  color="secondary"
                  >{{user}}
                  <v-icon
                    small
                    color="primary"
                    >
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in users"
                    :key="index"
                    @click="changeUser(item)"
                  >
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
                </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-sheet 
              class="pb-2 d-flex align-center pl-5" 
              color="transparent"
              width="5.2%"
              min-width="60px">
              <router-link to="/Picker" style="text-decoration: none;">
                <v-avatar 
                  class="d-flex"
                  color="secondary"
                  size="35">
                  <v-icon 
                  color="primary" >
                    mdi-calendar-blank
                  </v-icon>
                </v-avatar>
              </router-link>
                </v-sheet>
            <v-col>
              <v-row>
                <v-col
                  class="pa-0"
                  v-for="k in 7"
                  :key="k"
                  @click="setCurrentDate(week[k-1])"
                >
                <div v-if="day==k-1" class="pa-0">
                  <v-avatar
                      color="primary"
                      rounded
                      size="50"
                    > 
                    <div class="flex-column white--text">
                    <div>{{weekStr[k-1]}}</div>
                    <div>{{week[k-1]}}</div>
                    </div>
                  </v-avatar>
                </div>
                <div v-if="day!=k-1" class="pa-0">
                    <div class="flex-column">
                    <div>{{weekStr[k-1]}}</div>
                    <div>{{week[k-1]}}</div>
                    </div>
                </div>
                <div 
                v-if="currentDay==k-1"
                class="dot"></div>
                </v-col>
                <v-sheet 
                  color="transparent"
                  width="2%">
                </v-sheet>
              </v-row>
              <v-row>
                <v-col  class="pa-1">
                </v-col>
              </v-row>
            </v-col>
            
          </v-row>
          </v-sheet>
        <v-sheet height="600">
          <v-calendar
            class="calendar"
            ref="calendar"
            v-model="today"
            :events="events"
            color="primary"
            event-color="grey lighten-2"
            event-text-color="grey"
            :type="type"
            hide-header
          >
            <template v-slot:day-body="{ date, week }">
              <div
                class="v-current-time"
                :class="{ first: date === week[0].date }"
                :style="{ top: nowY }"
              >
                <div class="v-current-time-time">
                  {{ nowTime }}
                </div>
              </div>    
            </template>
          </v-calendar>
          <v-sheet
            class='calendar-footer pa-2 d-flex justify-center'
            >
            <v-btn
              v-bind="attrs"
              v-on="on"
              class='primary--text ma-1'
              elevation="2"
              rounded
              color="secondary"
              >+ 新增預約
              </v-btn>
          </v-sheet>    
        </v-sheet>

      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data: () => ({
      currentDay:'',
      today:'',
      eventColor:'',
      textColor:'',
      type:'week',
      isMounted:false,
      week:[],
      weekStr:[],
      day:'',
      date:'',
      value: '',
      ready: false,
      view:"週檢視",
      user:"使用者",
      users: [
        { name: '使用者1' },
        { name: '使用者2' },
      ],
      items: [
        { title: '週檢視', type:'week' },
        { title: '日檢視', type:'day', eventColor:'grey lighten-2', textColor:'grey' },
      ],
      
      current: null,
      events: [
        {
          name: 'Weekly Meeting',
          start: '2021-02-27 09:00',
          end: '2021-02-27 10:00',
        },
        {
          name: 'Weekly 123',
          start: '2021-02-26 09:00',
          end: '2021-02-26 13:00',
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
      ],
    }),
    watch: {
        today: function() {
           this.getWeek(); 
           this.getDate();

        }
    },
    computed: {
      cal () {
        return this.ready ? this.$refs.calendar : null
      },
      nowY () {
        return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
      },
      nowTime() {
        const cal = this.$refs.calendar;
        if (!cal && !this.isMounted) {
          return -1;
        }
      
        return cal.formatTime(cal.times.now);
      },
    },
    mounted(){
      this.currentDay = new Date().getDay();
      this.isMounted = true;
      this.today = new Date();
      this.getDate()
      this.getWeek()
      this.ready = true
      this.scrollToTime()
      this.updateTime()
    },
    methods:{
      setCurrentDate(a){
        const event = new Date(this.today);
        event.setDate(a);
        this.today = event.toISOString().split('T')[0];
      },
      move(a) {
        this.$refs.calendar.move(a);
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      changeDate(a){
        var startDate = new Date(this.today);
        this.today = new Date(startDate.setDate(startDate.getDate()+a)).toLocaleDateString('en-US');
      },
      getWeek(){
        let curr = new Date(this.today);
        this.week=[];
        for (let i = 0; i < 7; i++) {
          let first = curr.getDate() - curr.getDay() + i;
          let day = new Date(curr.setDate(first)).toLocaleString('en-us', {  weekday: 'short' })
          this.week.push(first)
          this.weekStr.push(day)
        }
        
      },
      getDate(){  
        var d = new Date(this.today);
        this.today = d.toISOString().split('T')[0];
        this.day = d.getDay();
        this.date = d.getDate();
      },
      getCurrentTime () {
        return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
      },
      scrollToTime () {
        const time = this.getCurrentTime()
        const first = Math.max(0, time - (time % 30) - 30)
        this.cal.scrollToTime(first)
      },
      updateTime () {
          setInterval(() => this.cal.updateTimes(), 60 * 1000)
        },
      changeUser(item){
        this.user = item.name;
      },
      changeView(item){
        this.view = item.title;
        this.type = item.type;
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
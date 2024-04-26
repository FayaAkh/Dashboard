
import Chart from 'chart.js/auto';
import gsap from 'gsap';




async function getDashboardData(url = '/data.json'){
  try{
      const response = await fetch(url);
      const data = await response.json();
      return data;
  }
  
  catch(error){
      console.log(error);
  }
  }
  class DashboardItem{
      static PERIODS = {
          weekly: 'week',
          monthly: 'month',
          daily: 'day',
  
      }
      constructor(data, container ='.dashboard__content', view = 'weekly'){
          this.data = data;
          this.container = document.querySelector(container);
          this.view = view;
  
          this.createMarkUp();
  
      
  }
  createMarkUp(){
      const {title,timeframes} = this.data;
      const id = title.toLocaleLowerCase().replace(/ /g,'-');
      const {current, previous} = timeframes[this.view.toLocaleLowerCase()];
  
      this.container.insertAdjacentHTML('beforeend',`
      <div class="dashboard__item dashboard__item--${id}">
          <article class="tracking-card">
            <header class="tracking-card__header">
              <h4 class="tracking-card__title"> ${title}</h4>
              <img class="tracking-card__menu" src="images/icon-ellipsis.svg" alt="menu">
            </header>
            <div class="tracking-card__body">
              <div class="tracking-card__time">${current}hrs</div>
              <div class="tracking-card__prev-period">Last ${DashboardItem.PERIODS[this.view]} - ${previous}hrs</div>
            </div>
  
          </article>
        </div>
      `);
      this.time = this.container.querySelector(`.dashboard__item--${id} .tracking-card__time`);
      this.prev = this.container.querySelector(`.dashboard__item--${id} .tracking-card__prev-period`);
  
  }
  
  changeView(view){
      console.log(this.time)
      console.log(this.prev)
      this.view = view.toLocaleLowerCase();
      const {current, previous} =this.data.timeframes[this.view.toLocaleLowerCase()];
      this.time.textContent = `${current}hrs`;
      this.prev.textContent = `Last ${DashboardItem.PERIODS[this.view]} - ${previous}hrs`;
      
  }
  
  }
  
  document.addEventListener('DOMContentLoaded',() => {
      getDashboardData()
          .then(data =>{
              const activities = data.map(activity => new DashboardItem(activity));
  
              const selectors = document.querySelectorAll('.view__selector-item');
      selectors.forEach(selector => 
      selector.addEventListener('click', function(){
          selectors.forEach(sel => sel.classList.remove('view__selector-item--active'))
          selector.classList.add('view__selector-item--active');
  
          const currentView = selector.innerText.trim().toLocaleLowerCase();
          activities.forEach(activity => activity.changeView(currentView));
      }))
  
          })
      }

    )
  
      const ctx = document.getElementById('myChart').getContext('2d');

      const myChart = new Chart(ctx, {
    type: 'doughnut', 
    data: {
        labels: ['Work', 'Play', 'Study','Exercise',  'Social', 'Self Care'],
        datasets: [{
            label: 'Total time in month', 
            data: [103, 23, 13 , 11, 21, 7
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            
            ],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1 ,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true 
            }
        }
    }
});

const ctx2 = document.getElementById('myChart2').getContext('2d');

const myChart2 = new Chart(ctx2, {
type: 'bar', 
data: {
  labels: ['Work', 'Play', 'Study','Exercise',  'Social', 'Self Care'],
  datasets: [{
      label: 'Total time in Day', 
      data: [5, 1, 0 , 1, 1, 0
      ],
      backgroundColor:[
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      
      ],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1 ,
  }]
},
options: {
  scales: {
      y: {
          beginAtZero: true 
      }
  }
}
});

let viewAnimation = () => {
  const tlMessageView = gsap.timeline({defaults:{ duration: .1}, repeat: -1, repeatDelay:2});
  tlMessageView.to('.view__selector-item',{ rotate: 5})
  .to('.view__selector-item',{ rotate: -5})
  .to('.view__selector-item',{ rotate: 5})
  .to('.view__selector-item',{ rotate: 0});
  return tlMessageView;
}


const tl = gsap.timeline({defaults:{ duration: .5}});
tl.from('.info-card__subtitle', {opacity: 0, y: 30})
.from('.info-card__title', {opacity: 0, y: 30})
.from('.view__selector-item', {opacity: 0, y: 30})
.add(viewAnimation);
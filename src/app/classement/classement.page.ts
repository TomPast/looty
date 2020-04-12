import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.page.html',
  styleUrls: ['./classement.page.scss'],
})
export class ClassementPage implements OnInit {
  // @ts-ignore
  @ViewChild('slides') slider: Slider;
  // @ts-ignore
  @ViewChild('segments') segments;
  page: any;
  constructor() { }

  ngOnInit() {
  }

  selectedTab(i){
    this.slider.slideTo(i);
    console.log('selectedTab',i);
  }

  slideChanged() {
    const currentIndex = this.slider.getActiveIndex();
    const slides_count = 3;

    this.page = currentIndex.toString();
    if(this.page >= slides_count)
      this.page = (slides_count-1).toString();

    console.log("slides_count",slides_count);
    console.log("this.page",this.page);
    this.centerScroll();
  }

  centerScroll(){
    if(!this.segments || !this.segments.nativeElement)
      return;

    let sizeLeft = this.sizeLeft();
    let sizeCurrent = this.segments.nativeElement.children[this.page].clientWidth;
    let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent/2) ;

    result = (result > 0) ? result : 0;
    this.smoothScrollTo(result);
  }

  // Get size start to current
  sizeLeft(){
    let size = 0;
    for(let i = 0; i < this.page; i++){
      size+= this.segments.nativeElement.children[i].clientWidth;
    }
    return size;
  }

  // Easing function
  easeInOutQuart(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  }

  // Animate scroll
  smoothScrollTo(endX){
    let startTime = new Date().getTime();
    let startX = this.segments.nativeElement.scrollLeft;
    let distanceX = endX - startX;
    let duration = 400;

    let timer = setInterval(() => {
      var time = new Date().getTime() - startTime;
      var newX = this.easeInOutQuart(time, startX, distanceX, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      this.segments.nativeElement.scrollLeft = newX;
    }, 1000 / 60); // 60 fps
  }
}

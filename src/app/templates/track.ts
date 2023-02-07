import { ICars } from '../interfaces/interface';
import { setColorImg } from '../utils';

export default class Track {
    constructor(private car: ICars, private img: string) {
        this.car = car;
        this.img = img;
    }
    getTrack(): string {
        const html = `
        <li class='track' id='car-${this.car.id}'>
           <div class='control'>
               <div class='edit-car'>
                  <button id='edit-select-${this.car.id}' class='edit-select'>select</button>
                  <button id='edit-remove-${this.car.id}' class='edit-remove'>remove</button>
                  <span id='car-name-${this.car.id}'class='car-name'>${this.car.name}</span>
               </div>
               <div class='control-car'>
                  <button id = 'control-start-${this.car.id}' class='control-start'>A</button>
                  <button id = 'control-stop-${this.car.id}' disabled class='control-stop'>B</button>
               </div>
           </div>
           <div>       
               <hr> 
                    <div class='road'>          
                        <div id='car-model-${this.car.id}' class='car-img'>
                              ${setColorImg(this.img, this.car.color)}               
                        </div>                  
                        <div id='finish-${this.car.id}'class='finish'>
                            <div>                                
                                <div class='white'></div>
                                <div class='black'></div>
                                <div class='white'></div>
                                <div class='black'></div>
                                <div class='white'></div>
                            </div>
                            <div>                                                        
                                <div class='black'></div>
                                <div class='white'></div>
                                <div class='black'></div>
                                <div class='white'></div>
                                <div class='black'></div>
                            </div>
                            <div>                                
                                <div class='white'></div>
                                <div class='black'></div>
                                <div class='white'></div>
                                <div class='black'></div>
                                <div class='white'></div>
                            </div>

                        </div>
                    </div>                                      
               <hr>
           </div>
        </li>               
        `;
        return html;
    }
}

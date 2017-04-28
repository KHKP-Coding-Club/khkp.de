import {Component, OnInit, AfterViewInit, AfterViewChecked} from '@angular/core';
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-liga-detail',
  templateUrl: './liga-detail.component.html',
  styleUrls: ['./liga-detail.component.css']
})
export class LigaDetailComponent implements OnInit, AfterViewChecked {

  time;
  date;
  liga: any;
  opponent: string;

  constructor(public af: AngularFire, private router: Router) {
    this.liga = af.database.object("/liga").$ref;
    //this.days=[{name:"Januar",number:1},{name:"Februar",number:2},{name:"März",number:3},{name:"April",number:4},{name:"Mai",number:5},{name:"Juni",number:6},{name:"Juli",number:7},{name:"August",number:8},{name:"September",number:9},{name:"Oktober",number:10},{name:"November",number:11},{name:"Dezember",number:12}];
    //this.hours=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  }

  ngOnInit() {
  }

  ngAfterViewChecked(){
    let datePicker:any = document.getElementById('datePicker');

    datePicker.i18n = {
      week: 'Woche',
      calendar: 'Kalender',
      clear: 'Löschen',
      today: 'Heute',
      cancel: 'Abbrechen',
      firstDayOfWeek: 1,
      monthNames: ['Januar','Februar','März','April','Mai','Juni',
        'Juli','August','September','Oktober','November','Dezember'],
      weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
      weekdaysShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
      formatDate: function(d) {
        return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('.');
      },
      parseDate: function(text) {
        // This example produces a really strict parser which only accepts
        // perfectly formatted dates like '12.8.2013'. Less strict implementation or
        // a 3rd party parser like in the example below is recommended.
        var parts = text.split('.');
        if (parts.length === 3) {
          var date = new Date(0, 0);
          date.setFullYear(parseInt(parts[2]));
          date.setMonth(parseInt(parts[1]) - 1);
          date.setDate(parseInt(parts[0]));
          return date;
        }
      },
      formatTitle: function(monthName, fullYear) {
        return monthName + ' ' + fullYear;
      }
    }
  }



  validate(){
    var toast :any = document.getElementById('toast');
    let datePicker:any = document.getElementById('datePicker');
    datePicker.validate();
    let matchDate:any = new Date(this.date+" "+this.time);
    if(!isNaN(matchDate.getTime()/1000)){
      console.log(matchDate.getTime()/1000)
      const ligaId = this.liga.push(null).key;
      this.liga.child(ligaId).set({
        date: matchDate.getTime(),
        opponent: this.opponent
      })
      this.router.navigate(['/liga']);
      toast.text="Match erfolgreich erstellt"
      toast.open();
    }else{
      toast.text="Das Datum oder die Uhrzeit sind falsch!"
      toast.open();
    }
    //console.log((new Date(this.date+" "+this.time).getTime()/1000));
  }
}

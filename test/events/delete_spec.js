/* globals describe,it, api, expect, beforeEach */

const User = require('../../models/user');
const Event = require('../../models/event');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const userData = {
  email: 'rnnsea001@gmail.com',
  firstName: 'Sean',
  postcodeHome: 'Sw6 2tg',
  password: 'pass',
  surname: 'Rennie',
  username: 'pass'
};

const eventData =  {
  category: 'Body',
  capacity: 3,
  concluded: false,
  durationHrs: 1,
  description: 'Small group Calisthenics training focussed on intermediate athletes looking to get better at handstands and muscle ups',
  eventTitle: 'Calisthenics in the Park',
  eventDateTime: 'Thu Oct 11 2018 22:30:00 GMT+0100 (British Summer Time)',
  guests: [],
  imageUrl: 'https://athleticmuscle-aoukphiqubz0bq.netdna-ssl.com/wp-content/uploads/2018/01/Calisthenics-759x500.jpg',
  isIndoors: false,
  location: {     //sub document to hold event location
    streetNumber: 9,
    streetName: 'Greensward',
    postcode: 'sw62tg'
  }
};

let token; //token is global
let eventId;

describe('DELETE /events/:id', () => {
  beforeEach(done =>{
    //Now create  the users
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign( {sub: user.id}, secret, {expiresIn: '1hr'} );
        return Event.remove({});
      })
      .then(() => Event.create(eventData))
      .then(events => {
        eventId = events.id;
        done();
      });
  });


  it('should return a 401 without a token', done => {
    api.delete(`/api/events/${eventId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 with a token', done => {
    api.delete(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .end((err, res) => {
        // console.log('the event ID is ', eventId);
        expect(res.status).to.eq(204); //No content
        done();
      });
  });

  it('should delete the whiskey', done => {
    api.delete(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .then(() => Event.find())
      .then(events => {
        // console.log('the events after deletion is ', events);
        expect(events.length).to.eq(0);
        done();
      });
  });
});
